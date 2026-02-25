import { Package, BookOpen, Star, TrendingUp, ArrowRight, PlusCircle, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/auth/use-auth";
import { useGuidePackages } from "@/hooks/api/use-packages";
import { useGuideBookings } from "@/hooks/api/use-bookings";
import { useGuideReviews } from "@/hooks/api/use-reviews";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import StatCard from "@/components/shared/stat-card";
import DataTable, { type Column } from "@/components/shared/data-table";
import EmptyState from "@/components/shared/empty-state";

interface BookingRecord {
  _id: string;
  status: string;
  totalPrice?: number;
  date?: string;
  user?: { name?: string };
  package?: { title?: string };
}

interface ReviewRecord {
  _id: string;
  rating: number;
}

const statusVariant: Record<string, "success" | "pending" | "destructive" | "info"> = {
  confirmed: "success",
  pending: "pending",
  cancelled: "destructive",
  completed: "info",
};

export default function GuideOverview() {
  const { user } = useAuth();
  const { data: packages } = useGuidePackages(user?._id);
  const { data: bookings } = useGuideBookings() as { data: BookingRecord[] | undefined };
  const { data: reviews } = useGuideReviews(user?._id) as { data: ReviewRecord[] | undefined };

  const reviewsArr = (reviews as unknown as { reviews?: ReviewRecord[] })?.reviews || reviews || [];

  const avgRating =
    Array.isArray(reviewsArr) && reviewsArr.length > 0
      ? (reviewsArr.reduce((sum: number, r: ReviewRecord) => sum + r.rating, 0) / reviewsArr.length).toFixed(1)
      : "N/A";

  const totalEarnings =
    bookings
      ?.filter((b) => b.status === "confirmed" || b.status === "completed")
      .reduce((sum, b) => sum + (b.totalPrice || 0), 0) || 0;

  const quickActions = [
    { title: "Create Package", href: "/guide/packages", icon: PlusCircle, desc: "Add a new tour" },
    { title: "View Analytics", href: "/guide/analytics", icon: BarChart3, desc: "Track performance" },
    { title: "Manage Reviews", href: "/guide/reviews", icon: Star, desc: "See traveler feedback" },
  ];

  const recentColumns: Column<BookingRecord>[] = [
    {
      key: "traveler",
      header: "Traveler",
      render: (row) => <span className="font-medium">{row.user?.name || "Traveler"}</span>,
    },
    {
      key: "package",
      header: "Package",
      render: (row) => <span className="text-muted-foreground">{row.package?.title || "—"}</span>,
    },
    {
      key: "date",
      header: "Date",
      render: (row) => (
        <span className="text-muted-foreground">
          {row.date ? new Date(row.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "—"}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      className: "text-right",
      render: (row) => (
        <Badge variant={statusVariant[row.status] || "secondary"} size="sm" className="capitalize">
          {row.status}
        </Badge>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="rounded-xl bg-gradient-to-br from-emerald-600 to-teal-500 p-6 text-white">
        <div className="flex items-center gap-4">
          <Avatar className="h-14 w-14 border-2 border-white/30">
            <AvatarImage src={user?.photo} />
            <AvatarFallback className="bg-white/20 text-lg text-white">{user?.name?.[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">Welcome back, {user?.name?.split(" ")[0]}!</h1>
            <p className="text-emerald-100">Track your tours, bookings, and traveler feedback all in one place.</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="My Packages" value={(packages as unknown[])?.length || 0} icon={Package} color="blue" />
        <StatCard title="Bookings" value={bookings?.length || 0} icon={BookOpen} color="emerald" />
        <StatCard title="Avg Rating" value={avgRating} icon={Star} color="amber" />
        <StatCard title="Earnings" value={`$${totalEarnings.toLocaleString()}`} icon={TrendingUp} color="violet" />
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="mb-3 text-lg font-semibold">Quick Actions</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {quickActions.map((action) => (
            <Link key={action.title} to={action.href}>
              <div className="group flex items-center gap-3 rounded-xl border bg-card p-4 transition-all hover:border-primary/30 hover:shadow-md">
                <div className="rounded-lg bg-primary/10 p-2.5">
                  <action.icon size={20} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium group-hover:text-primary">{action.title}</p>
                  <p className="text-xs text-muted-foreground">{action.desc}</p>
                </div>
                <ArrowRight size={16} className="shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Recent Bookings</h2>
          {bookings && bookings.length > 0 && (
            <Button variant="ghost" size="sm" asChild>
              <Link to="/guide/bookings">
                View All <ArrowRight size={14} className="ml-1" />
              </Link>
            </Button>
          )}
        </div>
        <DataTable
          columns={recentColumns}
          data={(bookings || []).slice(0, 5)}
          keyExtractor={(row) => row._id}
          compact
          emptyState={
            <EmptyState
              icon={BookOpen}
              title="No bookings yet"
              description="Create your first tour package to start receiving bookings!"
              action={
                <Button asChild size="sm">
                  <Link to="/guide/packages">Create Package</Link>
                </Button>
              }
            />
          }
        />
      </div>
    </div>
  );
}
