import { Star, Quote } from "lucide-react";
import Title from "@/components/reuseable/title";
import { useLatestReviews } from "@/hooks/api/use-reviews";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/loading";

type ReviewUser = {
  name?: string;
  photo?: string;
};

type Review = {
  _id: string;
  user: ReviewUser;
  rating: number;
  comment: string;
};

const fallbackTestimonials: Review[] = [
  {
    _id: "1",
    user: {
      name: "Sarah Thompson",
      photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    },
    rating: 5,
    comment:
      "An absolutely incredible experience! Our guide was knowledgeable and the itinerary was perfectly planned. Would recommend to everyone!",
  },
  {
    _id: "2",
    user: {
      name: "James Wilson",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
    },
    rating: 5,
    comment:
      "The mountain trek was breathtaking. Everything was well organized and our guide made the trip truly memorable.",
  },
  {
    _id: "3",
    user: {
      name: "Emma Rodriguez",
      photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
    },
    rating: 5,
    comment:
      "Best vacation we've ever had! The beach tour was paradise. The team took care of every detail perfectly.",
  },
  {
    _id: "4",
    user: {
      name: "David Chen",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    },
    rating: 4,
    comment:
      "Great cultural experience with an amazing guide. Learned so much about the local history and traditions.",
  },
  {
    _id: "5",
    user: {
      name: "Priya Patel",
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
    },
    rating: 5,
    comment:
      "From start to finish, everything was seamless. The guide was passionate and made the whole group feel welcome and excited.",
  },
  {
    _id: "6",
    user: {
      name: "Marcus Brown",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    },
    rating: 5,
    comment:
      "I've traveled with many companies, but this was by far the best. Authentic experiences you simply can't get on your own.",
  },
];

function StarRating({ rating }: { rating: number }) {
  const safeRating = Math.max(0, Math.min(5, Number(rating) || 0));
  const filled = Math.round(safeRating);
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={16}
          className={
            i < filled
              ? "fill-yellow-400 text-yellow-400"
              : "text-muted-foreground/30"
          }
        />
      ))}
    </div>
  );
}

function getInitials(name?: string) {
  if (!name) return "U";
  return name
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 4);
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null;
}

function toStringSafe(v: unknown, fallback = ""): string {
  return typeof v === "string" ? v : fallback;
}

function toNumberSafe(v: unknown, fallback = 0): number {
  return typeof v === "number" ? v : fallback;
}

export default function Testimonials() {
  const limit = 6;
  const { data: reviews, isLoading, isError } = useLatestReviews(limit);

  const normalized: Review[] = Array.isArray(reviews)
    ? (reviews as unknown[]).map((item, idx) => {
        const r = isRecord(item) ? item : {};

        const userObj = isRecord(r.user) ? (r.user as Record<string, unknown>) : {};

        return {
          _id: String((r._id as unknown) ?? `api-${idx}`),
          user: {
            name: toStringSafe(userObj.name, "Unknown"),
            photo: toStringSafe(userObj.photo, ""),
          },
          rating: toNumberSafe(r.rating, 0),
          comment: toStringSafe(r.comment, ""),
        };
      })
    : [];


  const displayReviews: Review[] =
    normalized.length >= limit
      ? normalized.slice(0, limit)
      : [
          ...normalized,
          ...fallbackTestimonials
            .filter((fb) => !normalized.some((n) => n._id === fb._id))
            .slice(0, limit - normalized.length),
        ];

  return (
    <div className="my-20">
      <Title
        title="Testimonials"
        subTitle="Love from our Clients"
        className="text-center"
      />

      <div className="pt-4 text-center text-xs text-muted-foreground">
        {isError && "Could not load latest testimonials. Showing sample ones."}
      </div>

      <div className="mx-auto grid w-full grid-cols-1 gap-6 pt-10 md:grid-cols-2 lg:w-11/12 lg:grid-cols-3">
        {isLoading &&
          Array.from({ length: limit }).map((_, i) => (
            <div key={`testimonial-skeleton-${i}`} className="rounded-2xl border bg-card p-6">
              <div className="mb-4 flex items-center gap-3">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
              <Skeleton className="h-4 w-24" />
              <div className="mt-3 space-y-2">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-5/6" />
              </div>
            </div>
          ))}
        {!isLoading && displayReviews.map((testimonial) => {
          const initials = getInitials(testimonial.user?.name);

          return (
            <div
              key={testimonial._id}
              className="group relative rounded-2xl border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <Quote
                size={32}
                className="absolute right-5 top-5 text-primary/10 transition-colors group-hover:text-primary/20"
              />

              <div className="mb-4 flex items-center gap-3">
                <Avatar className="h-12 w-12 ring-2 ring-primary/10 ring-offset-2 ring-offset-background">
                  <AvatarImage src={testimonial.user?.photo} />
                  <AvatarFallback className="text-sm font-medium">
                    {initials}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <p className="font-semibold text-foreground">
                    {testimonial.user?.name}
                  </p>
                  <p className="text-xs text-muted-foreground">Traveler</p>
                </div>
              </div>

              <StarRating rating={testimonial.rating} />

              <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-muted-foreground">
                {testimonial.comment}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
