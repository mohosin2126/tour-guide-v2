import { Link } from "react-router-dom";
import { Users, Globe, Award, Shield, Heart, MapPin, Star, Headphones } from "lucide-react";
import AnimatedButton from "@/components/ui/animated-button";
import { Card, CardContent } from "@/components/ui/card";

const stats = [
  { number: "10K+", label: "Happy Travelers", icon: Users },
  { number: "500+", label: "Tour Packages", icon: Globe },
  { number: "150+", label: "Expert Guides", icon: Award },
  { number: "50+", label: "Destinations", icon: MapPin },
];

const values = [
  {
    icon: Shield,
    title: "Safety First",
    desc: "Every tour is vetted for safety. We ensure all guides are certified and all routes are properly assessed for a worry-free experience.",
  },
  {
    icon: Heart,
    title: "Passion for Travel",
    desc: "Our team is made up of passionate travelers who understand what makes a trip truly unforgettable. We share that passion with you.",
  },
  {
    icon: Star,
    title: "Quality Experiences",
    desc: "We hand-pick every tour and guide to ensure premium quality. From hidden gems to iconic landmarks — only the best makes the cut.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    desc: "Our dedicated support team is available around the clock to assist you before, during, and after your travel experience.",
  },
];

const team = [
  { name: "Sarah Johnson", role: "Founder & CEO", photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300" },
  { name: "Michael Chen", role: "Head of Operations", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300" },
  { name: "Emily Davis", role: "Lead Guide Coordinator", photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300" },
  { name: "James Wilson", role: "Customer Experience", photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300" },
];

export default function AboutUsPage() {
  return (
    <div>
      {/* Hero */}
      <div className="relative flex h-[50vh] min-h-[400px] items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600')" }}
        >
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-4xl font-bold md:text-5xl">About Us</h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/80">
            Making travel experiences extraordinary since 2018
          </p>
        </div>
      </div>

      <div className="custom-container">
        {/* Mission */}
        <section className="py-16">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="mb-2 font-semibold uppercase tracking-wider text-primary">Our Mission</p>
              <h2 className="text-3xl font-bold">Connecting Travelers with Unforgettable Experiences</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                We believe that travel is more than just visiting new places — it&apos;s about creating lasting memories, 
                building connections, and discovering the world through the eyes of passionate local guides.
              </p>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                Our platform bridges the gap between adventurous travelers and experienced local guides, 
                ensuring every journey is authentic, safe, and truly remarkable. Whether you&apos;re seeking 
                a serene mountain escape, a bustling city tour, or an off-the-beaten-path adventure, 
                we have the perfect guide waiting for you.
              </p>
              <div className="mt-6">
                <Link to="/packages">
                  <AnimatedButton size="lg">Explore Our Tours</AnimatedButton>
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=700"
                alt="Travelers enjoying a tour"
                className="rounded-2xl shadow-lg"
              />
              <div className="absolute -bottom-6 -left-6 rounded-xl bg-primary p-4 text-white shadow-lg">
                <p className="text-3xl font-bold">6+</p>
                <p className="text-sm">Years of Excellence</p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12">
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border bg-card p-6 text-center transition-all hover:shadow-md">
                <stat.icon className="mx-auto mb-3 h-8 w-8 text-primary" />
                <p className="text-3xl font-bold">{stat.number}</p>
                <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Values */}
        <section className="py-16">
          <div className="mb-10 text-center">
            <p className="mb-2 font-semibold uppercase tracking-wider text-primary">Our Values</p>
            <h2 className="text-3xl font-bold">What We Stand For</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <Card key={v.title} className="border-none bg-muted/50 transition-all hover:shadow-md">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                    <v.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="mb-2 font-semibold">{v.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{v.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="py-16">
          <div className="mb-10 text-center">
            <p className="mb-2 font-semibold uppercase tracking-wider text-primary">Our Team</p>
            <h2 className="text-3xl font-bold">Meet the People Behind the Magic</h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <div key={member.name} className="group text-center">
                <div className="mx-auto mb-4 h-40 w-40 overflow-hidden rounded-full border-4 border-primary/20 transition-all group-hover:border-primary">
                  <img src={member.photo} alt={member.name} className="h-full w-full object-cover" />
                </div>
                <h3 className="font-semibold">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mb-16 rounded-2xl bg-primary/5 p-10 text-center">
          <h2 className="text-2xl font-bold">Ready to Start Your Adventure?</h2>
          <p className="mx-auto mt-3 max-w-md text-muted-foreground">
            Browse our curated tour packages or become a guide and share your expertise with travelers from around the world.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link to="/packages">
              <AnimatedButton size="lg">Browse Packages</AnimatedButton>
            </Link>
            <Link to="/guides">
              <AnimatedButton size="lg">Find a Guide</AnimatedButton>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
