import { Users, Package, BookOpen, DollarSign, TrendingUp, FileText, ArrowRight, UserCheck, Map, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { useAllBookings } from "@/hooks/api/use-bookings";
import { usePackages } from "@/hooks/api/use-packages";
import { useGuides, useCategories } from "@/hooks/api/use-general";
import { useAuth } from "@/hooks/auth/use-auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface BookingRecord {
  _id: string;
  status: string;
  totalPrice?: number;
  user?: { name?: string };
  package?: { title?: string };
}

export default function AdminOverview() {
  const { user } = useAuth();
  const { data: bookings } = useAllBookings() as { data: BookingRecord[] | undefined };
  const { data: packagesData } = usePackages({});
  const { data: guides } = useGuides();
  const { data: categories } = useCategories();

  const packages = (packagesData as Record<string, unknown>)?.packages || packagesData || [];

  const totalRevenue =
    bookings
      ?.filter((b) => b.status === "confirmed" || b.status === "completed")
      .reduce((sum, b) => sum + (b.totalPrice || 0), 0) || 0;

  const stats = [
    { title: "Total Packages", value: (packages as unknown[])?.length || 0, icon: Package, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-950" },
    { title: "Total Bookings", value: bookings?.length || 0, icon: BookOpen, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-950" },
    { title: "Tour Guides", value: (guides as unknown[])?.length || 0, icon: Users, color: "text-violet-500", bg: "bg-violet-50 dark:bg-violet-950" },
    { title: "Revenue", value: `$${totalRevenue.toLocaleString()}`, icon: DollarSign, color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-950" },
    { title: "Categories", value: (categories as unknown[])?.length || 0, icon: FileText, color: "text-pink-500", bg: "bg-pink-50 dark:bg-pink-950" },
    { title: "Pending", value: bookings?.filter((b) => b.status === "pending").length || 0, icon: TrendingUp, color: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-950" },
  ];

  const quickActions = [
    { title: "Guide Approvals", href: "/admin/guide-approvals", icon: UserCheck, desc: "Review pending guides" },
    { title: "Manage Categories", href: "/admin/categories", icon: Map, desc: "Add or edit categories" },
    { title: "Manage Users", href: "/admin/users", icon: Users, desc: "View all users" },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <Card className="border-none bg-gradient-to-r from-violet-500/10 via-violet-500/5 to-transparent">
        <CardContent className="flex items-center gap-4 p-6">
          <div className="rounded-full bg-violet-100 p-3 dark:bg-violet-900/50">
            <ShieldCheck className="h-8 w-8 text-violet-600 dark:text-violet-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {user?.name?.split(" ")[0]}! Here&apos;s your platform overview.</p>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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

      {/* Latest Bookings */}
      {bookings && bookings.length > 0 && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Latest Bookings</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/admin/bookings">View All <ArrowRight size={14} className="ml-1" /></Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {bookings.slice(0, 8).map((booking) => (
                <div key={booking._id} className="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <p className="font-medium">{booking.user?.name || "User"}</p>
                    <p className="text-sm text-muted-foreground">
                      {booking.package?.title} · ${booking.totalPrice}
                    </p>
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
      )}
    </div>
  );
}
