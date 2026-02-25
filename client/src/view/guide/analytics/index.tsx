import { BarChart3 } from "lucide-react";
import { useAuth } from "@/hooks/auth/use-auth";
import { useGuideBookings } from "@/hooks/api/use-bookings";
import { useGuideReviews } from "@/hooks/api/use-reviews";
import { useGuidePackages } from "@/hooks/api/use-packages";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageLoader } from "@/components/ui/loading";

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
  const { data: reviews, isLoading: rl } = useGuideReviews(user?._id) as { data: ReviewRecord[] | undefined; isLoading: boolean };
  const { data: packages, isLoading: pl } = useGuidePackages(user?._id) as { data: PackageRecord[] | undefined; isLoading: boolean };

  if (bl || rl || pl) return <PageLoader />;

  const confirmed = bookings?.filter((b) => b.status === "confirmed" || b.status === "completed") || [];
  const totalEarnings = confirmed.reduce((sum, b) => sum + (b.totalPrice || 0), 0);
  const avgBookingValue = confirmed.length > 0 ? Math.round(totalEarnings / confirmed.length) : 0;

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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">Performance insights for your tours</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-sm text-muted-foreground">Total Earnings</p>
            <p className="text-3xl font-bold text-primary">${totalEarnings}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-sm text-muted-foreground">Confirmed Bookings</p>
            <p className="text-3xl font-bold">{confirmed.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-sm text-muted-foreground">Avg Booking Value</p>
            <p className="text-3xl font-bold">${avgBookingValue}</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 size={18} />Monthly Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            {Object.keys(monthly).length > 0 ? (
              <div className="space-y-3">
                {Object.entries(monthly).map(([month, amount]) => (
                  <div key={month} className="flex items-center gap-3">
                    <span className="w-20 text-sm font-medium">{month}</span>
                    <div className="flex-1">
                      <div
                        className="h-6 rounded bg-primary/20"
                        style={{ width: `${Math.max(10, (amount / Math.max(...Object.values(monthly))) * 100)}%` }}
                      >
                        <div className="flex h-full items-center px-2 text-xs font-medium">${amount}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="py-8 text-center text-muted-foreground">No revenue data yet</p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Rating Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((star) => {
                const count = ratingDist[star - 1];
                const total = reviews?.length || 1;
                return (
                  <div key={star} className="flex items-center gap-3">
                    <span className="w-8 text-right text-sm font-medium">{star}★</span>
                    <div className="flex-1 rounded-full bg-muted">
                      <div className="h-4 rounded-full bg-yellow-400" style={{ width: `${(count / total) * 100}%` }} />
                    </div>
                    <span className="w-8 text-sm text-muted-foreground">{count}</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
      {topPackages.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Top Packages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topPackages.map((pkg, i) => (
                <div key={pkg._id} className="flex items-center justify-between rounded-lg border p-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">{i + 1}</span>
                    <span className="font-medium">{pkg.title}</span>
                  </div>
                  <span className="text-sm font-medium">${pkg.price}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
