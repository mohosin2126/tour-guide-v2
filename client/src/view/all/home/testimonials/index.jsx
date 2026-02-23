import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import ReactStars from 'react-rating-stars-component';
import { BiSolidQuoteAltRight } from "react-icons/bi";
import { useState, useEffect } from 'react';
import Title from '../../../../Components/reuseable/title/inex';


export default function Testimonials() {
    const [autoplayTime, setAutoplayTime] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setAutoplayTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    // Sample data for testimonials
    const testimonials = [
        {
            id: 1,
            name: "Mohosin Ali Shah",
            role: "Backend Developer",
            rating: 4.5,
            review:
                "Fusce eleifend loremo suscipit teach or moeto Fames gravid nulam lectus vivera placert utricies. Lorem ipsum dolor sit amet more vel turpis penabus. Lorem ipsum dolor sit amet more vel turpis penabus.",
            image: "https://placehold.co/2000x2000",
        },
        {
            id: 2,
            name: "Sushil Hemrom",
            role: "Frontend Developer",
            rating: 4.5,
            review:
                "Suscipit teach or moeto Fames gravid nulam lectus vivera placert utricies. Lorem ipsum dolor sit amet more vel turpis penabus. Fusce eleifend loremo. Lorem ipsum dolor sit amet more vel turpis penabus.",
            image: "https://placehold.co/2000x2000",
        },
        {
            id: 3,
            name: "Amira Khan",
            role: "UI/UX Designer",
            rating: 4.8,
            review:
                "Lorem ipsum dolor sit amet consectetur adipiscing elit. Nam viverra ultricies felis. Pellentesque habitant morbi tristique senectus et netus et malesuada. Lorem ipsum dolor sit amet more vel turpis penabus.",
            image: "https://placehold.co/2000x2000",
        },
        {
            id: 4,
            name: "Rahul Verma",
            role: "Software Engineer",
            rating: 4.7,
            review:
                "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Enim facilisis gravida neque convallis a cras semper auctor neque. Lorem ipsum dolor sit amet more vel turpis penabus.",
            image: "https://placehold.co/2000x2000",
        },
    ];



    return (
        <div className='my-20'>
            <Title title="Testimonials" subTitle="Love from our Clients" className="text-center" />

            <div className="relative w-full lg:w-11/12 mx-auto">
                <Swiper
                    spaceBetween={30}
                    autoplay={{
                        delay: 4000,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    loop={true}
                    modules={[Autoplay]}
                    className="mySwiper"
                    slidesPerView={1}
                    breakpoints={{
                        640: {
                            slidesPerView: 1,
                        },
                        768: {
                            slidesPerView: 1,
                        },
                        1024: {
                            slidesPerView: 2,
                        },
                    }}
                >
                    {testimonials.map((testimonial) => (
                        <SwiperSlide key={testimonial?.id} className='overflow-visible z-0 pt-16 '>
                            <div className="bg-white dark:bg-gray-900 border dark:border-none hover:bg-gradient-to-b from-amber-600 [transition:0.5s] ease-in-out group text-black p-8 rounded-md relative">
                                {/* Profile Image - Positioned Absolutely */}
                                <div className="absolute -top-14 left-1/2 transform -translate-x-1/2 z-50">
                                    <img
                                        src={testimonial.image}
                                        alt="profile-image"
                                        className="w-20 h-20 rounded-full border-4 border-white shadow-lg group-hover:border-amber-400"
                                    />
                                </div>
                                <div className='absolute right-5 bottom-3 dark:text-gray-700 text-gray-200'>
                                    <BiSolidQuoteAltRight size={80} />
                                </div>
                                {/* Content inside card */}
                                <p className="dark:text-gray-400 text-gray-700 mt-3 mb-7 text-center">{testimonial.review}</p>
                                <div className="flex items-center justify-center flex-col text-center ">
                                    <h1 className="text-xl font-bold dark:text-white text-black mb-2">{testimonial.name}</h1>
                                    <p className="text-base font-semibold text-gray-500">{testimonial.role}</p>
                                    <ReactStars
                                        count={5}
                                        value={testimonial.rating}
                                        size={28}
                                        edit={false}
                                        isHalf={true}
                                        activeColor="#ff6b00"
                                    />
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}
