import { useState } from "react";
import { useParams,  Link } from "react-router-dom";
import {  Star, Mail, Phone, MapPin } from "lucide-react";
import { useGuide, useGuides } from "@/hooks/api/use-general";
import { useGuidePackages } from "@/hooks/api/use-packages";
import { useGuideReviews, useCreateReview } from "@/hooks/api/use-reviews";
import { useAuth } from "@/hooks/auth/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { PageLoader } from "@/components/ui/loading";
import { useLoginGuard } from "@/components/shared/login-modal";

export default function GuideProfilePage() {
  const { id } = useParams<{ id: string }>();
  const { data: guide, isLoading } = useGuide(id);
  const { data: packages } = useGuidePackages(id);
  const { data: reviewsData } = useGuideReviews(id);
  const { data: allGuides } = useGuides();
  const { user } = useAuth();
  const { requireLogin, LoginModal } = useLoginGuard();
  const createReview = useCreateReview();
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");

  const reviews = reviewsData?.reviews || reviewsData || [];
  const otherGuides = allGuides?.filter((g: Record<string, unknown>) => g._id !== id)?.slice(0, 4) || [];

  if (isLoading) return <PageLoader />;
  if (!guide) return <div className="pt-24 text-center">Guide not found</div>;

  const handleSubmitReview = () => {
    if (!reviewComment.trim()) return;
    createReview.mutate(
      { guide: id, user: user?._id, rating: reviewRating, comment: reviewComment },
      {
        onSuccess: () => {
          setReviewComment("");
          setReviewRating(5);
        },
      }
    );
  };

  return (
    <div className="min-h-screen pb-16 pt-24">
      <div className="custom-container max-w-4xl">
       
        <Card>
          <CardContent className="p-8">
            <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
              <Avatar className="h-28 w-28">
                <AvatarImage src={guide.photo} />
                <AvatarFallback className="text-3xl">
                  {guide.name?.split(" ").map((n: string) => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 text-center sm:text-left">
                <h1 className="text-3xl font-bold">{guide.name}</h1>
                {guide.bio && <p className="mt-2 text-muted-foreground">{guide.bio}</p>}
                <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground sm:justify-start">
                  {guide.email && (<span className="flex items-center gap-1"><Mail size={14} />{guide.email}</span>)}
                  {guide.phone && (<span className="flex items-center gap-1"><Phone size={14} />{guide.phone}</span>)}
                  {guide.location && (<span className="flex items-center gap-1"><MapPin size={14} />{guide.location}</span>)}
                </div>
                <div className="mt-3 flex items-center justify-center gap-3 sm:justify-start">
                  {guide.rating && (
                    <div className="flex items-center gap-1">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{guide.rating}</span>
                    </div>
                  )}
                  {guide.specialties?.map((s: string, i: number) => (
                    <Badge key={i} variant="secondary">{s}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        {packages?.length > 0 && (
          <div className="mt-8">
            <h2 className="mb-4 text-2xl font-semibold">Packages by {guide.name}</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {packages.map((pkg: Record<string, unknown>) => (
                <Link key={pkg._id as string} to={`/packages/${pkg._id}`}>
                  <Card className="transition-all hover:shadow-md">
                    <CardContent className="flex items-center gap-4 p-4">
                      <div className="h-20 w-28 flex-shrink-0 overflow-hidden rounded-md">
                        <img
                          src={(pkg.images as string[])?.[0] || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=300"}
                          alt={pkg.title as string}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{pkg.title as string}</h3>
                        <p className="text-sm text-muted-foreground">{pkg.duration as string} days</p>
                        <span className="font-bold text-primary">${pkg.price as number}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
        {reviews?.length > 0 && (
          <div className="mt-8">
            <h2 className="mb-4 text-2xl font-semibold">Reviews</h2>
            <div className="space-y-4">
              {reviews.map((review: Record<string, unknown>) => (
                <Card key={review._id as string}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={(review.user as Record<string, string>)?.photo} />
                        <AvatarFallback>{(review.user as Record<string, string>)?.name?.[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">{(review.user as Record<string, string>)?.name}</p>
                          <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                size={14}
                                className={i < (review.rating as number) ? "fill-yellow-400 text-yellow-400" : "text-muted"}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">{review.comment as string}</p>
                        <p className="mt-2 text-xs text-muted-foreground">
                          {new Date(review.createdAt as string).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Leave a Review Section */}
        <div className="mt-8">
          <h2 className="mb-4 text-2xl font-semibold">Leave a Review</h2>
          <Card>
            <CardContent className="p-6">
              <div className="mb-4">
                <label className="mb-2 block text-sm font-medium">Rating</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setReviewRating(star)}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        size={28}
                        className={
                          star <= reviewRating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-muted-foreground"
                        }
                      />
                    </button>
                  ))}
                </div>
              </div>
              <Textarea
                placeholder="Share your experience with this guide..."
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                rows={4}
              />
              <Button
                className="mt-3"
                onClick={() => requireLogin(handleSubmitReview, "Please log in to leave a review.")}
                disabled={!reviewComment.trim() || createReview.isPending}
              >
                {createReview.isPending ? "Submitting..." : "Submit Review"}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Other Guides You May Like */}
        {otherGuides.length > 0 && (
          <div className="mt-8">
            <h2 className="mb-4 text-2xl font-semibold">Other Guides You May Like</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {otherGuides.map((g: Record<string, unknown>) => (
                <Link key={g._id as string} to={`/guides/${g._id}`}>
                  <Card className="group transition-all hover:shadow-md">
                    <CardContent className="p-4 text-center">
                      <Avatar className="mx-auto h-16 w-16 transition-transform group-hover:scale-105">
                        <AvatarImage src={g.photo as string} />
                        <AvatarFallback>{(g.name as string)?.[0]}</AvatarFallback>
                      </Avatar>
                      <h3 className="mt-2 font-semibold group-hover:text-primary">{g.name as string}</h3>
                      {g.rating ? (
                        <div className="mt-1 flex items-center justify-center gap-1 text-sm">
                          <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                          <span>{String(g.rating)}</span>
                        </div>
                      ) : null}
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {LoginModal}
    </div>
  );
}
