import { Link } from "react-router-dom";
import { Star, MapPin, Search, UserPlus, Map, Smile, ArrowRight, Award, Users } from "lucide-react";
import { useGuides } from "@/hooks/api/use-general";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { PageLoader } from "@/components/ui/loading";
import { AnimatedButton } from "@/components/ui/animated-button";
import PageHero from "@/components/shared/page-hero";
import Title from "@/components/reuseable/title";

export default function GuidesPage() {
  const { data: guides, isLoading } = useGuides();

  if (isLoading) return <PageLoader />;

  return (
      <div className="min-h-screen pb-16">
        {/* Hero Section */}
        <PageHero
            title="Meet Our Expert Guides"
            gradientText="Expert"
            subtitle="Passionate locals with deep knowledge and years of experience. They don't just show you places — they bring destinations to life with stories, culture, and hidden gems."
            backgroundImage="https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=1200"
            height="full"

            badge={{ icon: Star, text: "Top-rated local experts" }}
            ctaButtons={[
              { label: "Explore Packages", href: "/packages", icon: ArrowRight },
              { label: "Join as Guide", href: "/auth/signup", variant: "outline" },
            ]}
            stats={[
              { icon: Users, value: "150+", label: "Guides" },
              { icon: Star, value: "4.9", label: "Avg Rating" },
              { icon: Award, value: "10K+", label: "Tours Led" },
            ]}
        />

        <div className="custom-container pt-12">
          {!guides?.length ? (
              <div className="flex min-h-[300px] items-center justify-center">
                <p className="text-muted-foreground">No guides available yet</p>
              </div>
          ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {guides.map((guide: Record<string, unknown>) => (
                    <Link key={guide._id as string} to={`/guides/${guide._id}`}>
                      <Card className="group overflow-hidden transition-all hover:shadow-lg">
                        <CardContent className="p-6 text-center">
                          <Avatar className="mx-auto h-24 w-24 transition-transform group-hover:scale-105">
                            <AvatarImage src={guide.photo as string} />
                            <AvatarFallback className="text-2xl">
                              {(guide.name as string)?.split(" ").map((n) => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <h3 className="mt-4 text-lg font-semibold group-hover:text-primary">
                            {String(guide.name)}
                          </h3>
                          {!!guide.bio && (
                              <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                                {String(guide.bio)}
                              </p>
                          )}
                          <div className="mt-3 flex items-center justify-center gap-3">
                            {!!guide.rating && (
                                <div className="flex items-center gap-1 text-sm">
                                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                  <span className="font-medium">{String(guide.rating)}</span>
                                </div>
                            )}
                            {!!guide.location && (
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                  <MapPin size={14} />
                                  {String(guide.location)}
                                </div>
                            )}
                          </div>
                          {(guide.specialties as string[])?.length > 0 && (
                              <div className="mt-3 flex flex-wrap justify-center gap-1">
                                {(guide.specialties as string[]).slice(0, 3).map((spec, i) => (
                                    <Badge key={i} variant="secondary" className="text-xs">
                                      {spec}
                                    </Badge>
                                ))}
                              </div>
                          )}
                        </CardContent>
                      </Card>
                    </Link>
                ))}
              </div>
          )}

          {/* How It Works Section */}
          <div className="mt-20">
            <Title
                title="Simple Process"
                subTitle="How It Works"
                className="mb-12 text-center"
            />
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {[
                { icon: Search, step: "01", title: "Browse Guides", desc: "Explore our verified guides, read reviews, and find the perfect match for your journey." },
                { icon: Map, step: "02", title: "Choose Your Tour", desc: "Select from a variety of tour packages offered by your chosen guide." },
                { icon: Smile, step: "03", title: "Enjoy the Experience", desc: "Sit back and enjoy a personalized, unforgettable travel experience." },
              ].map((item, i) => (
                  <div key={i} className="relative flex flex-col items-center rounded-2xl border bg-card p-8 text-center transition-all hover:-translate-y-1 hover:shadow-lg">
                    <div className="absolute -top-4 right-4 text-5xl font-black text-primary/10">{item.step}</div>
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                      <item.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="mb-2 text-xl font-semibold">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
              ))}
            </div>
          </div>

          {/* Become a Guide CTA */}
          <div className="relative -bottom-4 my-20 mx-auto w-10/12 overflow-hidden rounded-lg bg-amber-600 p-3 sm:p-10">
            <div className="flex flex-col items-center justify-between gap-10 lg:flex-row">
              <div className="z-10 flex-1 text-white">
                <div className="mb-3 flex items-center gap-2">
                  <UserPlus className="h-6 w-6" />
                  <span className="text-sm font-semibold uppercase tracking-wider">Join Our Team</span>
                </div>
                <h2 className="text-[2.5rem] font-bold">Become a Tour Guide</h2>
                <p className="mt-3 text-white/90">
                  Share your passion and local expertise with travelers from around the world. Join our community of professional guides and start earning today.
                </p>
              </div>
              <div className="absolute inset-0 z-0 flex items-center justify-center">
                <img src="/subscribe.png" className="h-52 w-52" alt="" />
              </div>
              <div className="z-10 w-full flex-1 text-right">
                <Link to="/auth/register">
                  <AnimatedButton className="border-white bg-white text-primary hover:text-primary">
                    Register as Guide
                  </AnimatedButton>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}