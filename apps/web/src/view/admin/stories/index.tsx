import { useState } from "react";
import { Trash2, FileText, Heart } from "lucide-react";
import { useStories, useDeleteStory } from "@/hooks/api/use-stories";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PageLoader } from "@/components/ui/loading";
import DataTable, { type Column } from "@/components/shared/data-table";
import EmptyState from "@/components/shared/empty-state";
import ConfirmDialog from "@/components/shared/confirm-dialog";

interface StoryRecord {
  _id: string;
  title?: string;
  content?: string;
  createdAt?: string;
  likes?: string[];
  author?: { name?: string; photo?: string };
}

export default function AdminStories() {
  const { data: stories, isLoading } = useStories() as { data: StoryRecord[] | undefined; isLoading: boolean };
  const deleteMutation = useDeleteStory();
  const [deleteTarget, setDeleteTarget] = useState<StoryRecord | null>(null);

  const columns: Column<StoryRecord>[] = [
    {
      key: "story",
      header: "Story",
      render: (row) => {
        const initials = row.author?.name?.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) || "U";
        return (
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9">
              <AvatarImage src={row.author?.photo} />
              <AvatarFallback className="text-xs">{initials}</AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="font-semibold truncate">{row.title || "Untitled"}</p>
              <p className="text-xs text-muted-foreground">by {row.author?.name || "Unknown"}</p>
            </div>
          </div>
        );
      },
    },
    {
      key: "preview",
      header: "Preview",
      render: (row) => (
        <span className="line-clamp-1 max-w-xs text-sm text-muted-foreground">
          {row.content || "No content"}
        </span>
      ),
    },
    {
      key: "likes",
      header: "Likes",
      render: (row) => (
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Heart size={14} className={row.likes?.length ? "fill-rose-500 text-rose-500" : ""} />
          <span className="text-sm">{row.likes?.length || 0}</span>
        </div>
      ),
    },
    {
      key: "date",
      header: "Published",
      render: (row) => (
        <span className="text-sm text-muted-foreground">
          {row.createdAt
            ? new Date(row.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
            : "—"}
        </span>
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
          className="h-9 w-9 p-0 text-destructive hover:bg-destructive/10 hover:text-destructive"
          onClick={(e) => { e.stopPropagation(); setDeleteTarget(row); }}
        >
          <Trash2 size={18} />
        </Button>
      ),
    },
  ];

  if (isLoading) return <PageLoader />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">
          Stories
          {stories?.length ? (
            <Badge variant="secondary" className="ml-3 align-middle text-xs font-normal">
              {stories.length}
            </Badge>
          ) : null}
        </h1>
        <p className="text-muted-foreground">Moderate community stories</p>
      </div>

      <DataTable
        columns={columns}
        data={stories || []}
        keyExtractor={(row) => row._id}
        emptyState={
          <EmptyState
            icon={FileText}
            title="No stories yet"
            description="Community stories will appear here once users start sharing."
          />
        }
      />

      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={() => setDeleteTarget(null)}
        title="Delete Story"
        description={`Are you sure you want to delete "${deleteTarget?.title}"? This action cannot be undone.`}
        confirmText="Delete"
        variant="destructive"
        onConfirm={() => {
          if (deleteTarget) {
            deleteMutation.mutate(deleteTarget._id, {
              onSuccess: () => toast.success("Story deleted"),
              onError: () => toast.error("Failed to delete story"),
            });
          }
          setDeleteTarget(null);
        }}
        loading={deleteMutation.isPending}
      />
    </div>
  );
}
