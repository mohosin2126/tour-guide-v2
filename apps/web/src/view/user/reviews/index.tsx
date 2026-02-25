import { Star } from "lucide-react";
import { useAuth } from "@/hooks/auth/use-auth";
import { useUserReviews } from "@/hooks/api/use-reviews";
import { Badge } from "@/components/ui/badge";
import { PageLoader } from "@/components/ui/loading";
import DataTable, { type Column } from "@/components/shared/data-table";
import EmptyState from "@/components/shared/empty-state";

interface ReviewRecord {
  _id: string;
  rating: number;
  comment?: string;
  createdAt: string;
  guide?: { name?: string };
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={14} className={i < rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/30"} />
      ))}
    </div>
  );
}

export default function UserReviews() {
  const { user } = useAuth();
  const { data: reviews, isLoading } = useUserReviews(user?._id) as { data: ReviewRecord[] | undefined; isLoading: boolean };

  const columns: Column<ReviewRecord>[] = [
    {
      key: "guide",
      header: "Guide",
      render: (row) => <span className="font-medium">{row.guide?.name || "Unknown Guide"}</span>,
    },
    {
      key: "rating",
      header: "Rating",
      render: (row) => (
        <div className="flex items-center gap-2">
          <StarRating rating={row.rating} />
          <Badge variant="secondary" size="sm">{row.rating}/5</Badge>
        </div>
      ),
    },
    {
      key: "comment",
      header: "Comment",
      render: (row) => (
        <span className="line-clamp-1 max-w-xs text-sm text-muted-foreground">
          {row.comment || "No comment"}
        </span>
      ),
    },
    {
      key: "date",
      header: "Date",
      className: "text-right",
      render: (row) => (
        <span className="text-sm text-muted-foreground">
          {new Date(row.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
        </span>
      ),
    },
  ];

  if (isLoading) return <PageLoader />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">
          My Reviews
          {reviews?.length ? (
            <Badge variant="secondary" className="ml-3 align-middle text-xs font-normal">
              {reviews.length}
            </Badge>
          ) : null}
        </h1>
        <p className="text-muted-foreground">Reviews you&apos;ve given to tour guides</p>
      </div>

      <DataTable
        columns={columns}
        data={reviews || []}
        keyExtractor={(row) => row._id}
        emptyState={
          <EmptyState
            icon={Star}
            title="No reviews yet"
            description="After completing a tour, you can review your guide here."
          />
        }
      />
    </div>
  );
}
