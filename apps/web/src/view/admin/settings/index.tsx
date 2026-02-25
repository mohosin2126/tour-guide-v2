import { useState, useContext, useCallback } from "react";
import { User, Shield, Bell, Save, Camera, Lock, Mail, Phone, FileText, Eye, EyeOff, CheckCircle } from "lucide-react";
import { AuthContext } from "@/context/auth-context";
import { api } from "@/hooks/auth/use-api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

type Tab = "profile" | "security" | "notifications";

export default function AdminSettings() {
  const auth = useContext(AuthContext);
  const user = auth?.user;
  const [activeTab, setActiveTab] = useState<Tab>("profile");

  const tabs: { id: Tab; label: string; description: string; icon: typeof User }[] = [
    { id: "profile", label: "Profile", description: "Personal info & avatar", icon: User },
    { id: "security", label: "Security", description: "Password & access", icon: Shield },
    { id: "notifications", label: "Notifications", description: "Email preferences", icon: Bell },
  ];

  const initials = user?.name
    ?.split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "U";

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Manage your account preferences and configuration</p>
        </div>
        <Badge variant="outline" className="w-fit gap-1.5 px-3 py-1.5">
          <div className="h-2 w-2 rounded-full bg-emerald-500" />
          Account Active
        </Badge>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Sidebar */}
        <div className="lg:w-72">
          {/* User card */}
          <Card className="mb-4 overflow-hidden">
            <div className="h-16 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent" />
            <CardContent className="-mt-8 pb-4 pt-0 px-4">
              <div className="flex items-end gap-3">
                <Avatar className="h-14 w-14 border-4 border-card shadow-md">
                  <AvatarImage src={user?.photo} />
                  <AvatarFallback className="bg-primary/10 text-lg font-bold text-primary">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="mb-1">
                  <p className="font-semibold leading-tight">{user?.name || "Admin"}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tab navigation */}
          <nav className="flex gap-1 lg:flex-col">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`group flex items-center gap-3 rounded-xl px-4 py-3 text-left transition-all duration-200 ${
                    active
                      ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <div className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${
                    active ? "bg-primary-foreground/20" : "bg-muted group-hover:bg-background"
                  }`}>
                    <Icon size={18} />
                  </div>
                  <div className="hidden lg:block">
                    <p className="text-sm font-medium">{tab.label}</p>
                    <p className={`text-xs ${active ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                      {tab.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content area */}
        <div className="flex-1 max-w-2xl">
          <Card>
            <CardContent className="p-6 sm:p-8">
              {activeTab === "profile" && <ProfileTab user={user} updateUser={auth?.updateUser} />}
              {activeTab === "security" && <SecurityTab />}
              {activeTab === "notifications" && <NotificationsTab user={user} />}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

/* ─── Profile Tab ─── */
function ProfileTab({ user, updateUser }: { user: { _id?: string; name?: string; email?: string; photo?: string; phone?: string; bio?: string } | null | undefined; updateUser?: (u: Record<string, unknown>) => void }) {
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [saving, setSaving] = useState(false);

  const initials = user?.name
    ?.split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "U";

  const handleSave = async () => {
    if (!user?._id) {
      toast.error("User not found");
      return;
    }
    setSaving(true);
    try {
      const { data } = await api.put(`/users/${user._id}`, { name, email, phone, bio });
      updateUser?.(data);
      toast.success("Profile updated successfully");
    } catch (err: unknown) {
      console.error(err);
      const e = err as Record<string, Record<string, Record<string, string>>>;
      toast.error(e?.response?.data?.error || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <User size={20} className="text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-semibold">Profile Information</h2>
          <p className="text-sm text-muted-foreground">Update your personal details and public profile.</p>
        </div>
      </div>

      <Separator />

      {/* Avatar section */}
      <div className="flex items-center gap-5">
        <div className="relative">
          <Avatar className="h-20 w-20 border-2 border-muted">
            <AvatarImage src={user?.photo} />
            <AvatarFallback className="bg-primary/10 text-xl font-bold text-primary">{initials}</AvatarFallback>
          </Avatar>
          <button className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-card bg-primary text-primary-foreground shadow-sm transition-transform hover:scale-110">
            <Camera size={14} />
          </button>
        </div>
        <div>
          <p className="font-medium">{user?.name || "Admin User"}</p>
          <p className="text-sm text-muted-foreground">JPG, PNG or GIF. Max 2MB.</p>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            <User size={12} /> Full Name
          </Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" className="h-11" />
        </div>
        <div className="space-y-2">
          <Label className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            <Mail size={12} /> Email Address
          </Label>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john@example.com" className="h-11" />
        </div>
        <div className="space-y-2">
          <Label className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            <Phone size={12} /> Phone Number
          </Label>
          <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1 234 567 890" className="h-11" />
        </div>
        <div className="space-y-2">
          <Label className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            <FileText size={12} /> Bio
          </Label>
          <Input value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Tell us about yourself..." className="h-11" />
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <Button onClick={handleSave} disabled={saving} size="lg" className="gap-2 px-8">
          <Save size={16} />
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
}

/* ─── Security Tab ─── */
function SecurityTab() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const passwordStrength = newPassword.length === 0 ? 0 : newPassword.length < 6 ? 1 : newPassword.length < 10 ? 2 : 3;
  const strengthLabels = ["", "Weak", "Good", "Strong"];
  const strengthColors = ["", "bg-destructive", "bg-yellow-500", "bg-emerald-500"];

  const handleSave = async () => {
    setError("");
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setSaving(true);
    try {
      await api.put("/users/change-password", { currentPassword, newPassword });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      toast.success("Password updated successfully");
    } catch (err: unknown) {
      console.error(err);
      const e = err as Record<string, Record<string, Record<string, string>>>;
      const msg = e?.response?.data?.error || "Failed to update password";
      setError(msg);
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <Lock size={20} className="text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-semibold">Password & Security</h2>
          <p className="text-sm text-muted-foreground">Keep your account secure with a strong password.</p>
        </div>
      </div>

      <Separator />

      <div className="space-y-5 max-w-md">
        <div className="space-y-2">
          <Label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Current Password</Label>
          <div className="relative">
            <Input
              type={showCurrent ? "text" : "password"}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="h-11 pr-10"
              placeholder="Enter current password"
            />
            <button
              type="button"
              onClick={() => setShowCurrent(!showCurrent)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">New Password</Label>
          <div className="relative">
            <Input
              type={showNew ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="h-11 pr-10"
              placeholder="Enter new password"
            />
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {newPassword.length > 0 && (
            <div className="flex items-center gap-2 pt-1">
              <div className="flex flex-1 gap-1">
                {[1, 2, 3].map((level) => (
                  <div
                    key={level}
                    className={`h-1.5 flex-1 rounded-full transition-colors ${
                      level <= passwordStrength ? strengthColors[passwordStrength] : "bg-muted"
                    }`}
                  />
                ))}
              </div>
              <span className={`text-xs font-medium ${
                passwordStrength === 1 ? "text-destructive" : passwordStrength === 2 ? "text-yellow-600" : "text-emerald-600"
              }`}>
                {strengthLabels[passwordStrength]}
              </span>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Confirm New Password</Label>
          <div className="relative">
            <Input
              type={showConfirm ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="h-11 pr-10"
              placeholder="Confirm new password"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {confirmPassword.length > 0 && newPassword === confirmPassword && (
            <p className="flex items-center gap-1 text-xs text-emerald-600">
              <CheckCircle size={12} /> Passwords match
            </p>
          )}
        </div>

        {error && (
          <div className="rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-3">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}
      </div>

      <div className="flex justify-end pt-2">
        <Button onClick={handleSave} disabled={saving || !currentPassword || !newPassword} size="lg" className="gap-2 px-8">
          <Shield size={16} />
          {saving ? "Updating..." : "Update Password"}
        </Button>
      </div>
    </div>
  );
}

/* ─── Notifications Tab ─── */
function NotificationsTab({ user }: { user: { notificationPreferences?: { emailBooking?: boolean; emailNewsletter?: boolean; emailReview?: boolean } } | null | undefined }) {
  const prefs = user?.notificationPreferences;
  const [emailBooking, setEmailBooking] = useState(prefs?.emailBooking ?? true);
  const [emailNewsletter, setEmailNewsletter] = useState(prefs?.emailNewsletter ?? false);
  const [emailReview, setEmailReview] = useState(prefs?.emailReview ?? true);
  const [saving, setSaving] = useState(false);

  const savePreferences = useCallback(async (updates: Record<string, boolean>) => {
    setSaving(true);
    try {
      await api.put("/users/notification-preferences", updates);
      toast.success("Preferences saved");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save preferences");
    } finally {
      setSaving(false);
    }
  }, []);

  const handleToggle = (key: string, currentValue: boolean, setter: (v: boolean) => void) => {
    const newValue = !currentValue;
    setter(newValue);
    const allPrefs = { emailBooking, emailNewsletter, emailReview, [key]: newValue };
    savePreferences(allPrefs);
  };

  const toggles = [
    { key: "emailBooking", label: "Booking Notifications", description: "Receive emails when a new booking is made or updated", icon: "📨", value: emailBooking, onChange: setEmailBooking },
    { key: "emailNewsletter", label: "Newsletter", description: "Receive our monthly newsletter with tips and updates", icon: "📰", value: emailNewsletter, onChange: setEmailNewsletter },
    { key: "emailReview", label: "Review Alerts", description: "Get notified when a new review is posted on your packages", icon: "⭐", value: emailReview, onChange: setEmailReview },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <Bell size={20} className="text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-semibold">Email Notifications</h2>
          <p className="text-sm text-muted-foreground">Choose which notifications you&apos;d like to receive.</p>
        </div>
      </div>

      <Separator />

      <div className="space-y-3">
        {toggles.map((t) => (
          <div
            key={t.label}
            className={`flex items-center justify-between rounded-xl border-2 p-5 transition-all duration-200 ${
              t.value ? "border-primary/20 bg-primary/5" : "border-transparent bg-muted/30 hover:bg-muted/50"
            }`}
          >
            <div className="flex items-center gap-4">
              <span className="text-2xl">{t.icon}</span>
              <div>
                <p className="font-medium">{t.label}</p>
                <p className="text-sm text-muted-foreground">{t.description}</p>
              </div>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={t.value}
              disabled={saving}
              onClick={() => handleToggle(t.key, t.value, t.onChange)}
              className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-all duration-200 ${
                t.value ? "bg-primary shadow-md shadow-primary/20" : "bg-muted"
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5.5 w-5.5 rounded-full bg-background shadow-lg ring-0 transition-transform duration-200 ${
                  t.value ? "translate-x-5" : "translate-x-0.5"
                }`}
                style={{ height: "22px", width: "22px", marginTop: "1px" }}
              />
            </button>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 rounded-lg bg-muted/50 px-4 py-3">
        <CheckCircle size={14} className="text-emerald-500" />
        <p className="text-xs text-muted-foreground">
          Notification preferences are saved automatically when toggled.
        </p>
      </div>
    </div>
  );
}
