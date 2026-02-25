import { useState } from "react";
import { Plus, Pencil, Trash2, Tag } from "lucide-react";
import { useCategories } from "@/hooks/api/use-general";
import { api } from "@/hooks/auth/use-api";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { PageLoader } from "@/components/ui/loading";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

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

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/categories/${id}`);
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    } catch (err: unknown) {
      console.error(err);
    }
  };

  if (isLoading) return <PageLoader />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Categories</h1>
          <p className="text-muted-foreground">Manage tour categories</p>
        </div>
        <Button onClick={openNew}>
          <Plus size={18} className="mr-2" />Add Category
        </Button>
      </div>
      {!categories?.length ? (
        <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
          <Tag className="mb-4 h-16 w-16 text-muted-foreground/50" />
          <h3 className="text-lg font-semibold">No categories yet</h3>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <Card key={cat._id}>
              <CardContent className="p-4">
                {cat.image && (
                  <div className="mb-3 aspect-video overflow-hidden rounded-md">
                    <img src={cat.image} alt={cat.name} className="h-full w-full object-cover" />
                  </div>
                )}
                <h3 className="font-semibold">{cat.name}</h3>
                {cat.description && (
                  <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{cat.description}</p>
                )}
                <div className="mt-3 flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => openEdit(cat)}>
                    <Pencil size={14} className="mr-1" />Edit
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(cat._id)}>
                    <Trash2 size={14} className="mr-1" />Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Category" : "Add Category"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} />
            </div>
            <div className="space-y-2">
              <Label>Image URL</Label>
              <Input value={image} onChange={(e) => setImage(e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} disabled={!name.trim() || saving}>
              {saving ? "Saving..." : editing ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
