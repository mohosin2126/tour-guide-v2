import { useState } from "react";
import { BookOpen, Search, Check, X } from "lucide-react";
import { useAllBookings, useUpdateBookingStatus } from "@/hooks/api/use-bookings";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { PageLoader } from "@/components/ui/loading";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DataTable, { type Column } from "@/components/shared/data-table";
import EmptyState from "@/components/shared/empty-state";
import ConfirmDialog from "@/components/shared/confirm-dialog";

interface BookingRecord {
  _id: string;
  status: string;
  totalPrice?: number;
  date?: string;
  guests?: number;
  groupSize?: number;
  user?: { name?: string };
  package?: { title?: string };
  guide?: { name?: string };
  createdAt?: string;
}

const statusVariant: Record<string, "success" | "warning" | "destructive" | "pending" | "info"> = {
  confirmed: "success",
  completed: "info",
  pending: "pending",
  cancelled: "destructive",
};

export default function AdminBookings() {
  const { data: bookings, isLoading } = useAllBookings() as { data: BookingRecord[] | undefined; isLoading: boolean };
  const updateStatus = useUpdateBookingStatus();
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [confirmAction, setConfirmAction] = useState<{ id: string; action: "confirmed" | "cancelled" } | null>(null);

  const filtered = (bookings || []).filter((b) => {
    const matchStatus = statusFilter === "all" || b.status === statusFilter;
    const matchSearch =
      b.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
      b.package?.title?.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const columns: Column<BookingRecord>[] = [
    {
      key: "package",
      header: "Package",
      render: (row) => (
        <div>
          <p className="font-semibold">{row.package?.title || "Package"}</p>
          <p className="text-xs text-muted-foreground">by {row.guide?.name || "—"}</p>
        </div>
      ),
    },
    {
      key: "customer",
      header: "Customer",
      render: (row) => <span className="font-medium">{row.user?.name || "Guest"}</span>,
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
      render: (row) => <span>{row.guests || row.groupSize || 1}</span>,
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
              className="h-8 w-8 p-0 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 dark:hover:bg-emerald-900/30"
              onClick={(e) => { e.stopPropagation(); setConfirmAction({ id: row._id, action: "confirmed" }); }}
            >
              <Check size={16} />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10"
              onClick={(e) => { e.stopPropagation(); setConfirmAction({ id: row._id, action: "cancelled" }); }}
            >
              <X size={16} />
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
          Manage all {bookings?.length || 0} platform bookings
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by user or package..." className="pl-9" />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <DataTable
        columns={columns}
        data={filtered}
        keyExtractor={(row) => row._id}
        emptyState={
          <EmptyState
            icon={BookOpen}
            title="No bookings found"
            description={search || statusFilter !== "all" ? "Try adjusting your search or filter" : "No bookings have been made yet."}
          />
        }
      />

      <ConfirmDialog
        open={!!confirmAction}
        onOpenChange={() => setConfirmAction(null)}
        title={confirmAction?.action === "confirmed" ? "Confirm Booking" : "Cancel Booking"}
        description={
          confirmAction?.action === "confirmed"
            ? "Are you sure you want to confirm this booking? The customer will be notified."
            : "Are you sure you want to cancel this booking? This action cannot be undone."
        }
        confirmText={confirmAction?.action === "confirmed" ? "Confirm" : "Cancel Booking"}
        variant={confirmAction?.action === "cancelled" ? "destructive" : "default"}
        onConfirm={() => {
          if (confirmAction) {
            updateStatus.mutate({ id: confirmAction.id, status: confirmAction.action });
          }
          setConfirmAction(null);
        }}
        loading={updateStatus.isPending}
      />
    </div>
  );
}
