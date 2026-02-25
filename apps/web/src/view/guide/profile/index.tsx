import { useState, FormEvent, ChangeEvent } from "react";
import { Camera, Save, MapPin, Tag } from "lucide-react";
import { useAuth } from "@/hooks/auth/use-auth";
import { api } from "@/hooks/auth/use-api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function GuideProfile() {
  const { user, updateUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: (user as Record<string, unknown>)?.phone as string || "",
    photo: user?.photo || "",
    bio: (user as Record<string, unknown>)?.bio as string || "",
    location: (user as Record<string, unknown>)?.location as string || "",
    specialties: ((user as Record<string, unknown>)?.specialties as string[] || []).join(", "),
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    try {
      const payload = {
        ...formData,
        specialties: formData.specialties ? formData.specialties.split(",").map((s) => s.trim()).filter(Boolean) : [],
      };
      const { data } = await api.put(`/users/${user?._id}`, payload);
      updateUser(data);
      setSuccess("Profile updated successfully");
      toast.success("Profile updated successfully");
    } catch (err: unknown) {
      console.error(err);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const initials = user?.name?.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) || "G";

  const specialtiesArr = formData.specialties.split(",").map((s) => s.trim()).filter(Boolean);

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Guide Profile</h1>
        <p className="text-muted-foreground">Manage your guide profile and information</p>
      </div>

      <div className="rounded-xl border bg-card">
        {/* Profile Header */}
        <div className="flex items-center gap-5 border-b p-6">
          <div className="group relative">
            <Avatar className="h-20 w-20 ring-2 ring-primary/20 ring-offset-2 ring-offset-background">
              <AvatarImage src={user?.photo} />
              <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
            </Avatar>
            <div className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-full bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
              <Camera size={20} className="text-white" />
            </div>
          </div>
          <div>
            <p className="text-lg font-semibold">{user?.name}</p>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
            <div className="mt-1.5 flex flex-wrap items-center gap-2">
              <Badge variant="active" size="sm">Guide</Badge>
              {formData.location && (
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin size={12} /> {formData.location}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          {success && (
            <div className="mb-6 rounded-lg bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
              {success}
            </div>
          )}

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" value={user?.email} disabled className="bg-muted" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">
                <span className="flex items-center gap-1"><MapPin size={13} /> Location</span>
              </Label>
              <Input id="location" name="location" value={formData.location} onChange={handleChange} placeholder="e.g., Kathmandu, Nepal" />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="photo">Photo URL</Label>
              <Input id="photo" name="photo" value={formData.photo} onChange={handleChange} />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea id="bio" name="bio" value={formData.bio} onChange={handleChange} rows={4} placeholder="Tell travelers about yourself..." />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="specialties">
                <span className="flex items-center gap-1"><Tag size={13} /> Specialties (comma-separated)</span>
              </Label>
              <Input
                id="specialties"
                name="specialties"
                value={formData.specialties}
                onChange={handleChange}
                placeholder="Hiking, Cultural Tours, Beach"
              />
              {specialtiesArr.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {specialtiesArr.map((s) => (
                    <Badge key={s} variant="secondary" size="sm">{s}</Badge>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <Button type="submit" disabled={loading} className="gap-2">
              <Save size={16} />
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
