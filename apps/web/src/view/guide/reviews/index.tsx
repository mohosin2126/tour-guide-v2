import { Star } from "lucide-react";
import { useAuth } from "@/hooks/auth/use-auth";
import { useGuideReviews } from "@/hooks/api/use-reviews";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PageLoader } from "@/components/ui/loading";
import DataTable, { type Column } from "@/components/shared/data-table";
import EmptyState from "@/components/shared/empty-state";

interface ReviewRecord {
  _id: string;
  rating: number;
  comment?: string;
  createdAt: string;
  user?: { name?: string; photo?: string };
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

export default function GuideReviews() {
  const { user } = useAuth();
  const { data: reviewPayload, isLoading } = useGuideReviews(user?._id) as {
    data: { reviews?: ReviewRecord[] } | ReviewRecord[] | undefined;
    isLoading: boolean;
  };
  const reviews = Array.isArray(reviewPayload)
    ? reviewPayload
    : Array.isArray(reviewPayload?.reviews)
      ? reviewPayload.reviews
      : [];

  const avgRating =
    reviews && reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : null;

  const columns: Column<ReviewRecord>[] = [
    {
      key: "traveler",
      header: "Traveler",
      render: (row) => {
        const initials = row.user?.name?.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) || "U";
        return (
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={row.user?.photo} />
              <AvatarFallback className="text-xs">{initials}</AvatarFallback>
            </Avatar>
            <span className="font-medium">{row.user?.name || "Anonymous"}</span>
          </div>
        );
      },
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            Reviews
            {reviews?.length ? (
              <Badge variant="secondary" className="ml-3 align-middle text-xs font-normal">
                {reviews.length}
              </Badge>
            ) : null}
          </h1>
          <p className="text-muted-foreground">Feedback from your travelers</p>
        </div>
        {avgRating && (
          <div className="flex items-center gap-2 rounded-xl border bg-card px-4 py-2.5">
            <Star size={20} className="fill-yellow-400 text-yellow-400" />
            <span className="text-xl font-bold">{avgRating}</span>
            <span className="text-sm text-muted-foreground">/ 5</span>
          </div>
        )}
      </div>

      <DataTable
        columns={columns}
        data={reviews || []}
        keyExtractor={(row) => row._id}
        emptyState={
          <EmptyState
            icon={Star}
            title="No reviews yet"
            description="Reviews will appear after travelers complete your tours."
          />
        }
      />
    </div>
  );
}
