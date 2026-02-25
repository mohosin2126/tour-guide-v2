import { useState } from "react";
import { BookOpen, Search } from "lucide-react";
import { useAllBookings, useUpdateBookingStatus } from "@/hooks/api/use-bookings";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageLoader } from "@/components/ui/loading";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BookingRecord {
  _id: string;
  status: string;
  totalPrice?: number;
  date?: string;
  guests?: number;
  user?: { name?: string };
  package?: { title?: string };
  guide?: { name?: string };
}

const statusStyles: Record<string, string> = {
  pending: "warning",
  confirmed: "success",
  cancelled: "destructive",
  completed: "default",
};

export default function AdminBookings() {
  const { data: bookings, isLoading } = useAllBookings() as { data: BookingRecord[] | undefined; isLoading: boolean };
  const updateStatus = useUpdateBookingStatus();
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = (bookings || []).filter((b) => {
    const matchStatus = statusFilter === "all" || b.status === statusFilter;
    const matchSearch =
      b.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
      b.package?.title?.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  if (isLoading) return <PageLoader />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Bookings</h1>
        <p className="text-muted-foreground">All platform bookings</p>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by user or package..." className="pl-9" />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {!filtered.length ? (
        <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
          <BookOpen className="mb-4 h-16 w-16 text-muted-foreground/50" />
          <h3 className="text-lg font-semibold">No bookings found</h3>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((booking) => (
            <Card key={booking._id}>
              <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-semibold">{booking.package?.title || "Package"}</p>
                  <p className="text-sm text-muted-foreground">
                    Booked by {booking.user?.name || "User"} · Guide: {booking.guide?.name || "—"}
                  </p>
                  <div className="mt-1 flex flex-wrap gap-3 text-sm text-muted-foreground">
                    <span>{new Date(booking.date || "").toLocaleDateString()}</span>
                    <span>{booking.guests} guest(s)</span>
                    <span className="font-medium text-foreground">${booking.totalPrice}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={statusStyles[booking.status] as "default" | "destructive" | "outline" | "secondary" | undefined || "default"}>{booking.status}</Badge>
                  {booking.status === "pending" && (
                    <>
                      <Button size="sm" variant="outline" onClick={() => updateStatus.mutate({ id: booking._id, status: "confirmed" })} disabled={updateStatus.isPending}>
                        Confirm
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => updateStatus.mutate({ id: booking._id, status: "cancelled" })} disabled={updateStatus.isPending}>
                        Cancel
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
