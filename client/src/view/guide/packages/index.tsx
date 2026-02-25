import { useState, ChangeEvent } from "react";
import { Plus, Pencil, Trash2, Package } from "lucide-react";
import { useAuth } from "@/hooks/auth/use-auth";
import { useGuidePackages, useCreatePackage, useUpdatePackage, useDeletePackage } from "@/hooks/api/use-packages";
import { useCategories } from "@/hooks/api/use-general";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PageLoader } from "@/components/ui/loading";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface PackageRecord {
  _id: string;
  title: string;
  description?: string;
  price: number;
  duration?: string;
  location?: string;
  maxGroupSize?: number;
  difficulty?: string;
  category?: { _id: string } | string;
  images?: string[];
  itinerary?: string[];
  includes?: string[];
}

interface CategoryRecord {
  _id: string;
  name: string;
}

const emptyForm = {
  title: "",
  description: "",
  price: "",
  duration: "",
  location: "",
  maxGroupSize: "",
  difficulty: "easy",
  category: "",
  images: "",
  itinerary: "",
  includes: "",
};

export default function GuidePackages() {
  const { user } = useAuth();
  const { data: packages, isLoading } = useGuidePackages(user?._id) as { data: PackageRecord[] | undefined; isLoading: boolean };
  const { data: categories } = useCategories() as { data: CategoryRecord[] | undefined };
  const createMutation = useCreatePackage();
  const updateMutation = useUpdatePackage();
  const deleteMutation = useDeletePackage();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  const openNew = () => {
    setEditing(null);
    setForm(emptyForm);
    setDialogOpen(true);
  };

  const openEdit = (pkg: PackageRecord) => {
    setEditing(pkg._id);
    setForm({
      title: pkg.title,
      description: pkg.description || "",
      price: String(pkg.price),
      duration: pkg.duration || "",
      location: pkg.location || "",
      maxGroupSize: String(pkg.maxGroupSize || ""),
      difficulty: pkg.difficulty || "easy",
      category: typeof pkg.category === "object" ? pkg.category?._id || "" : pkg.category || "",
      images: (pkg.images || []).join(", "),
      itinerary: (pkg.itinerary || []).join("\n"),
      includes: (pkg.includes || []).join(", "),
    });
    setDialogOpen(true);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    const payload = {
      ...form,
      price: Number(form.price),
      maxGroupSize: Number(form.maxGroupSize) || undefined,
      images: form.images ? form.images.split(",").map((s) => s.trim()) : [],
      itinerary: form.itinerary ? form.itinerary.split("\n").map((s) => s.trim()).filter(Boolean) : [],
      includes: form.includes ? form.includes.split(",").map((s) => s.trim()).filter(Boolean) : [],
    };

    if (editing) {
      updateMutation.mutate(
        { id: editing, data: payload } as never,
        { onSuccess: () => { setDialogOpen(false); setEditing(null); setForm(emptyForm); } }
      );
    } else {
      createMutation.mutate(payload as never, {
        onSuccess: () => { setDialogOpen(false); setForm(emptyForm); },
      });
    }
  };

  if (isLoading) return <PageLoader />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">My Packages</h1>
          <p className="text-muted-foreground">Create and manage your tour packages</p>
        </div>
        <Button onClick={openNew}>
          <Plus size={18} className="mr-2" />New Package
        </Button>
      </div>
      {!packages?.length ? (
        <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
          <Package className="mb-4 h-16 w-16 text-muted-foreground/50" />
          <h3 className="text-lg font-semibold">No packages yet</h3>
          <p className="text-muted-foreground">Create your first tour package to get started</p>
        </div>
      ) : (
        <div className="space-y-4">
          {packages.map((pkg) => (
            <Card key={pkg._id}>
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-start gap-4">
                  <div className="h-16 w-24 flex-shrink-0 overflow-hidden rounded-md bg-muted">
                    <img src={pkg.images?.[0] || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=200"} alt="" className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{pkg.title}</h3>
                    <div className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
                      <span>${pkg.price}</span>
                      <span>{pkg.duration}</span>
                      <Badge variant="outline" className="text-xs">{pkg.difficulty}</Badge>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" onClick={() => openEdit(pkg)}><Pencil size={14} /></Button>
                  <Button size="sm" variant="destructive" onClick={() => deleteMutation.mutate(pkg._id)} disabled={deleteMutation.isPending}><Trash2 size={14} /></Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Package" : "New Package"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input name="title" value={form.title} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea name="description" value={form.description} onChange={handleChange} rows={3} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Price ($)</Label>
                <Input name="price" type="number" value={form.price} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label>Duration</Label>
                <Input name="duration" value={form.duration} onChange={handleChange} placeholder="3 days" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Location</Label>
                <Input name="location" value={form.location} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label>Max Group Size</Label>
                <Input name="maxGroupSize" type="number" value={form.maxGroupSize} onChange={handleChange} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Difficulty</Label>
                <Select value={form.difficulty} onValueChange={(val) => setForm((p) => ({ ...p, difficulty: val }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="challenging">Challenging</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={form.category} onValueChange={(val) => setForm((p) => ({ ...p, category: val }))}>
                  <SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger>
                  <SelectContent>
                    {categories?.map((cat) => (
                      <SelectItem key={cat._id} value={cat._id}>{cat.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Image URLs (comma-separated)</Label>
              <Input name="images" value={form.images} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label>Itinerary (one step per line)</Label>
              <Textarea name="itinerary" value={form.itinerary} onChange={handleChange} rows={4} />
            </div>
            <div className="space-y-2">
              <Label>Includes (comma-separated)</Label>
              <Input name="includes" value={form.includes} onChange={handleChange} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSubmit} disabled={createMutation.isPending || updateMutation.isPending}>
              {editing ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
