import ReactStars from "react-rating-stars-component";
import { BiSolidQuoteAltRight } from "react-icons/bi";
import Title from "@/components/reuseable/title";
import { useLatestReviews } from "@/hooks/api/use-reviews";

const fallbackTestimonials = [
  {
    _id: "1",
    user: { name: "Sarah Thompson", photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400" },
    rating: 5,
    comment: "An absolutely incredible experience! Our guide was knowledgeable and the itinerary was perfectly planned. Would recommend to everyone!",
  },
  {
    _id: "2",
    user: { name: "James Wilson", photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400" },
    rating: 4.5,
    comment: "The mountain trek was breathtaking. Everything was well organized and our guide made the trip truly memorable.",
  },
  {
    _id: "3",
    user: { name: "Emma Rodriguez", photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400" },
    rating: 5,
    comment: "Best vacation we've ever had! The beach tour was paradise. The team took care of every detail perfectly.",
  },
  {
    _id: "4",
    user: { name: "David Chen", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400" },
    rating: 4,
    comment: "Great cultural experience with an amazing guide. Learned so much about the local history and traditions.",
  },
];

export default function Testimonials() {
  const { data: reviews } = useLatestReviews(4);

  const displayReviews = reviews?.length > 0
    ? reviews.map((r: Record<string, unknown>) => ({
        _id: r._id as string,
        user: r.user as Record<string, string>,
        rating: r.rating as number,
        comment: r.comment as string,
      }))
    : fallbackTestimonials;

  return (
    <div className="my-20">
      <Title title="Testimonials" subTitle="Love from our Clients" className="text-center" />
      <div className="mx-auto grid w-full grid-cols-1 gap-8 pt-16 md:grid-cols-2 lg:w-11/12 lg:grid-cols-4">
        {displayReviews.map((testimonial: Record<string, unknown>) => (
          <div key={testimonial._id as string} className="relative pt-10">
            <div className="group relative rounded-md border bg-card from-amber-600 p-8 text-card-foreground [transition:0.5s] ease-in-out hover:bg-gradient-to-b dark:border-none">
              <div className="absolute -top-14 left-1/2 z-10 -translate-x-1/2 transform">
                <img
                  src={(testimonial.user as Record<string, string>)?.photo || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400"}
                  alt="profile-image"
                  className="h-20 w-20 rounded-full border-4 border-white object-cover shadow-lg group-hover:border-amber-400"
                />
              </div>
              <div className="absolute bottom-3 right-5 text-gray-200 dark:text-gray-700">
                <BiSolidQuoteAltRight size={80} />
              </div>
              <p className="mb-7 mt-3 line-clamp-4 text-center text-muted-foreground">{testimonial.comment as string}</p>
              <div className="flex flex-col items-center justify-center text-center">
                <h1 className="mb-2 text-xl font-bold text-foreground">{(testimonial.user as Record<string, string>)?.name}</h1>
                <p className="text-base font-semibold text-gray-500">Traveler</p>
                <ReactStars
                  count={5}
                  value={testimonial.rating as number}
                  size={28}
                  edit={false}
                  isHalf={true}
                  activeColor="#ff6b00"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
