import { useEffect, useState } from "react";
import { Search, Users as UsersIcon, UserCog } from "lucide-react";
import { toast } from "sonner";

import { api } from "@/hooks/auth/use-api";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PageLoader } from "@/components/ui/loading";
import DataTable, { type Column } from "@/components/shared/data-table";
import EmptyState from "@/components/shared/empty-state";
import ConfirmDialog from "@/components/shared/confirm-dialog";

interface UserRecord {
  _id: string;
  name?: string;
  email?: string;
  photo?: string;
  role: string;
  createdAt?: string;
}



export default function AdminUsers() {
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingChange, setPendingChange] = useState<{
    userId: string;
    newRole: string;
  } | null>(null);

  const fetchUsers = async () => {
    try {
      const { data } = await api.get("/users");
      setUsers(data);
    } catch (err: unknown) {
      console.error(err);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const initiateRoleChange = (userId: string, newRole: string) => {
    setPendingChange({ userId, newRole });
    setConfirmOpen(true);
  };

  const handleRoleChange = async () => {
    if (!pendingChange) return;

    try {
      await api.patch(`/users/${pendingChange.userId}/role`, {
        role: pendingChange.newRole,
      });

      setUsers((prev) =>
        prev.map((u) =>
          u._id === pendingChange.userId
            ? { ...u, role: pendingChange.newRole }
            : u
        )
      );

      toast.success(`Role updated to ${pendingChange.newRole}`);
    } catch (err: unknown) {
      console.error(err);
      toast.error("Failed to update role");
    } finally {
      setPendingChange(null);
    }
  };

  const filtered = users.filter((u) => {
    const matchSearch =
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase());

    const matchRole = roleFilter === "all" || u.role === roleFilter;

    return matchSearch && matchRole;
  });

  const columns: Column<UserRecord>[] = [
    {
      key: "user",
      header: "User",
      render: (row) => {
        const initials =
          row.name
            ?.split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2) || "U";

        return (
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9">
              <AvatarImage src={row.photo} />
              <AvatarFallback className="bg-primary/10 text-xs font-bold text-primary">
                {initials}
              </AvatarFallback>
            </Avatar>

            <div>
              <p className="font-medium">{row.name}</p>
              <p className="text-xs text-muted-foreground">{row.email}</p>
            </div>
          </div>
        );
      },
    },
  {
  key: "role",
  header: "Role",
  render: (row) => (
    <div className="w-28 capitalize">
      {row.role}
    </div>
  ),
},
    {
      key: "joined",
      header: "Joined",
      render: (row) => (
        <span className="text-muted-foreground">
          {row.createdAt
            ? new Date(row.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
            : "—"}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Change Role",
      render: (row) => (
        <div className="w-28">
          {row.role === "admin" ? (
            <Badge
              variant="destructive"
              className="h-8 w-full inline-flex items-center justify-center capitalize"
            >
              Admin
            </Badge>
          ) : (
            <Select
              value={row.role}
              onValueChange={(val) => initiateRoleChange(row._id, val)}
            >
              <SelectTrigger className="h-8 w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="guide">Guide</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>
      ),
    },
  ];

  if (loading) return <PageLoader />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Users</h1>
          <p className="text-muted-foreground">
            Manage all {users.length} registered users
          </p>
        </div>

        <Badge variant="outline" size="lg">
          <UsersIcon size={14} className="mr-1.5" />
          {users.length} total
        </Badge>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email..."
            className="pl-9"
          />
        </div>

        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="user">User</SelectItem>
            <SelectItem value="guide">Guide</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <DataTable
        columns={columns}
        data={filtered}
        keyExtractor={(row) => row._id}
        emptyState={
          <EmptyState
            icon={UsersIcon}
            title="No users found"
            description={
              search || roleFilter !== "all"
                ? "Try adjusting your search or filter"
                : "No users have registered yet."
            }
          />
        }
      />

      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Change User Role"
        description={`Are you sure you want to change this user's role to "${pendingChange?.newRole}"? This will affect their permissions immediately.`}
        confirmText="Change Role"
        onConfirm={handleRoleChange}
        icon={UserCog}
      />
    </div>
  );
}