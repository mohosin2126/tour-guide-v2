import { useState, useContext } from "react";
import { Settings, User, Shield, Bell, Save } from "lucide-react";
import { AuthContext } from "@/context/auth-context";
import { api } from "@/hooks/auth/use-api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

type Tab = "profile" | "security" | "notifications";

export default function AdminSettings() {
  const auth = useContext(AuthContext);
  const user = auth?.user;
  const [activeTab, setActiveTab] = useState<Tab>("profile");

  const tabs: { id: Tab; label: string; icon: typeof User }[] = [
    { id: "profile", label: "Profile", icon: User },
    { id: "security", label: "Security", icon: Shield },
    { id: "notifications", label: "Notifications", icon: Bell },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Sidebar tabs */}
        <nav className="flex gap-1 lg:w-56 lg:flex-col">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            );
          })}
        </nav>

        <Separator orientation="vertical" className="hidden lg:block" />

        {/* Tab content */}
        <div className="flex-1 max-w-xl">
          {activeTab === "profile" && <ProfileTab user={user} />}
          {activeTab === "security" && <SecurityTab />}
          {activeTab === "notifications" && <NotificationsTab />}
        </div>
      </div>
    </div>
  );
}

/* ─── Profile Tab ─── */
function ProfileTab({ user }: { user: { name?: string; email?: string; photo?: string } | null | undefined }) {
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.put("/users/profile", { name, email });
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Profile Information</h2>
        <p className="text-sm text-muted-foreground">Update your name and email address.</p>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Full Name</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" />
        </div>
        <div className="space-y-2">
          <Label>Email Address</Label>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john@example.com" />
        </div>
      </div>
      <Button onClick={handleSave} disabled={saving}>
        <Save size={16} className="mr-2" />
        {saving ? "Saving..." : "Save Changes"}
      </Button>
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
    } catch (err) {
      console.error(err);
      setError("Failed to update password. Check your current password.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Change Password</h2>
        <p className="text-sm text-muted-foreground">Update your password to keep your account secure.</p>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Current Password</Label>
          <Input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>New Password</Label>
          <Input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Confirm New Password</Label>
          <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>
      <Button onClick={handleSave} disabled={saving || !currentPassword || !newPassword}>
        <Shield size={16} className="mr-2" />
        {saving ? "Updating..." : "Update Password"}
      </Button>
    </div>
  );
}

/* ─── Notifications Tab ─── */
function NotificationsTab() {
  const [emailBooking, setEmailBooking] = useState(true);
  const [emailNewsletter, setEmailNewsletter] = useState(false);
  const [emailReview, setEmailReview] = useState(true);

  const toggles = [
    { label: "Booking Notifications", description: "Receive emails when a new booking is made", value: emailBooking, onChange: setEmailBooking },
    { label: "Newsletter", description: "Receive our monthly newsletter", value: emailNewsletter, onChange: setEmailNewsletter },
    { label: "Review Alerts", description: "Get notified when a new review is posted", value: emailReview, onChange: setEmailReview },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Email Notifications</h2>
        <p className="text-sm text-muted-foreground">Choose which notifications you'd like to receive.</p>
      </div>
      <div className="space-y-4">
        {toggles.map((t) => (
          <div key={t.label} className="flex items-center justify-between rounded-lg border p-4">
            <div>
              <p className="font-medium">{t.label}</p>
              <p className="text-sm text-muted-foreground">{t.description}</p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={t.value}
              onClick={() => t.onChange(!t.value)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors ${
                t.value ? "bg-primary" : "bg-muted"
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform ${
                  t.value ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground">
        Notification preferences are saved automatically.
      </p>
    </div>
  );
}
