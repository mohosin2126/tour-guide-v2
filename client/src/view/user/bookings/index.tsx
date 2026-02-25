import { Link } from "react-router-dom";
import { Calendar, DollarSign, X } from "lucide-react";
import { useBookings, useCancelBooking } from "@/hooks/api/use-bookings";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageLoader } from "@/components/ui/loading";

interface BookingRecord {
  _id: string;
  status: string;
  date?: string;
  totalPrice?: number;
  guests?: number;
  package?: { title?: string; images?: string[] };
}

const statusStyles: Record<string, string> = {
  pending: "warning",
  confirmed: "success",
  cancelled: "destructive",
  completed: "default",
};

export default function UserBookings() {
  const { data: bookings, isLoading } = useBookings() as { data: BookingRecord[] | undefined; isLoading: boolean };
  const cancelMutation = useCancelBooking();

  if (isLoading) return <PageLoader />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">My Bookings</h1>
        <p className="text-muted-foreground">View and manage your tour bookings</p>
      </div>
      {!bookings?.length ? (
        <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
          <Calendar className="mb-4 h-16 w-16 text-muted-foreground/50" />
          <h3 className="text-lg font-semibold">No bookings yet</h3>
          <p className="text-muted-foreground">Browse our packages to book your first tour</p>
          <Button className="mt-4" asChild>
            <Link to="/packages">Browse Packages</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <Card key={booking._id}>
              <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  <div className="h-16 w-24 flex-shrink-0 overflow-hidden rounded-md bg-muted">
                    <img
                      src={booking.package?.images?.[0] || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=200"}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold">{booking.package?.title || "Tour Package"}</h3>
                    <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />{new Date(booking.date || "").toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign size={14} />{booking.totalPrice}
                      </span>
                      {booking.guests && <span>{booking.guests} guest(s)</span>}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={statusStyles[booking.status] as "default" | "destructive" | "outline" | "secondary" | undefined || "default"}>
                    {booking.status}
                  </Badge>
                  {booking.status === "pending" && (
                    <Button size="sm" variant="destructive" disabled={cancelMutation.isPending} onClick={() => cancelMutation.mutate(booking._id)}>
                      <X size={14} className="mr-1" />Cancel
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
