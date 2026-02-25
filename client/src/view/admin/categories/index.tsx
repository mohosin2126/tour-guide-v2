import { useState } from "react";
import { Plus, Pencil, Trash2, Tag, ImageIcon } from "lucide-react";
import { useCategories } from "@/hooks/api/use-general";
import { api } from "@/hooks/auth/use-api";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { PageLoader } from "@/components/ui/loading";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import EmptyState from "@/components/shared/empty-state";
import ConfirmDialog from "@/components/shared/confirm-dialog";

interface CategoryRecord {
  _id: string;
  name: string;
  description?: string;
  image?: string;
}

export default function AdminCategories() {
  const { data: categories, isLoading } = useCategories() as { data: CategoryRecord[] | undefined; isLoading: boolean };
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<CategoryRecord | null>(null);

  const openNew = () => {
    setEditing(null);
    setName("");
    setDescription("");
    setImage("");
    setDialogOpen(true);
  };

  const openEdit = (cat: CategoryRecord) => {
    setEditing(cat._id);
    setName(cat.name);
    setDescription(cat.description || "");
    setImage(cat.image || "");
    setDialogOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = { name, description, image };
      if (editing) {
        await api.put(`/categories/${editing}`, payload);
      } else {
        await api.post("/categories", payload);
      }
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      setDialogOpen(false);
    } catch (err: unknown) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await api.delete(`/categories/${deleteTarget._id}`);
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    } catch (err: unknown) {
      console.error(err);
    } finally {
      setDeleteTarget(null);
    }
  };

  if (isLoading) return <PageLoader />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            Categories
            {categories?.length ? (
              <Badge variant="secondary" className="ml-3 align-middle text-xs font-normal">
                {categories.length}
              </Badge>
            ) : null}
          </h1>
          <p className="text-muted-foreground">Manage tour categories</p>
        </div>
        <Button onClick={openNew}>
          <Plus size={18} className="mr-2" />
          Add Category
        </Button>
      </div>

      {!categories?.length ? (
        <EmptyState
          icon={Tag}
          title="No categories yet"
          description="Create your first category to help organize tour packages."
          action={
            <Button onClick={openNew} size="sm">
              <Plus size={16} className="mr-2" />
              Add Category
            </Button>
          }
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <div
              key={cat._id}
              className="group relative overflow-hidden rounded-xl border bg-card transition-all hover:shadow-lg"
            >
              {/* Image or placeholder */}
              <div className="aspect-video overflow-hidden bg-muted">
                {cat.image ? (
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <ImageIcon size={40} className="text-muted-foreground/30" />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="text-lg font-semibold">{cat.name}</h3>
                {cat.description && (
                  <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                    {cat.description}
                  </p>
                )}

                {/* Actions */}
                <div className="mt-4 flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={() => openEdit(cat)}
                  >
                    <Pencil size={14} className="mr-1.5" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                    onClick={() => setDeleteTarget(cat)}
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create / Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Category" : "Add Category"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Adventure" />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} placeholder="A short description of this category…" />
            </div>
            <div className="space-y-2">
              <Label>Image URL</Label>
              <Input value={image} onChange={(e) => setImage(e.target.value)} placeholder="https://example.com/image.jpg" />
              {image && (
                <div className="mt-2 aspect-video w-full overflow-hidden rounded-md border">
                  <img src={image} alt="Preview" className="h-full w-full object-cover" />
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={!name.trim() || saving}>
              {saving ? "Saving..." : editing ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={() => setDeleteTarget(null)}
        title="Delete Category"
        description={`Are you sure you want to delete "${deleteTarget?.name}"? This may affect packages that use this category.`}
        confirmText="Delete"
        variant="destructive"
        onConfirm={handleDelete}
      />
    </div>
  );
}
