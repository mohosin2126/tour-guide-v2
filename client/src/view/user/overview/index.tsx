import { Package, BookOpen, Heart, Star, ArrowRight, Map, PenSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { useBookings } from "@/hooks/api/use-bookings";
import { useWishlist } from "@/hooks/api/use-wishlist";
import { useAuth } from "@/hooks/auth/use-auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface BookingRecord {
  _id: string;
  status: string;
  date?: string;
  package?: { title?: string };
}

export default function UserOverview() {
  const { user } = useAuth();
  const { data: bookings } = useBookings() as { data: BookingRecord[] | undefined };
  const { data: wishlist } = useWishlist();

  const stats = [
    { title: "My Bookings", value: bookings?.length || 0, icon: BookOpen, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-950" },
    { title: "Wishlist", value: (wishlist as unknown[])?.length || 0, icon: Heart, color: "text-pink-500", bg: "bg-pink-50 dark:bg-pink-950" },
    { title: "Active Bookings", value: bookings?.filter((b) => b.status === "confirmed").length || 0, icon: Package, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-950" },
    { title: "Pending", value: bookings?.filter((b) => b.status === "pending").length || 0, icon: Star, color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-950" },
  ];

  const quickActions = [
    { title: "Browse Packages", href: "/packages", icon: Map, desc: "Explore new adventures" },
    { title: "My Wishlist", href: "/user/wishlist", icon: Heart, desc: "View saved tours" },
    { title: "Share a Story", href: "/community", icon: PenSquare, desc: "Tell your experience" },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <Card className="border-none bg-gradient-to-r from-primary/10 via-primary/5 to-transparent">
        <CardContent className="flex items-center gap-4 p-6">
          <Avatar className="h-14 w-14">
            <AvatarImage src={user?.photo} />
            <AvatarFallback className="text-lg">{user?.name?.[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">Welcome back, {user?.name?.split(" ")[0]}!</h1>
            <p className="text-muted-foreground">Here&apos;s a summary of your activity</p>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="transition-all hover:shadow-md">
              <CardContent className="flex items-center gap-4 p-6">
                <div className={`rounded-lg p-3 ${stat.bg}`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="mb-3 text-lg font-semibold">Quick Actions</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {quickActions.map((action) => (
            <Link key={action.title} to={action.href}>
              <Card className="group cursor-pointer transition-all hover:border-primary/30 hover:shadow-md">
                <CardContent className="flex items-center gap-3 p-4">
                  <div className="rounded-lg bg-primary/10 p-2">
                    <action.icon size={20} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium group-hover:text-primary">{action.title}</p>
                    <p className="text-xs text-muted-foreground">{action.desc}</p>
                  </div>
                  <ArrowRight size={16} className="text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Bookings */}
      {bookings && bookings.length > 0 ? (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Bookings</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/user/bookings">View All <ArrowRight size={14} className="ml-1" /></Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {bookings.slice(0, 5).map((booking) => (
                <div key={booking._id} className="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <p className="font-medium">{booking.package?.title || "Tour Package"}</p>
                    <p className="text-sm text-muted-foreground">{new Date(booking.date || "").toLocaleDateString()}</p>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      booking.status === "confirmed"
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300"
                        : booking.status === "cancelled"
                          ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                          : "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300"
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <BookOpen className="mb-4 h-12 w-12 text-muted-foreground/40" />
            <h3 className="font-semibold">No bookings yet</h3>
            <p className="mt-1 text-sm text-muted-foreground">Start exploring and book your first adventure!</p>
            <Button className="mt-4" asChild>
              <Link to="/packages">Browse Packages</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
