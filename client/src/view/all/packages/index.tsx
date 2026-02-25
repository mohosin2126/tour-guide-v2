import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Filter, MapPin, Clock, DollarSign, ShieldCheck, HeadphonesIcon, CreditCard, Award } from "lucide-react";
import { usePackages } from "@/hooks/api/use-packages";
import { useCategories } from "@/hooks/api/use-general";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PageLoader, CardSkeleton } from "@/components/ui/loading";
import PageHero from "@/components/shared/page-hero";
import Subscribe from "@/view/all/home/subscribe";

export default function PackagesPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("-createdAt");
  const [page, setPage] = useState(1);

  const { data, isLoading } = usePackages({
    search: search || undefined,
    category: category || undefined,
    sort,
    page: String(page),
    limit: "12",
  });

  const { data: categories } = useCategories();

  const packages = (data as Record<string, unknown>)?.packages as Record<string, unknown>[] ||
    (data as Record<string, unknown>[]) || [];
  const totalPages = ((data as Record<string, unknown>)?.totalPages as number) || 1;

  return (
    <div className="min-h-screen pb-16">
      <PageHero
        title="Tour Packages"
        subtitle="Discover amazing destinations and create unforgettable memories"
        backgroundImage="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600"
        height="short"
        breadcrumbs={[{ label: "Packages" }]}
      />

      <div className="custom-container pt-10">

        <div className="mb-8 flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search packages..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="pl-10"
            />
          </div>
          <Select
            value={category}
            onValueChange={(val) => {
              setCategory(val === "all" ? "" : val);
              setPage(1);
            }}
          >
            <SelectTrigger className="w-full sm:w-48">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories?.map((cat: Record<string, string>) => (
                <SelectItem key={cat._id} value={cat._id}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="-createdAt">Newest</SelectItem>
              <SelectItem value="price">Price: Low to High</SelectItem>
              <SelectItem value="-price">Price: High to Low</SelectItem>
              <SelectItem value="-rating">Rating</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : packages.length === 0 ? (
          <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
            <MapPin className="mb-4 h-16 w-16 text-muted-foreground/50" />
            <h3 className="text-lg font-semibold">No packages found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {packages.map((pkg: Record<string, unknown>) => (
                <Link key={pkg._id as string} to={`/packages/${pkg._id}`}>
                  <Card className="group overflow-hidden transition-all hover:shadow-lg">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={
                          (pkg.images as string[])?.[0] ||
                          "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600"
                        }
                        alt={pkg.title as string}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      {(pkg.category as Record<string, string>)?.name && (
                        <Badge className="absolute left-3 top-3">
                          {(pkg.category as Record<string, string>).name}
                        </Badge>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <h3 className="line-clamp-1 text-lg font-semibold group-hover:text-primary">
                        {String(pkg.title)}
                      </h3>
                      <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                        {String(pkg.description)}
                      </p>
                      <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
                        {!!pkg.duration && (
                          <span className="flex items-center gap-1">
                            <Clock size={14} />
                            {String(pkg.duration)} days
                          </span>
                        )}
                        {!!pkg.location && (
                          <span className="flex items-center gap-1">
                            <MapPin size={14} />
                            {String(pkg.location)}
                          </span>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="flex items-center justify-between border-t px-4 py-3">
                      <span className="flex items-center gap-1 text-lg font-bold text-primary">
                        <DollarSign size={18} />${String(pkg.price)}
                      </span>
                      {!!pkg.difficulty && (
                        <Badge variant="outline">{String(pkg.difficulty)}</Badge>
                      )}
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
            {totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => p - 1)}
                >
                  Previous
                </Button>
                <span className="px-4 text-sm text-muted-foreground">
                  Page {page} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => p + 1)}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Popular Categories Section */}
      {categories?.length > 0 && (
        <div className="custom-container mt-16">
          <h2 className="mb-2 text-center text-3xl font-bold">Popular Categories</h2>
          <p className="mb-8 text-center text-muted-foreground">Browse tours by category</p>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {categories.map((cat: Record<string, string>) => (
              <button
                key={cat._id}
                onClick={() => {
                  setCategory(cat._id);
                  setPage(1);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={`group relative overflow-hidden rounded-xl border p-6 text-center transition-all hover:-translate-y-1 hover:shadow-lg ${
                  category === cat._id ? "border-primary bg-primary/5" : "bg-card"
                }`}
              >
                {cat.image && (
                  <div className="absolute inset-0 opacity-10 transition-opacity group-hover:opacity-20">
                    <img src={cat.image} alt="" className="h-full w-full object-cover" />
                  </div>
                )}
                <div className="relative z-10">
                  <h3 className="text-lg font-semibold text-foreground">{cat.name}</h3>
                  {cat.description && (
                    <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{cat.description}</p>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Why Book With Us Section */}
      <div className="custom-container mt-16">
        <h2 className="mb-2 text-center text-3xl font-bold">Why Book With Us</h2>
        <p className="mb-8 text-center text-muted-foreground">We make your travel experience seamless</p>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: ShieldCheck, title: "Verified Guides", desc: "All guides are thoroughly vetted and certified professionals" },
            { icon: CreditCard, title: "Best Price Guarantee", desc: "We match any comparable offer you find elsewhere" },
            { icon: HeadphonesIcon, title: "24/7 Support", desc: "Round-the-clock assistance for any questions or issues" },
            { icon: Award, title: "Easy Cancellation", desc: "Free cancellation up to 48 hours before your tour" },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center rounded-xl border bg-card p-6 text-center transition-all hover:-translate-y-1 hover:shadow-lg">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <item.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Subscribe Section */}
      <div className="custom-container mt-8">
        <Subscribe />
      </div>
    </div>
  );
}
