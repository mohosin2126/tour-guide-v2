import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <div className="relative">
      <div
        className="relative h-screen bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url(https://i.ibb.co/Y29WPDw/Sajek-Valley-20161205.jpg)",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
          <h1
            data-aos="fade-right"
            className="max-w-3xl font-serif text-2xl font-extrabold text-white md:text-4xl lg:text-5xl"
          >
            Your Gateway to Extraordinary Travel
          </h1>
          <p
            data-aos="fade-left"
            className="mt-4 max-w-2xl text-sm font-semibold text-stone-300 md:text-base"
          >
            Every journey is a carefully curated experience crafted just for you. Embark on a
            seamless adventure as our expert tour guides lead you through captivating destinations,
            unveiling hidden gems and cultural treasures.
          </p>
          <Link
            to="/packages"
            data-aos="fade-up"
            className="mt-8 inline-block rounded border border-primary bg-transparent px-6 py-2.5 font-serif font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
          >
            Explore Packages
          </Link>
        </div>
      </div>
    </div>
  );
}
