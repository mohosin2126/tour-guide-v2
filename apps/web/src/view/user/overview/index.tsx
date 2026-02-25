import { BookOpen, Heart, Package, Star, ArrowRight, Map, PenSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { useBookings } from "@/hooks/api/use-bookings";
import { useWishlist } from "@/hooks/api/use-wishlist";
import { useAuth } from "@/hooks/auth/use-auth";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import StatCard from "@/components/shared/stat-card";
import DataTable, { type Column } from "@/components/shared/data-table";
import EmptyState from "@/components/shared/empty-state";

interface BookingRecord {
  _id: string;
  status: string;
  date?: string;
  package?: { title?: string };
}

const statusVariant: Record<string, "success" | "pending" | "destructive" | "info"> = {
  confirmed: "success",
  pending: "pending",
  cancelled: "destructive",
  completed: "info",
};

export default function UserOverview() {
  const { user } = useAuth();
  const { data: bookings } = useBookings() as { data: BookingRecord[] | undefined };
  const { data: wishlist } = useWishlist();

  const quickActions = [
    { title: "Browse Packages", href: "/packages", icon: Map, desc: "Explore new adventures" },
    { title: "My Wishlist", href: "/user/wishlist", icon: Heart, desc: "View saved tours" },
    { title: "Share a Story", href: "/community", icon: PenSquare, desc: "Tell your experience" },
  ];

  const recentColumns: Column<BookingRecord>[] = [
    {
      key: "package",
      header: "Package",
      render: (row) => <span className="font-medium">{row.package?.title || "Tour Package"}</span>,
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
      <div className="rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 p-6 text-white">
        <div className="flex items-center gap-4">
          <Avatar className="h-14 w-14 border-2 border-white/30">
            <AvatarImage src={user?.photo} />
            <AvatarFallback className="bg-white/20 text-lg text-white">{user?.name?.[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">Welcome back, {user?.name?.split(" ")[0]}!</h1>
            <p className="text-blue-100">Your bookings, wishlist, and travel stories — all in one place.</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="My Bookings" value={bookings?.length || 0} icon={BookOpen} color="blue" />
        <StatCard title="Wishlist" value={(wishlist as unknown[])?.length || 0} icon={Heart} color="pink" />
        <StatCard title="Active" value={bookings?.filter((b) => b.status === "confirmed").length || 0} icon={Package} color="emerald" />
        <StatCard title="Pending" value={bookings?.filter((b) => b.status === "pending").length || 0} icon={Star} color="amber" />
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
              <Link to="/user/bookings">
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
              description="Start exploring and book your first adventure!"
              action={
                <Button asChild size="sm">
                  <Link to="/packages">Browse Packages</Link>
                </Button>
              }
            />
          }
        />
      </div>
    </div>
  );
}
