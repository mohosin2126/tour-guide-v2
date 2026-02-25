import { Users, Package, BookOpen, DollarSign, TrendingUp, FileText, ArrowRight, UserCheck, Map, ShieldCheck, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { useAllBookings } from "@/hooks/api/use-bookings";
import { usePackages } from "@/hooks/api/use-packages";
import { useGuides, useCategories } from "@/hooks/api/use-general";
import { useAuth } from "@/hooks/auth/use-auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import StatCard from "@/components/shared/stat-card";
import DataTable, { type Column } from "@/components/shared/data-table";

interface BookingRecord {
  _id: string;
  status: string;
  totalPrice?: number;
  user?: { name?: string };
  package?: { title?: string };
  date?: string;
  createdAt?: string;
}

const statusVariant: Record<string, "success" | "warning" | "destructive" | "pending" | "info"> = {
  confirmed: "success",
  completed: "info",
  pending: "pending",
  cancelled: "destructive",
};

const bookingColumns: Column<BookingRecord>[] = [
  {
    key: "user",
    header: "Customer",
    render: (row) => (
      <span className="font-medium">{row.user?.name || "Guest"}</span>
    ),
  },
  {
    key: "package",
    header: "Package",
    render: (row) => (
      <span className="max-w-[200px] truncate text-muted-foreground">{row.package?.title || "—"}</span>
    ),
  },
  {
    key: "price",
    header: "Amount",
    render: (row) => (
      <span className="font-semibold">${row.totalPrice?.toLocaleString() || 0}</span>
    ),
  },
  {
    key: "date",
    header: "Date",
    render: (row) => (
      <span className="text-muted-foreground">
        {row.createdAt
          ? new Date(row.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })
          : "—"}
      </span>
    ),
  },
  {
    key: "status",
    header: "Status",
    render: (row) => (
      <Badge variant={statusVariant[row.status] || "secondary"} className="capitalize">
        {row.status}
      </Badge>
    ),
  },
];

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

  const pendingCount = bookings?.filter((b) => b.status === "pending").length || 0;

  const quickActions = [
    { title: "Guide Approvals", href: "/admin/guide-approvals", icon: UserCheck, desc: "Review pending guide applications" },
    { title: "Manage Categories", href: "/admin/categories", icon: Map, desc: "Add or edit tour categories" },
    { title: "Manage Users", href: "/admin/users", icon: Users, desc: "View and manage all users" },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 p-6 text-white shadow-lg md:p-8">
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
        <div className="relative flex items-center gap-4">
          <div className="hidden rounded-2xl bg-white/20 p-3 backdrop-blur-sm sm:block">
            <ShieldCheck className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold md:text-3xl">
              Welcome back, {user?.name?.split(" ")[0]}!
            </h1>
            <p className="mt-1 text-violet-100">
              Here&apos;s what&apos;s happening on your platform today.
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard title="Total Packages" value={(packages as unknown[])?.length || 0} icon={Package} color="blue" />
        <StatCard title="Total Bookings" value={bookings?.length || 0} icon={BookOpen} color="emerald" />
        <StatCard title="Tour Guides" value={(guides as unknown[])?.length || 0} icon={Users} color="violet" />
        <StatCard title="Revenue" value={`$${totalRevenue.toLocaleString()}`} icon={DollarSign} color="amber" />
        <StatCard title="Categories" value={(categories as unknown[])?.length || 0} icon={FileText} color="pink" />
        <StatCard title="Pending Bookings" value={pendingCount} icon={TrendingUp} color="orange" />
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="mb-3 text-lg font-semibold">Quick Actions</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {quickActions.map((action) => (
            <Link key={action.title} to={action.href}>
              <Card className="group cursor-pointer border-transparent bg-card transition-all hover:border-primary/20 hover:shadow-md">
                <CardContent className="flex items-center gap-3 p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                    <action.icon size={20} className="text-primary" />
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className="truncate text-sm font-semibold group-hover:text-primary">{action.title}</p>
                    <p className="truncate text-xs text-muted-foreground">{action.desc}</p>
                  </div>
                  <ArrowRight size={16} className="shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Latest Bookings Table */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Latest Bookings</h2>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/admin/bookings">
              View All <ArrowRight size={14} className="ml-1" />
            </Link>
          </Button>
        </div>
        <DataTable
          columns={bookingColumns}
          data={(bookings || []).slice(0, 8)}
          keyExtractor={(row) => row._id}
          emptyState={
            <Card className="py-12 text-center">
              <CardContent>
                <Calendar className="mx-auto mb-3 h-10 w-10 text-muted-foreground/40" />
                <p className="font-medium">No bookings yet</p>
                <p className="mt-1 text-sm text-muted-foreground">Bookings will appear here once customers start booking.</p>
              </CardContent>
            </Card>
          }
        />
      </div>
    </div>
  );
}
