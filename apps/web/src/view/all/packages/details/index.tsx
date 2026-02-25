import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { MapPin, Clock, Users, Star, Heart, ArrowLeft, Share2, CheckCircle2, CalendarDays } from "lucide-react";
import { usePackage, usePackages } from "@/hooks/api/use-packages";
import { useCreateBooking } from "@/hooks/api/use-bookings";
import { useAddToWishlist, useWishlist, useRemoveFromWishlist } from "@/hooks/api/use-wishlist";
import { useGuideReviews } from "@/hooks/api/use-reviews";
import { useAuth } from "@/hooks/auth/use-auth";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageLoader } from "@/components/ui/loading";
import { useLoginGuard } from "@/components/shared/login-modal";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

export default function PackageDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { requireLogin, LoginModal } = useLoginGuard();
  const { data: pkg, isLoading } = usePackage(id);
  const bookMutation = useCreateBooking();
  const wishlistMutation = useAddToWishlist();
  const removeWishlistMutation = useRemoveFromWishlist();
  const { data: wishlistData } = useWishlist();
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingDate, setBookingDate] = useState("");
  const [guests, setGuests] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  // Related packages in same category
  const { data: relatedData } = usePackages({
    category: pkg?.category?._id || "",
    limit: "4",
  });
  const relatedPackages = (
    (relatedData as Record<string, unknown>)?.packages as Record<string, unknown>[] ||
    (relatedData as Record<string, unknown>[]) || []
  ).filter((p) => (p._id as string) !== id);

  // Guide reviews
  const { data: reviewsData } = useGuideReviews(pkg?.guide?._id);
  const reviews = reviewsData?.reviews || [];

  // Check if already wishlisted
  const wishlistItems = wishlistData || [];
  const wishlistEntry = wishlistItems.find(
    (w: Record<string, unknown>) =>
      (w.package as Record<string, string>)?._id === id ||
      w.package === id ||
      (w.packageId as Record<string, string>)?._id === id ||
      w.packageId === id
  );
  const isWishlisted = !!wishlistEntry;

  if (isLoading) return <PageLoader />;
  if (!pkg) return <div className="pt-24 text-center">Package not found</div>;

  const images = pkg.images?.length > 0 ? pkg.images : [pkg.coverImage || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200"];
  const itinerary = pkg.activities || pkg.itinerary || [];

  const handleBook = () => {
    requireLogin(() => setBookingOpen(true), "Please log in to book this tour package.");
  };

  const confirmBooking = () => {
    if (!bookingDate) {
      toast.error("Please select a travel date");
      return;
    }
    if (!user) {
      toast.error("Please log in to book");
      return;
    }
    bookMutation.mutate(
      {
        package: pkg._id,
        guide: pkg.guide?._id,
        user: user.id || user._id,
        travelDate: bookingDate,
        guests: Number(guests),
        totalPrice: pkg.price * Number(guests),
      },
      {
        onSuccess: () => {
          toast.success("Booking confirmed! Redirecting...");
          setBookingOpen(false);
          navigate("/user/bookings");
        },
        onError: (err: unknown) => {
          const message = (err as Record<string, Record<string, Record<string, string>>>)?.response?.data?.error;
          toast.error(message || "Booking failed. Please try again.");
        },
      }
    );
  };

  const handleWishlist = () => {
    requireLogin(() => {
      if (isWishlisted && wishlistEntry) {
        removeWishlistMutation.mutate(wishlistEntry._id as string, {
          onSuccess: () => toast.success("Removed from wishlist"),
          onError: () => toast.error("Failed to remove from wishlist"),
        });
      } else {
        wishlistMutation.mutate(pkg._id, {
          onSuccess: () => toast.success("Added to wishlist"),
          onError: () => toast.error("Failed to add to wishlist"),
        });
      }
    }, "Please log in to manage your wishlist.");
  };

  const difficultyLabel = (d: string) => {
    const map: Record<string, string> = { easy: "Easy", moderate: "Moderate", difficult: "Challenging", medium: "Moderate", hard: "Challenging" };
    return map[d] || d;
  };

  return (
    <div className="min-h-screen pb-16 pt-24">
      <div className="custom-container">
        <Button variant="ghost" className="mb-4" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} className="mr-2" />Back
        </Button>
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            {/* Image Gallery */}
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
              <img
                src={images[selectedImage] || images[0]}
                alt={pkg.title}
                className="h-full w-full object-cover transition-all duration-500"
              />
              <div className="absolute right-4 top-4 flex gap-2">
                <Button
                  size="icon"
                  variant="secondary"
                  onClick={handleWishlist}
                  className={isWishlisted ? "bg-red-500 text-white hover:bg-red-600" : ""}
                >
                  <Heart size={18} className={isWishlisted ? "fill-white" : ""} />
                </Button>
                <Button size="icon" variant="secondary">
                  <Share2 size={18} />
                </Button>
              </div>
              {pkg.availability === false && (
                <div className="absolute left-4 top-4">
                  <Badge variant="destructive" className="text-sm">Sold Out</Badge>
                </div>
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((img: string, i: number) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`h-20 w-28 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                      selectedImage === i ? "border-primary ring-2 ring-primary/30" : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Info Header */}
            <div>
              <div className="mb-3 flex flex-wrap items-center gap-2">
                {pkg.category?.name && <Badge>{pkg.category.name}</Badge>}
                {pkg.difficulty && <Badge variant="outline">{difficultyLabel(pkg.difficulty)}</Badge>}
                {pkg.tourType && <Badge variant="secondary">{pkg.tourType}</Badge>}
              </div>
              <h1 className="text-3xl font-bold">{pkg.title}</h1>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {pkg.startLocation && (
                  <div className="flex items-center gap-2 rounded-lg border bg-muted/50 p-3">
                    <MapPin size={18} className="text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Location</p>
                      <p className="text-sm font-medium">{pkg.startLocation}</p>
                    </div>
                  </div>
                )}
                {pkg.duration && (
                  <div className="flex items-center gap-2 rounded-lg border bg-muted/50 p-3">
                    <Clock size={18} className="text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Duration</p>
                      <p className="text-sm font-medium">{pkg.duration} days</p>
                    </div>
                  </div>
                )}
                {pkg.maxGroupSize && (
                  <div className="flex items-center gap-2 rounded-lg border bg-muted/50 p-3">
                    <Users size={18} className="text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Group Size</p>
                      <p className="text-sm font-medium">Max {pkg.maxGroupSize}</p>
                    </div>
                  </div>
                )}
                {pkg.rating && (
                  <div className="flex items-center gap-2 rounded-lg border bg-muted/50 p-3">
                    <Star size={18} className="fill-yellow-400 text-yellow-400" />
                    <div>
                      <p className="text-xs text-muted-foreground">Rating</p>
                      <p className="text-sm font-medium">{pkg.rating}/5</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <Separator />

            {/* About */}
            <div>
              <h2 className="mb-3 text-xl font-semibold">About this tour</h2>
              <p className="whitespace-pre-line leading-relaxed text-muted-foreground">{pkg.description}</p>
            </div>

            {/* Locations */}
            {pkg.locations?.length > 0 && (
              <div>
                <h2 className="mb-3 text-xl font-semibold">Places You&apos;ll Visit</h2>
                <div className="flex flex-wrap gap-2">
                  {pkg.locations.map((loc: string, i: number) => (
                    <div key={i} className="flex items-center gap-1.5 rounded-full border bg-muted/50 px-4 py-2 text-sm">
                      <MapPin size={14} className="text-primary" />
                      {loc}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Itinerary / Activities */}
            {itinerary.length > 0 && (
              <div>
                <h2 className="mb-4 text-xl font-semibold">Tour Itinerary</h2>
                <div className="relative space-y-0">
                  {itinerary.map((day: Record<string, string | number>, i: number) => (
                    <div key={i} className="relative flex gap-4 pb-6">
                      <div className="flex flex-col items-center">
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                          {day.day || i + 1}
                        </div>
                        {i < itinerary.length - 1 && (
                          <div className="mt-1 h-full w-0.5 bg-primary/20" />
                        )}
                      </div>
                      <div className="flex-1 rounded-xl border bg-card p-4 transition-all hover:shadow-sm">
                        <h4 className="font-semibold">{day.title || `Day ${day.day || i + 1}`}</h4>
                        <p className="mt-1 text-sm text-muted-foreground">{day.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* What's Included */}
            {pkg.includes?.length > 0 && (
              <div>
                <h2 className="mb-3 text-xl font-semibold">What&apos;s Included</h2>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {pkg.includes.map((item: string, i: number) => (
                    <div key={i} className="flex items-center gap-2 rounded-lg border bg-card p-3 text-sm">
                      <CheckCircle2 size={16} className="flex-shrink-0 text-green-500" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews section */}
            {reviews.length > 0 && (
              <div>
                <h2 className="mb-4 text-xl font-semibold">Traveler Reviews</h2>
                <div className="space-y-3">
                  {reviews.slice(0, 5).map((review: Record<string, unknown>) => (
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
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <Card className="sticky top-24">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-3xl font-bold text-primary">${pkg.price}</span>
                    <span className="text-muted-foreground"> /person</span>
                  </div>
                  {pkg.rating && (
                    <div className="flex items-center gap-1 rounded-full bg-yellow-400/10 px-3 py-1">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{pkg.rating}</span>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full" size="lg" onClick={handleBook}>
                  <CalendarDays size={18} className="mr-2" />
                  Book Now
                </Button>
                <Button
                  variant={isWishlisted ? "default" : "outline"}
                  className={`w-full ${isWishlisted ? "bg-red-500 hover:bg-red-600" : ""}`}
                  onClick={handleWishlist}
                  disabled={wishlistMutation.isPending || removeWishlistMutation.isPending}
                >
                  <Heart size={18} className={`mr-2 ${isWishlisted ? "fill-white" : ""}`} />
                  {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                </Button>
                <Separator />
                <div className="space-y-2 text-sm">
                  {pkg.duration && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Duration</span>
                      <span className="font-medium">{pkg.duration} days</span>
                    </div>
                  )}
                  {pkg.maxGroupSize && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Group Size</span>
                      <span className="font-medium">Up to {pkg.maxGroupSize}</span>
                    </div>
                  )}
                  {pkg.difficulty && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Difficulty</span>
                      <span className="font-medium">{difficultyLabel(pkg.difficulty)}</span>
                    </div>
                  )}
                  {pkg.tourType && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tour Type</span>
                      <span className="font-medium">{pkg.tourType}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {pkg.guide && (
              <Card>
                <CardHeader><CardTitle className="text-base">Your Guide</CardTitle></CardHeader>
                <CardContent>
                  <Link to={`/guides/${pkg.guide._id}`} className="flex items-center gap-3 transition-colors hover:text-primary">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={pkg.guide.photo} />
                      <AvatarFallback>{pkg.guide.name?.[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{pkg.guide.name}</p>
                      <p className="text-sm text-muted-foreground">{pkg.guide.bio?.slice(0, 60) || pkg.guide.email}</p>
                    </div>
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Related Packages */}
        {relatedPackages.length > 0 && (
          <div className="mt-12">
            <h2 className="mb-6 text-2xl font-bold">Related Packages</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPackages.slice(0, 3).map((rpkg: Record<string, unknown>) => (
                <Link key={rpkg._id as string} to={`/packages/${rpkg._id}`}>
                  <Card className="group overflow-hidden transition-all hover:shadow-lg">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={(rpkg.coverImage as string) || (rpkg.images as string[])?.[0] || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600"}
                        alt={rpkg.title as string}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold group-hover:text-primary">{rpkg.title as string}</h3>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="font-bold text-primary">${String(rpkg.price)}</span>
                        {rpkg.duration ? <span className="text-sm text-muted-foreground">{String(rpkg.duration)} days</span> : null}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Booking Dialog */}
      <Dialog open={bookingOpen} onOpenChange={setBookingOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Book: {pkg.title}</DialogTitle>
            <DialogDescription>${pkg.price} per person. Fill in details below.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Travel Date</Label>
              <Input type="date" value={bookingDate} onChange={(e) => setBookingDate(e.target.value)} min={new Date().toISOString().split("T")[0]} />
            </div>
            <div className="space-y-2">
              <Label>Number of Guests</Label>
              <Input type="number" min="1" max={pkg.maxGroupSize || 20} value={guests} onChange={(e) => setGuests(Number(e.target.value))} />
            </div>
            <div className="rounded-lg bg-muted px-4 py-3">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>${pkg.price} × {guests} guest{guests > 1 ? "s" : ""}</span>
              </div>
              <div className="mt-1 flex justify-between">
                <span className="font-semibold">Total</span>
                <span className="text-xl font-bold text-primary">${pkg.price * (guests || 1)}</span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setBookingOpen(false)}>Cancel</Button>
            <Button onClick={confirmBooking} disabled={!bookingDate || bookMutation.isPending}>
              {bookMutation.isPending ? "Booking..." : "Confirm Booking"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {LoginModal}
    </div>
  );
}
