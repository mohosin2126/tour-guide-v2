import { Star } from "lucide-react";
import { useAuth } from "@/hooks/auth/use-auth";
import { useGuideReviews } from "@/hooks/api/use-reviews";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PageLoader } from "@/components/ui/loading";

interface ReviewRecord {
  _id: string;
  rating: number;
  comment?: string;
  createdAt: string;
  user?: { name?: string; photo?: string };
}

export default function GuideReviews() {
  const { user } = useAuth();
  const { data: reviews, isLoading } = useGuideReviews(user?._id) as { data: ReviewRecord[] | undefined; isLoading: boolean };

  const avgRating =
    reviews && reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : null;

  if (isLoading) return <PageLoader />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Reviews</h1>
          <p className="text-muted-foreground">Feedback from your travelers</p>
        </div>
        {avgRating && (
          <div className="flex items-center gap-2 rounded-lg border px-4 py-2">
            <Star size={20} className="fill-yellow-400 text-yellow-400" />
            <span className="text-xl font-bold">{avgRating}</span>
            <span className="text-sm text-muted-foreground">/ 5</span>
          </div>
        )}
      </div>
      {!reviews?.length ? (
        <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
          <Star className="mb-4 h-16 w-16 text-muted-foreground/50" />
          <h3 className="text-lg font-semibold">No reviews yet</h3>
          <p className="text-muted-foreground">Reviews will appear after travelers complete your tours</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => {
            const initials = review.user?.name?.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) || "U";
            return (
              <Card key={review._id}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Avatar>
                      <AvatarImage src={review.user?.photo} />
                      <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{review.user?.name}</p>
                        <span className="text-xs text-muted-foreground">{new Date(review.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="mt-1 flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} size={14} className={i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted"} />
                        ))}
                      </div>
                      {review.comment && <p className="mt-2 text-sm text-muted-foreground">{review.comment}</p>}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
