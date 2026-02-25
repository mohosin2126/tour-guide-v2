import { useState, useEffect } from "react";
import { UserCheck, UserX, Shield, Clock, CheckCircle2 } from "lucide-react";
import { api } from "@/hooks/auth/use-api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PageLoader } from "@/components/ui/loading";
import DataTable, { type Column } from "@/components/shared/data-table";
import EmptyState from "@/components/shared/empty-state";
import ConfirmDialog from "@/components/shared/confirm-dialog";

interface GuideRecord {
  _id: string;
  name?: string;
  email?: string;
  photo?: string;
  bio?: string;
  approved?: boolean;
}

export default function AdminGuideApprovals() {
  const [guides, setGuides] = useState<GuideRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [confirmAction, setConfirmAction] = useState<{ guide: GuideRecord; action: "approve" | "reject" } | null>(null);

  const fetchGuides = async () => {
    try {
      const { data } = await api.get("/guides");
      setGuides(data);
    } catch (err: unknown) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGuides();
  }, []);

  const handleConfirm = async () => {
    if (!confirmAction) return;
    const { guide, action } = confirmAction;
    try {
      if (action === "approve") {
        await api.patch(`/guides/${guide._id}/approve`, {});
        setGuides((prev) => prev.map((g) => (g._id === guide._id ? { ...g, approved: true } : g)));
      } else {
        await api.patch(`/guides/${guide._id}/reject`, {});
        setGuides((prev) => prev.filter((g) => g._id !== guide._id));
      }
    } catch (err: unknown) {
      console.error(err);
    } finally {
      setConfirmAction(null);
    }
  };

  if (loading) return <PageLoader />;

  const pending = guides.filter((g) => !g.approved);
  const approved = guides.filter((g) => g.approved);

  const getInitials = (name?: string) =>
    name?.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) || "G";

  const pendingColumns: Column<GuideRecord>[] = [
    {
      key: "guide",
      header: "Guide",
      render: (row) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarImage src={row.photo} />
            <AvatarFallback className="bg-amber-100 text-amber-700 text-xs dark:bg-amber-900/40 dark:text-amber-400">
              {getInitials(row.name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{row.name}</p>
            <p className="text-xs text-muted-foreground">{row.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: "bio",
      header: "Bio",
      render: (row) => (
        <span className="line-clamp-1 max-w-xs text-sm text-muted-foreground">
          {row.bio || "No bio provided"}
        </span>
      ),
    },
    {
      key: "actions",
      header: "",
      className: "text-right",
      render: (row) => (
        <div className="flex items-center justify-end gap-2">
          <Button
            size="sm"
            className="h-8 bg-emerald-600 hover:bg-emerald-700"
            onClick={(e) => { e.stopPropagation(); setConfirmAction({ guide: row, action: "approve" }); }}
          >
            <UserCheck size={14} className="mr-1.5" />
            Approve
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="h-8 text-destructive hover:bg-destructive/10 hover:text-destructive"
            onClick={(e) => { e.stopPropagation(); setConfirmAction({ guide: row, action: "reject" }); }}
          >
            <UserX size={14} className="mr-1.5" />
            Reject
          </Button>
        </div>
      ),
    },
  ];

  const approvedColumns: Column<GuideRecord>[] = [
    {
      key: "guide",
      header: "Guide",
      render: (row) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarImage src={row.photo} />
            <AvatarFallback className="bg-emerald-100 text-emerald-700 text-xs dark:bg-emerald-900/40 dark:text-emerald-400">
              {getInitials(row.name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{row.name}</p>
            <p className="text-xs text-muted-foreground">{row.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: "bio",
      header: "Bio",
      render: (row) => (
        <span className="line-clamp-1 max-w-xs text-sm text-muted-foreground">
          {row.bio || "—"}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      className: "text-right",
      render: () => <Badge variant="success">Approved</Badge>,
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Guide Approvals</h1>
        <p className="text-muted-foreground">
          Review and approve tour guide applications
        </p>
      </div>

      {/* Pending Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Clock size={18} className="text-amber-500" />
          <h2 className="text-lg font-semibold">Pending Approval</h2>
          {pending.length > 0 && (
            <Badge variant="warning" size="sm">{pending.length}</Badge>
          )}
        </div>

        <DataTable
          columns={pendingColumns}
          data={pending}
          keyExtractor={(row) => row._id}
          emptyState={
            <EmptyState
              icon={CheckCircle2}
              title="All caught up!"
              description="There are no pending guide applications to review."
            />
          }
        />
      </div>

      {/* Approved Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Shield size={18} className="text-emerald-500" />
          <h2 className="text-lg font-semibold">Approved Guides</h2>
          {approved.length > 0 && (
            <Badge variant="success" size="sm">{approved.length}</Badge>
          )}
        </div>

        <DataTable
          columns={approvedColumns}
          data={approved}
          keyExtractor={(row) => row._id}
          emptyState={
            <EmptyState
              icon={Shield}
              title="No approved guides yet"
              description="Approved guides will appear here."
            />
          }
        />
      </div>

      {/* Confirm Dialog */}
      <ConfirmDialog
        open={!!confirmAction}
        onOpenChange={() => setConfirmAction(null)}
        title={confirmAction?.action === "approve" ? "Approve Guide" : "Reject Guide"}
        description={
          confirmAction?.action === "approve"
            ? `Are you sure you want to approve ${confirmAction.guide.name}? They will be able to create tour packages.`
            : `Are you sure you want to reject ${confirmAction?.guide.name}? This action cannot be undone.`
        }
        confirmText={confirmAction?.action === "approve" ? "Approve" : "Reject"}
        variant={confirmAction?.action === "reject" ? "destructive" : "default"}
        onConfirm={handleConfirm}
      />
    </div>
  );
}
