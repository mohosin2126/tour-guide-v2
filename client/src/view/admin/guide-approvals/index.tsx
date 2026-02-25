import { useState, useEffect } from "react";
import { UserCheck, UserX, Shield } from "lucide-react";
import { api } from "@/hooks/auth/use-api";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PageLoader } from "@/components/ui/loading";

interface GuideRecord {
  _id: string;
  name?: string;
  email?: string;
  photo?: string;
  bio?: string;
  approved?: boolean;
}

export default function AdminGuideApprovals() {
  const [guides, setGuides] = useState<GuideRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchGuides = async () => {
    try {
      const { data } = await api.get("/guides");
      setGuides(data);
    } catch (err: unknown) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGuides();
  }, []);

  const handleApprove = async (id: string) => {
    try {
      await api.patch(`/guides/${id}/approve`, {});
      setGuides((prev) => prev.map((g) => (g._id === id ? { ...g, approved: true } : g)));
    } catch (err: unknown) {
      console.error(err);
    }
  };

  const handleReject = async (id: string) => {
    try {
      await api.patch(`/guides/${id}/reject`, {});
      setGuides((prev) => prev.filter((g) => g._id !== id));
    } catch (err: unknown) {
      console.error(err);
    }
  };

  if (loading) return <PageLoader />;

  const pending = guides.filter((g) => !g.approved);
  const approved = guides.filter((g) => g.approved);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Guide Approvals</h1>
        <p className="text-muted-foreground">Review and approve tour guide applications</p>
      </div>
      {pending.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Pending Approval ({pending.length})</h2>
          {pending.map((guide) => {
            const initials = guide.name?.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) || "G";
            return (
              <Card key={guide._id} className="border-amber-200 dark:border-amber-800">
                <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={guide.photo} />
                      <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{guide.name}</p>
                      <p className="text-sm text-muted-foreground">{guide.email}</p>
                      {guide.bio && <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">{guide.bio}</p>}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" onClick={() => handleApprove(guide._id)}>
                      <UserCheck size={14} className="mr-1" />Approve
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleReject(guide._id)}>
                      <UserX size={14} className="mr-1" />Reject
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Approved Guides ({approved.length})</h2>
        {approved.length === 0 ? (
          <div className="flex min-h-[200px] flex-col items-center justify-center text-center">
            <Shield className="mb-4 h-12 w-12 text-muted-foreground/50" />
            <p className="text-muted-foreground">No approved guides yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {approved.map((guide) => {
              const initials = guide.name?.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) || "G";
              return (
                <Card key={guide._id}>
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={guide.photo} />
                        <AvatarFallback>{initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{guide.name}</p>
                        <p className="text-sm text-muted-foreground">{guide.email}</p>
                      </div>
                    </div>
                    <Badge variant="default">Approved</Badge>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
