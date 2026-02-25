import { useState } from "react";
import { PenSquare, Trash2, FileText } from "lucide-react";
import { useUserStories, useCreateStory, useDeleteStory } from "@/hooks/api/use-stories";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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

  const handleCreate = () => {
    createMutation.mutate(
      { title, content, images: images ? images.split(",").map((s) => s.trim()) : [] },
      {
        onSuccess: () => {
          setDialogOpen(false);
          setTitle("");
          setContent("");
          setImages("");
        },
      }
    );
  };

  if (isLoading) return <PageLoader />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">My Stories</h1>
          <p className="text-muted-foreground">Share your travel experiences</p>
        </div>
        <Button onClick={() => setDialogOpen(true)}>
          <PenSquare size={18} className="mr-2" />New Story
        </Button>
      </div>
      {!stories?.length ? (
        <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
          <FileText className="mb-4 h-16 w-16 text-muted-foreground/50" />
          <h3 className="text-lg font-semibold">No stories yet</h3>
          <p className="text-muted-foreground">Write about your travel experiences</p>
        </div>
      ) : (
        <div className="space-y-4">
          {stories.map((story) => (
            <Card key={story._id}>
              <CardContent className="flex items-start justify-between p-4">
                <div className="flex-1">
                  <h3 className="font-semibold">{story.title}</h3>
                  <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{story.content}</p>
                  <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                    <span>{new Date(story.createdAt || "").toLocaleDateString()}</span>
                    <span>{story.likes?.length || 0} likes</span>
                  </div>
                </div>
                <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive" onClick={() => deleteMutation.mutate(story._id)} disabled={deleteMutation.isPending}>
                  <Trash2 size={16} />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
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
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleCreate} disabled={!title.trim() || !content.trim() || createMutation.isPending}>
              {createMutation.isPending ? "Publishing..." : "Publish"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
