import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useState, useEffect } from 'react';

export default function HeroSection() {
    const [autoplayTime, setAutoplayTime] = useState(0);

    const onAutoplayTimeLeft = (s, time) => {
        setAutoplayTime(Math.ceil(time / 1000));
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setAutoplayTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const slidesData = [
        {
          backgroundImage: "https://i.ibb.co/Y29WPDw/Sajek-Valley-20161205.jpg",
          title: "Your Gateway to Extraordinary Travel",
          description:
            "Welcome to Your Gateway to Extraordinary Travel, where every journey is a carefully curated experience crafted just for you. Embark on a seamless adventure as our expert tour guides lead you through captivating destinations, unveiling hidden gems and cultural treasures.",
          buttonText: "Continue Reading",
        },
        {
          backgroundImage:
            "https://i.ibb.co/Zm6FDLD/top-ten-tourist-places-to-visit-in-bangladesh-1.webp",
          title: "Your Gateway to Extraordinary Travel",
          description:
            "Welcome to Your Gateway to Extraordinary Travel, where every journey is a carefully curated experience crafted just for you. Embark on a seamless adventure as our expert tour guides lead you through captivating destinations, unveiling hidden gems and cultural treasures.",
          buttonText: "Continue Reading",
        },
        {
          backgroundImage: "https://i.ibb.co/Sn33hpM/Kuakata-beach.jpg",
          title: "Your Gateway to Extraordinary Travel",
          description:
            "Welcome to Your Gateway to Extraordinary Travel, where every journey is a carefully curated experience crafted just for you. Embark on a seamless adventure as our expert tour guides lead you through captivating destinations, unveiling hidden gems and cultural treasures.",
          buttonText: "Continue Reading",
        },
      ];
  return (
 <div className="relative">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper"
      >
        {slidesData.map((slide, index) => (
          <SwiperSlide key={index}>
            <div>
              <div
                className="hero h-screen"
                style={{
                  backgroundImage: `url(${slide.backgroundImage})`,
                }}
              >
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                  <div>
                    <div data-aos="fade-right">
                      <h1 className="text-center font-serif md:font-extrabold md:text-4xl text-2xl text-white">
                        {slide.title}
                      </h1>
                    </div>

                    <div data-aos="fade-left">
                      <p className="text-center mt-2 md:font-semibold md:text-base text-sm text-stone-300">
                        {slide.description}
                      </p>
                      <button className="mt-5 flex mx-auto bg-transparent hover:bg-red-600 text-red-600 font-serif font-semibold hover:text-white py-1 md:py-2 px-2 md:px-4 border hover:border-transparent rounded">
                        {slide.buttonText}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
