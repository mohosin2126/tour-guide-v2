import { useState } from "react";
import { Package, Search, MapPin, Trash2 } from "lucide-react";
import { usePackages, useDeletePackage } from "@/hooks/api/use-packages";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { PageLoader } from "@/components/ui/loading";
import { Link } from "react-router-dom";
import DataTable, { type Column } from "@/components/shared/data-table";
import EmptyState from "@/components/shared/empty-state";
import ConfirmDialog from "@/components/shared/confirm-dialog";

interface PackageRecord {
  _id: string;
  title?: string;
  price?: number;
  location?: string;
  difficulty?: string;
  images?: string[];
  guide?: { name?: string };
}

const difficultyVariant: Record<string, "success" | "warning" | "destructive"> = {
  easy: "success",
  medium: "warning",
  hard: "destructive",
};

export default function AdminPackages() {
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { data: packagesData, isLoading } = usePackages({});
  const deleteMutation = useDeletePackage();

  const packages: PackageRecord[] =
    ((packagesData as Record<string, unknown>)?.packages as PackageRecord[]) ||
    (packagesData as PackageRecord[]) ||
    [];

  const filtered = packages.filter(
    (p) =>
      p.title?.toLowerCase().includes(search.toLowerCase()) ||
      p.location?.toLowerCase().includes(search.toLowerCase())
  );

  const columns: Column<PackageRecord>[] = [
    {
      key: "package",
      header: "Package",
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="h-10 w-14 shrink-0 overflow-hidden rounded-lg bg-muted">
            <img
              src={row.images?.[0] || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=200"}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <Link to={`/packages/${row._id}`} className="font-semibold hover:text-primary hover:underline">
              {row.title}
            </Link>
            {row.location && (
              <p className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin size={10} /> {row.location}
              </p>
            )}
          </div>
        </div>
      ),
    },
    {
      key: "price",
      header: "Price",
      render: (row) => <span className="font-semibold">${row.price}</span>,
    },
    {
      key: "difficulty",
      header: "Difficulty",
      render: (row) =>
        row.difficulty ? (
          <Badge variant={difficultyVariant[row.difficulty] || "secondary"} className="capitalize">
            {row.difficulty}
          </Badge>
        ) : (
          <span className="text-muted-foreground">—</span>
        ),
    },
    {
      key: "guide",
      header: "Guide",
      render: (row) => (
        <span className="text-muted-foreground">{row.guide?.name || "Unassigned"}</span>
      ),
    },
    {
      key: "actions",
      header: "",
      className: "text-right",
      render: (row) => (
        <Button
          size="sm"
          variant="ghost"
          className="text-destructive hover:bg-destructive/10 hover:text-destructive"
          onClick={(e) => {
            e.stopPropagation();
            setDeleteId(row._id);
          }}
        >
          <Trash2 size={14} />
        </Button>
      ),
    },
  ];

  if (isLoading) return <PageLoader />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Packages</h1>
          <p className="text-muted-foreground">All {packages.length} tour packages on the platform</p>
        </div>
      </div>

      <div className="relative max-w-md">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by title or location..." className="pl-9" />
      </div>

      <DataTable
        columns={columns}
        data={filtered}
        keyExtractor={(row) => row._id}
        emptyState={
          <EmptyState
            icon={Package}
            title="No packages found"
            description={search ? "Try adjusting your search terms" : "No packages available yet."}
          />
        }
      />

      <ConfirmDialog
        open={!!deleteId}
        onOpenChange={() => setDeleteId(null)}
        title="Delete Package"
        description="Are you sure you want to delete this package? This action cannot be undone and will remove all associated data."
        confirmText="Delete Package"
        variant="destructive"
        onConfirm={() => {
          if (deleteId) deleteMutation.mutate(deleteId);
          setDeleteId(null);
        }}
        loading={deleteMutation.isPending}
      />
    </div>
  );
}
