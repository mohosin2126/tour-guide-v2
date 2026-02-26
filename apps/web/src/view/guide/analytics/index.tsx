import { BarChart3, DollarSign, CheckCircle, TrendingUp, Star, Trophy } from "lucide-react";
import { useAuth } from "@/hooks/auth/use-auth";
import { useGuideBookings } from "@/hooks/api/use-bookings";
import { useGuideReviews } from "@/hooks/api/use-reviews";
import { useGuidePackages } from "@/hooks/api/use-packages";
import { PageLoader } from "@/components/ui/loading";
import { Badge } from "@/components/ui/badge";
import StatCard from "@/components/shared/stat-card";

interface BookingRecord {
  _id: string;
  status: string;
  totalPrice?: number;
  date?: string;
}

interface ReviewRecord {
  _id: string;
  rating: number;
}

interface PackageRecord {
  _id: string;
  title?: string;
  price?: number;
  rating?: number;
}

export default function GuideAnalytics() {
  const { user } = useAuth();
  const { data: bookings, isLoading: bl } = useGuideBookings() as { data: BookingRecord[] | undefined; isLoading: boolean };
  const { data: reviewPayload, isLoading: rl } = useGuideReviews(user?._id) as {
    data: { reviews?: ReviewRecord[] } | ReviewRecord[] | undefined;
    isLoading: boolean;
  };
  const { data: packages, isLoading: pl } = useGuidePackages(user?._id) as { data: PackageRecord[] | undefined; isLoading: boolean };
  const reviews = Array.isArray(reviewPayload)
    ? reviewPayload
    : Array.isArray(reviewPayload?.reviews)
      ? reviewPayload.reviews
      : [];

  if (bl || rl || pl) return <PageLoader />;

  const confirmed = bookings?.filter((b) => b.status === "confirmed" || b.status === "completed") || [];
  const totalEarnings = confirmed.reduce((sum, b) => sum + (b.totalPrice || 0), 0);
  const avgBookingValue = confirmed.length > 0 ? Math.round(totalEarnings / confirmed.length) : 0;
  const avgRating = reviews?.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : "0";

  const monthly: Record<string, number> = {};
  confirmed.forEach((b) => {
    const month = new Date(b.date || "").toLocaleDateString("en-US", { month: "short", year: "2-digit" });
    monthly[month] = (monthly[month] || 0) + (b.totalPrice || 0);
  });

  const ratingDist = [0, 0, 0, 0, 0];
  reviews?.forEach((r) => {
    if (r.rating >= 1 && r.rating <= 5) ratingDist[r.rating - 1]++;
  });

  const topPackages = [...(packages || [])]
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 5);

  const maxRevenue = Math.max(...Object.values(monthly), 1);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">Performance insights for your tours</p>
      </div>

      {/* Stat Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Earnings" value={`$${totalEarnings.toLocaleString()}`} icon={DollarSign} color="emerald" />
        <StatCard title="Confirmed Bookings" value={confirmed.length} icon={CheckCircle} color="blue" />
        <StatCard title="Avg Booking Value" value={`$${avgBookingValue}`} icon={TrendingUp} color="violet" />
        <StatCard title="Avg Rating" value={`${avgRating} / 5`} icon={Star} color="amber" />
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Monthly Revenue */}
        <div className="rounded-xl border bg-card p-6">
          <div className="mb-5 flex items-center gap-2">
            <BarChart3 size={18} className="text-primary" />
            <h3 className="font-semibold">Monthly Revenue</h3>
          </div>
          {Object.keys(monthly).length > 0 ? (
            <div className="space-y-3">
              {Object.entries(monthly).map(([month, amount]) => (
                <div key={month} className="flex items-center gap-3">
                  <span className="w-20 text-sm font-medium">{month}</span>
                  <div className="relative flex-1">
                    <div className="h-8 rounded-lg bg-muted/50">
                      <div
                        className="flex h-full items-center rounded-lg bg-gradient-to-r from-emerald-500/20 to-emerald-500/40 px-3 transition-all duration-500"
                        style={{ width: `${Math.max(15, (amount / maxRevenue) * 100)}%` }}
                      >
                        <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">${amount.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="py-12 text-center text-muted-foreground">No revenue data yet</p>
          )}
        </div>

        {/* Rating Distribution */}
        <div className="rounded-xl border bg-card p-6">
          <div className="mb-5 flex items-center gap-2">
            <Star size={18} className="text-yellow-500" />
            <h3 className="font-semibold">Rating Distribution</h3>
            {reviews?.length ? (
              <Badge variant="secondary" size="sm" className="ml-auto">{reviews.length} reviews</Badge>
            ) : null}
          </div>
          <div className="space-y-3">
            {[5, 4, 3, 2, 1].map((star) => {
              const count = ratingDist[star - 1];
              const total = reviews?.length || 1;
              const pct = Math.round((count / total) * 100);
              return (
                <div key={star} className="flex items-center gap-3">
                  <span className="flex w-10 items-center justify-end gap-0.5 text-sm font-medium">
                    {star} <Star size={12} className="fill-yellow-400 text-yellow-400" />
                  </span>
                  <div className="flex-1 overflow-hidden rounded-full bg-muted/50" style={{ height: "10px" }}>
                    <div
                      className="h-full rounded-full bg-yellow-400 transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="w-12 text-right text-sm text-muted-foreground">{count} ({pct}%)</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Top Packages */}
      {topPackages.length > 0 && (
        <div className="rounded-xl border bg-card p-6">
          <div className="mb-5 flex items-center gap-2">
            <Trophy size={18} className="text-amber-500" />
            <h3 className="font-semibold">Top Packages</h3>
          </div>
          <div className="space-y-2">
            {topPackages.map((pkg, i) => (
              <div
                key={pkg._id}
                className="flex items-center justify-between rounded-lg border bg-background/50 p-3 transition-colors hover:bg-muted/50"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                      i === 0
                        ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                        : i === 1
                          ? "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300"
                          : i === 2
                            ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                            : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <span className="font-medium">{pkg.title}</span>
                </div>
                <div className="flex items-center gap-3">
                  {pkg.rating ? (
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Star size={12} className="fill-yellow-400 text-yellow-400" />
                      {pkg.rating}
                    </div>
                  ) : null}
                  <Badge variant="secondary">${pkg.price}</Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
