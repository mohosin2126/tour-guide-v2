import { useState } from "react";
import { PenSquare, Trash2, FileText, Heart } from "lucide-react";
import { useUserStories, useCreateStory, useDeleteStory } from "@/hooks/api/use-stories";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PageLoader } from "@/components/ui/loading";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import DataTable, { type Column } from "@/components/shared/data-table";
import EmptyState from "@/components/shared/empty-state";
import ConfirmDialog from "@/components/shared/confirm-dialog";

interface StoryRecord {
  _id: string;
  title?: string;
  content?: string;
  createdAt?: string;
  likes?: string[];
}

export default function UserStories() {
  const { data: stories, isLoading } = useUserStories() as { data: StoryRecord[] | undefined; isLoading: boolean };
  const createMutation = useCreateStory();
  const deleteMutation = useDeleteStory();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<StoryRecord | null>(null);

  const handleCreate = () => {
    createMutation.mutate(
      { title, content, images: images ? images.split(",").map((s) => s.trim()) : [] },
      {
        onSuccess: () => {
          setDialogOpen(false);
          setTitle("");
          setContent("");
          setImages("");
          toast.success("Story published");
        },
        onError: () => toast.error("Failed to publish story"),
      }
    );
  };

  const columns: Column<StoryRecord>[] = [
    {
      key: "title",
      header: "Story",
      render: (row) => (
        <div className="min-w-0">
          <p className="font-semibold truncate">{row.title || "Untitled"}</p>
          <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{row.content}</p>
        </div>
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            My Stories
            {stories?.length ? (
              <Badge variant="secondary" className="ml-3 align-middle text-xs font-normal">
                {stories.length}
              </Badge>
            ) : null}
          </h1>
          <p className="text-muted-foreground">Share your travel experiences</p>
        </div>
        <Button onClick={() => setDialogOpen(true)}>
          <PenSquare size={18} className="mr-2" />
          New Story
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={stories || []}
        keyExtractor={(row) => row._id}
        emptyState={
          <EmptyState
            icon={FileText}
            title="No stories yet"
            description="Write about your travel experiences and share with the community."
            action={
              <Button size="sm" onClick={() => setDialogOpen(true)}>
                <PenSquare size={16} className="mr-2" />
                Write Your First Story
              </Button>
            }
          />
        }
      />

      {/* Create Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Share Your Story</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="My Amazing Trip to..." />
            </div>
            <div className="space-y-2">
              <Label>Story</Label>
              <Textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Tell us about your experience..." rows={6} />
            </div>
            <div className="space-y-2">
              <Label>Image URLs (comma-separated)</Label>
              <Input value={images} onChange={(e) => setImages(e.target.value)} placeholder="https://example.com/img1.jpg, https://example.com/img2.jpg" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreate} disabled={!title.trim() || !content.trim() || createMutation.isPending}>
              {createMutation.isPending ? "Publishing..." : "Publish"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
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
