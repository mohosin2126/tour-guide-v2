import { Link } from "react-router-dom";
import { MdOutlineWatchLater } from "react-icons/md";
import { FaUserAlt, FaLongArrowAltRight } from "react-icons/fa";
import ReactStars from "react-rating-stars-component";
import type { TourCardData } from "@/types";

interface TourCardProps {
  tourData: TourCardData[];
}

export default function TourCard({ tourData }: TourCardProps) {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
      {tourData.map((tour, index) => (
        <div key={index} className="rounded-lg border">
          <div className="relative h-[260px] w-full overflow-hidden rounded-t-lg">
            <img
              src={tour.image}
              alt="card-image"
              className="h-full w-full rounded-t-lg object-cover transition-transform duration-500 hover:scale-110"
            />
            <button className="absolute right-2 top-2 z-10 flex h-6 items-center gap-1 rounded-full bg-white px-2 font-semibold text-black">
              <ReactStars
                count={1}
                size={22}
                edit={false}
                isHalf={true}
                color="#000"
              />
              {tour.rating}
            </button>
          </div>
          <div className="mt-3 flex flex-col items-start justify-start gap-4 p-4">
            <strong className="text-lg font-semibold uppercase text-gray-900 dark:text-gray-400">
              {tour.country}
            </strong>
            <h1 className="text-xl font-bold text-black transition-colors duration-500 hover:text-[#FF6B00] dark:text-white">
              {tour.title}
            </h1>
            <p className="text-base font-normal text-gray-700 dark:text-gray-200">
              From -{" "}
              <span className="text-2xl text-[#FF6B00]">
                ${tour.price.current.toFixed(2)}
              </span>
              <span className="line-through">
                {" "}
                ${tour.price.original.toFixed(2)}
              </span>
            </p>
            <div className="flex gap-5">
              <div className="flex items-center gap-3">
                <MdOutlineWatchLater size={22} />
                <p className="text-gray-700 dark:text-gray-200">{tour.days}</p>
              </div>
              <div className="flex items-center gap-3">
                <FaUserAlt size={22} />
                <p className="text-gray-700 dark:text-gray-200">{tour.people}</p>
              </div>
            </div>
            <Link
              to={tour.link}
              className="group flex items-center gap-3 text-lg font-bold transition-colors duration-500 hover:text-[#FF6B00]"
            >
              <p className="text-black transition-colors duration-500 group-hover:text-[#FF6B00] dark:text-white">
                Explore more
              </p>
              <FaLongArrowAltRight size={22} />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
