import { Link } from 'react-router-dom';
import { MdOutlineWatchLater } from 'react-icons/md';
import { FaUserAlt, FaLongArrowAltRight } from 'react-icons/fa';
import ReactStars from "react-rating-stars-component";



export default function TourCard({ tourData }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      {tourData.map((tour, index) => (
        <div key={index} className="rounded-lg border">
          <div className='w-full h-[260px] rounded-t-lg overflow-hidden relative'>
            <img
              src={tour.image}
              alt="card-image"
              className='w-full h-full rounded-t-lg hover:scale-110 [transition:0.5s]'
            />
            <button className='px-2 h-6 font-semibold bg-white text-black rounded-full z-10 absolute right-2 top-2 flex items-center gap-1'>
              <ReactStars
                count={1}
                size={22}
                edit={false}
                isHalf={true}
                color="#000"
              />
             {tour?.rating}
            </button>
          </div>
          <div className='flex items-start justify-start flex-col gap-4 mt-3 p-4'>
            <strong className='uppercase text-lg font-semibold text-gray-900 dark:text-gray-400'>
              {tour.country}
            </strong>
            <h1 className='text-xl font-bold text-black dark:text-white hover:text-[#FF6B00] [transition:0.5s]'>
              {tour.title}
            </h1>
            <p className='text-base font-normal dark:text-gray-200 text-gray-700'>
              From - <span className='text-[#FF6B00] text-2xl'>${tour.price.current.toFixed(2)}</span>
              <span className='line-through'> ${tour.price.original.toFixed(2)}</span>
            </p>
            <div className='flex gap-5 '>
              <div className='flex gap-3 items-center'>
                <MdOutlineWatchLater size={22} />
                <p className='dark:text-gray-200 text-gray-700'>{tour.days}</p>
              </div>
              <div className='flex gap-3 items-center'>
                <FaUserAlt size={22} />
                <p className='dark:text-gray-200 text-gray-700'>{tour.people}</p>
              </div>
            </div>
            <Link to={tour.link} className='flex gap-3 items-center group hover:text-[#FF6B00] [transition:0.5s] text-lg font-bold'>
              <p className='text-black dark:text-white group-hover:text-[#FF6B00] [transition:0.5s]'>Explore more</p>
              <FaLongArrowAltRight size={22} />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
