import { useState } from "react";
import { Calendar, Check, X } from "lucide-react";
import { useGuideBookings, useUpdateBookingStatus } from "@/hooks/api/use-bookings";
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
  totalPrice?: number;
  date?: string;
  guests?: number;
  user?: { name?: string };
  package?: { title?: string };
}

const statusVariant: Record<string, "success" | "warning" | "destructive" | "info" | "pending"> = {
  pending: "pending",
  confirmed: "success",
  cancelled: "destructive",
  completed: "info",
};

export default function GuideBookings() {
  const { data: bookings, isLoading } = useGuideBookings() as { data: BookingRecord[] | undefined; isLoading: boolean };
  const updateStatus = useUpdateBookingStatus();
  const [confirmAction, setConfirmAction] = useState<{ id: string; action: "confirmed" | "cancelled" } | null>(null);

  const columns: Column<BookingRecord>[] = [
    {
      key: "package",
      header: "Package",
      render: (row) => (
        <div>
          <p className="font-semibold">{row.package?.title || "Tour Package"}</p>
          <p className="text-xs text-muted-foreground">by {row.user?.name || "Traveler"}</p>
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
          <div className="flex items-center justify-end gap-1">
            <Button
              size="sm"
              variant="ghost"
              className="h-9 w-9 p-0 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 dark:hover:bg-emerald-900/30"
              onClick={(e) => { e.stopPropagation(); setConfirmAction({ id: row._id, action: "confirmed" }); }}
            >
              <Check size={18} />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="h-9 w-9 p-0 text-destructive hover:bg-destructive/10"
              onClick={(e) => { e.stopPropagation(); setConfirmAction({ id: row._id, action: "cancelled" }); }}
            >
              <X size={18} />
            </Button>
          </div>
        ) : null,
    },
  ];

  if (isLoading) return <PageLoader />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Bookings</h1>
        <p className="text-muted-foreground">
          Manage your {bookings?.length || 0} incoming tour bookings
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
            description="Bookings will appear here once travelers book your packages."
          />
        }
      />

      <ConfirmDialog
        open={!!confirmAction}
        onOpenChange={() => setConfirmAction(null)}
        title={confirmAction?.action === "confirmed" ? "Confirm Booking" : "Decline Booking"}
        description={
          confirmAction?.action === "confirmed"
            ? "Are you sure you want to confirm this booking? The traveler will be notified."
            : "Are you sure you want to decline this booking? This action cannot be undone."
        }
        confirmText={confirmAction?.action === "confirmed" ? "Confirm" : "Decline"}
        variant={confirmAction?.action === "cancelled" ? "destructive" : "default"}
        onConfirm={() => {
          if (confirmAction) {
            updateStatus.mutate(
              { id: confirmAction.id, status: confirmAction.action },
              {
                onSuccess: () => toast.success(`Booking ${confirmAction.action === "confirmed" ? "confirmed" : "declined"}`),
                onError: () => toast.error("Failed to update booking"),
              }
            );
          }
          setConfirmAction(null);
        }}
        loading={updateStatus.isPending}
      />
    </div>
  );
}
