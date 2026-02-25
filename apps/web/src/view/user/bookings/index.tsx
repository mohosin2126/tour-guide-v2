import { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, X } from "lucide-react";
import { useBookings, useCancelBooking } from "@/hooks/api/use-bookings";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageLoader } from "@/components/ui/loading";
import DataTable, { type Column } from "@/components/shared/data-table";
import EmptyState from "@/components/shared/empty-state";
import ConfirmDialog from "@/components/shared/confirm-dialog";

interface BookingRecord {
  _id: string;
  status: string;
  date?: string;
  totalPrice?: number;
  guests?: number;
  package?: { title?: string; images?: string[] };
}

const statusVariant: Record<string, "success" | "warning" | "destructive" | "info" | "pending"> = {
  pending: "pending",
  confirmed: "success",
  cancelled: "destructive",
  completed: "info",
};

export default function UserBookings() {
  const { data: bookings, isLoading } = useBookings() as { data: BookingRecord[] | undefined; isLoading: boolean };
  const cancelMutation = useCancelBooking();
  const [cancelTarget, setCancelTarget] = useState<BookingRecord | null>(null);

  const columns: Column<BookingRecord>[] = [
    {
      key: "package",
      header: "Package",
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="h-10 w-14 flex-shrink-0 overflow-hidden rounded-md bg-muted">
            <img
              src={row.package?.images?.[0] || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=200"}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
          <span className="font-medium">{row.package?.title || "Tour Package"}</span>
        </div>
      ),
    },
    {
      key: "date",
      header: "Date",
      render: (row) => (
        <span className="text-muted-foreground">
          {row.date ? new Date(row.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—"}
        </span>
      ),
    },
    {
      key: "guests",
      header: "Guests",
      render: (row) => <span>{row.guests || 1}</span>,
    },
    {
      key: "price",
      header: "Amount",
      render: (row) => <span className="font-semibold">${row.totalPrice?.toLocaleString() || 0}</span>,
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
    {
      key: "actions",
      header: "",
      className: "text-right",
      render: (row) =>
        row.status === "pending" ? (
          <Button
            size="sm"
            variant="ghost"
            className="h-8 text-destructive hover:bg-destructive/10 hover:text-destructive"
            onClick={(e) => { e.stopPropagation(); setCancelTarget(row); }}
          >
            <X size={18} className="mr-1.5" />
            Cancel
          </Button>
        ) : null,
    },
  ];

  if (isLoading) return <PageLoader />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">My Bookings</h1>
        <p className="text-muted-foreground">
          View and manage your {bookings?.length || 0} tour bookings
        </p>
      </div>

      <DataTable
        columns={columns}
        data={bookings || []}
        keyExtractor={(row) => row._id}
        emptyState={
          <EmptyState
            icon={Calendar}
            title="No bookings yet"
            description="Browse our packages to book your first tour"
            action={
              <Button asChild size="sm">
                <Link to="/packages">Browse Packages</Link>
              </Button>
            }
          />
        }
      />

      <ConfirmDialog
        open={!!cancelTarget}
        onOpenChange={() => setCancelTarget(null)}
        title="Cancel Booking"
        description={`Are you sure you want to cancel your booking for "${cancelTarget?.package?.title}"? This action cannot be undone.`}
        confirmText="Cancel Booking"
        variant="destructive"
        onConfirm={() => {
          if (cancelTarget) {
            cancelMutation.mutate(cancelTarget._id, {
              onSuccess: () => toast.success("Booking cancelled"),
              onError: () => toast.error("Failed to cancel booking"),
            });
          }
          setCancelTarget(null);
        }}
        loading={cancelMutation.isPending}
      />
    </div>
  );
}
