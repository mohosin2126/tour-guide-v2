import { Star } from "lucide-react";
import { useAuth } from "@/hooks/auth/use-auth";
import { useUserReviews } from "@/hooks/api/use-reviews";
import { Card, CardContent } from "@/components/ui/card";
import { PageLoader } from "@/components/ui/loading";

interface ReviewRecord {
  _id: string;
  rating: number;
  comment?: string;
  createdAt: string;
  guide?: { name?: string };
}

export default function UserReviews() {
  const { user } = useAuth();
  const { data: reviews, isLoading } = useUserReviews(user?._id) as { data: ReviewRecord[] | undefined; isLoading: boolean };

  if (isLoading) return <PageLoader />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">My Reviews</h1>
        <p className="text-muted-foreground">Reviews you&apos;ve given to tour guides</p>
      </div>
      {!reviews?.length ? (
        <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
          <Star className="mb-4 h-16 w-16 text-muted-foreground/50" />
          <h3 className="text-lg font-semibold">No reviews yet</h3>
          <p className="text-muted-foreground">After completing a tour, you can review your guide</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <Card key={review._id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium">Guide: {review.guide?.name}</p>
                    <div className="mt-1 flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={16} className={i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted"} />
                      ))}
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">{new Date(review.createdAt).toLocaleDateString()}</span>
                </div>
                {review.comment && <p className="mt-2 text-sm text-muted-foreground">{review.comment}</p>}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
