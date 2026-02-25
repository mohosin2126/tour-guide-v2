import { Link } from "react-router-dom";
import { MapPin, Star, Users, ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
      <div className="relative">
        <div
            className="relative h-screen bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url(https://i.ibb.co/Y29WPDw/Sajek-Valley-20161205.jpg)",
            }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />

          {/* Decorative elements */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute -right-32 bottom-1/4 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
          </div>

          <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white/90 backdrop-blur-sm">
              <Star size={14} className="fill-yellow-400 text-yellow-400" />
              Trusted by 10,000+ travelers worldwide
            </div>

            <h1 className="max-w-4xl text-4xl font-extrabold leading-tight text-white md:text-5xl lg:text-6xl">
              Your Gateway to{" "}
              <span className="bg-gradient-to-r from-primary via-rose-400 to-amber-400 bg-clip-text text-transparent">
              Extraordinary
            </span>{" "}
              Travel
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
              Every journey is a carefully curated experience crafted just for you. Embark on a
              seamless adventure as our expert tour guides lead you through captivating destinations,
              unveiling hidden gems and cultural treasures.
            </p>

            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
              <Link
                  to="/packages"
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 font-semibold text-white shadow-lg shadow-primary/30 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/40"
              >
                Explore Packages
                <ArrowRight size={18} />
              </Link>
              <Link
                  to="/guides"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-8 py-3.5 font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20"
              >
                Meet Our Guides
              </Link>
            </div>

            {/* Floating stats */}
            <div className="mt-14 flex items-center gap-6 sm:gap-10">
              {[
                { icon: MapPin, label: "Destinations", value: "50+" },
                { icon: Users, label: "Expert Guides", value: "150+" },
                { icon: Star, label: "Avg Rating", value: "4.8" },
              ].map((stat) => (
                  <div key={stat.label} className="flex items-center gap-2.5 text-white/80">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
                      <stat.icon size={18} />
                    </div>
                    <div className="text-left">
                      <p className="text-lg font-bold text-white">{stat.value}</p>
                      <p className="text-xs text-white/60">{stat.label}</p>
                    </div>
                  </div>
              ))}
            </div>
          </div>

          {/* Bottom wave */}
          <svg className="absolute bottom-0 left-0 right-0 h-12 w-full text-background" preserveAspectRatio="none" viewBox="0 0 1440 48">
            <path fill="currentColor" d="M0,48 L0,24 Q360,0 720,24 Q1080,48 1440,24 L1440,48 Z" />
          </svg>
        </div>
      </div>
  );
}