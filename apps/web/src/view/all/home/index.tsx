import { useState } from "react";
import ChooseCard from "@/components/reuseable/choose-card";
import FQAPage from "./fqa";
import HeroSection from "./hero-section";
import { CreditCard, ShieldCheck, Headphones, MapPin } from "lucide-react";
import Title from "@/components/reuseable/title";
import TopPlace from "./top-place";
import Testimonials from "./testimonials";
import Blogs from "./blogs";
import AboutUs from "./about-us";
import Subscribe from "./subscribe";
import { usePackages } from "@/hooks/api/use-packages";
import { useCategories } from "@/hooks/api/use-general";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, DollarSign } from "lucide-react";
import { CardSkeleton } from "@/components/ui/loading";

const blogData = [
  {
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800",
    title: "Top 10 Hidden Gems for Adventure Seekers in 2026",
    date: "February 15, 2026",
    category: "Adventure",
  },
  {
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
    title: "The Ultimate Guide to Budget-Friendly Beach Vacations",
    date: "February 10, 2026",
    category: "Beach",
  },
  {
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800",
    title: "How to Choose the Perfect Tour Guide for Your Trip",
    date: "January 28, 2026",
    category: "Tips",
  },
];

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("All");

  const { data, isLoading } = usePackages({ limit: "8", sort: "-createdAt" });
  const { data: categories } = useCategories();

  const packages =
    (data as Record<string, unknown>)?.packages as Record<string, unknown>[] ||
    (data as Record<string, unknown>[]) || [];

  const filteredPackages =
    activeTab === "All"
      ? packages
      : packages.filter(
          (pkg) =>
            (pkg.category as Record<string, string>)?.name?.toLowerCase() ===
            activeTab.toLowerCase()
        );

  const tabTitles = [
    { label: "All" },
    ...(categories?.map((cat: Record<string, string>) => ({ label: cat.name })) || []),
  ];

  return (
    <div>
      <HeroSection />
      <div className="custom-container mx-auto mt-12">
        <div>
          <AboutUs />
        </div>

        {/* Why Choose Us */}
        <Title title="We are best" subTitle="Why Choose Us" className="text-center" />
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <ChooseCard
            icon={CreditCard}
            title="Flexible Payment"
            desc="Multiple payment options with easy installment plans for your convenience"
            color="amber"
          />
          <ChooseCard
            icon={ShieldCheck}
            title="Verified Guides"
            desc="All our tour guides are thoroughly vetted and certified experts in their regions"
            color="emerald"
          />
          <ChooseCard
            icon={Headphones}
            title="24/7 Support"
            desc="Round-the-clock customer support to assist you at every step of your journey"
            color="blue"
          />
          <ChooseCard
            icon={MapPin}
            title="Best Destinations"
            desc="Handpicked destinations curated by travel experts for unforgettable experiences"
            color="rose"
          />
        </div>

        {/* Featured Tours - Dynamic */}
        <div className="mt-16">
          <Title title="Featured Tours" subTitle="Explore Our Packages" className="text-center" />
          <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
            {tabTitles.map((tab) => (
              <button
                key={tab.label}
                onClick={() => setActiveTab(tab.label)}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                  activeTab === tab.label
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-muted text-muted-foreground hover:bg-accent hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          ) : filteredPackages.length === 0 ? (
            <div className="flex min-h-[200px] flex-col items-center justify-center text-center">
              <p className="text-muted-foreground">No packages found in this category</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 lg:grid-cols-4">
              {filteredPackages.slice(0, 8).map((pkg: Record<string, unknown>) => (
                <Link key={pkg._id as string} to={`/packages/${pkg._id}`} className="block h-full">
                  <Card className="group flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={
                          (pkg.coverImage as string) ||
                          (pkg.images as string[])?.[0] ||
                          "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600"
                        }
                        alt={pkg.title as string}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      {(pkg.category as Record<string, string>)?.name && (
                        <Badge className="absolute left-3 top-3">
                          {(pkg.category as Record<string, string>).name}
                        </Badge>
                      )}
                      {pkg.rating ? (
                        <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-xs font-bold text-black backdrop-blur-sm">
                          ⭐ {String(pkg.rating)}
                        </div>
                      ) : null}
                    </div>
                    <CardContent className="flex-1 p-4">
                      <h3 className="line-clamp-1 text-lg font-semibold transition-colors group-hover:text-primary">
                        {String(pkg.title)}
                      </h3>
                      <div className="mt-2 flex min-h-5 items-center gap-3 text-sm text-muted-foreground">
                        {!!pkg.duration && (
                          <span className="flex items-center gap-1">
                            <Clock size={14} />
                            {String(pkg.duration)}d
                          </span>
                        )}
                        {!!(pkg.startLocation || pkg.location) && (
                          <span className="flex min-w-0 items-center gap-1">
                            <MapPin size={14} />
                            <span className="line-clamp-1">
                              {String(pkg.startLocation || pkg.location)}
                            </span>
                          </span>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="mt-auto flex items-center justify-between border-t px-4 py-3">
                      <span className="flex items-center gap-1 text-lg font-bold text-primary">
                        <DollarSign size={18} />{String(pkg.price)}
                      </span>
                      {!!pkg.difficulty && (
                        <Badge variant="outline" className="text-xs">
                          {String(pkg.difficulty)}
                        </Badge>
                      )}
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div>
          <TopPlace />
        </div>
        <div>
          <Testimonials />
        </div>
        <div>
          <Blogs blogData={blogData} />
        </div>
        <FQAPage />
        <Subscribe />
      </div>
    </div>
  );
}
