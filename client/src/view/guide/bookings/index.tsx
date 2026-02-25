import { Calendar, CheckCircle, XCircle } from "lucide-react";
import { useGuideBookings, useUpdateBookingStatus } from "@/hooks/api/use-bookings";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageLoader } from "@/components/ui/loading";

interface BookingRecord {
  _id: string;
  status: string;
  totalPrice?: number;
  date?: string;
  guests?: number;
  user?: { name?: string };
  package?: { title?: string };
}

const statusStyles: Record<string, string> = {
  pending: "warning",
  confirmed: "success",
  cancelled: "destructive",
  completed: "default",
};

export default function GuideBookings() {
  const { data: bookings, isLoading } = useGuideBookings() as { data: BookingRecord[] | undefined; isLoading: boolean };
  const updateStatus = useUpdateBookingStatus();

  if (isLoading) return <PageLoader />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Bookings</h1>
        <p className="text-muted-foreground">Manage incoming tour bookings</p>
      </div>
      {!bookings?.length ? (
        <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
          <Calendar className="mb-4 h-16 w-16 text-muted-foreground/50" />
          <h3 className="text-lg font-semibold">No bookings yet</h3>
          <p className="text-muted-foreground">Bookings will appear here once travelers book your packages</p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <Card key={booking._id}>
              <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="font-semibold">{booking.package?.title || "Tour Package"}</h3>
                  <p className="text-sm text-muted-foreground">
                    Booked by <span className="font-medium text-foreground">{booking.user?.name}</span>
                  </p>
                  <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                    <span>{new Date(booking.date || "").toLocaleDateString()}</span>
                    <span>{booking.guests} guest(s)</span>
                    <span className="font-medium">${booking.totalPrice}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={statusStyles[booking.status] as "default" | "destructive" | "outline" | "secondary" | undefined || "default"}>{booking.status}</Badge>
                  {booking.status === "pending" && (
                    <>
                      <Button size="sm" variant="outline" className="text-emerald-600" disabled={updateStatus.isPending} onClick={() => updateStatus.mutate({ id: booking._id, status: "confirmed" })}>
                        <CheckCircle size={14} className="mr-1" />Confirm
                      </Button>
                      <Button size="sm" variant="destructive" disabled={updateStatus.isPending} onClick={() => updateStatus.mutate({ id: booking._id, status: "cancelled" })}>
                        <XCircle size={14} className="mr-1" />Decline
                      </Button>
                    </>
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
