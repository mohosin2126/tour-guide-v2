import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, MessageCircle, Calendar, PenSquare, ImagePlus, BookOpen, Star, Users } from "lucide-react";
import { useStories, useToggleLike, useCreateStory } from "@/hooks/api/use-stories";
import { useAuth } from "@/hooks/auth/use-auth";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PageLoader } from "@/components/ui/loading";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import PageHero from "@/components/shared/page-hero";
import { useLoginGuard } from "@/components/shared/login-modal";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

export default function Community() {
  const { data: stories, isLoading } = useStories();
  const { user } = useAuth();
  const { requireLogin, LoginModal } = useLoginGuard();
  const toggleLike = useToggleLike();
  const createStory = useCreateStory();

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleLike = (storyId: string) => {
    requireLogin(() => {
      toggleLike.mutate({ storyId, userId: user!._id });
    }, "Please log in to like stories.");
  };

  const handleShareStory = () => {
    requireLogin(() => {
      setOpen(true);
    }, "Please log in to share your travel story.");
  };

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) return;
    createStory.mutate(
      {
        user: user!._id,
        title,
        content,
        images: imageUrl ? [imageUrl] : [],
      },
      {
        onSuccess: () => {
          setOpen(false);
          setTitle("");
          setContent("");
          setImageUrl("");
          toast.success("Story shared!");
        },
        onError: () => toast.error("Failed to share story"),
      }
    );
  };

  if (isLoading) return <PageLoader />;

  return (
    <div className="min-h-screen pb-16">
      {/* Hero */}
      <PageHero
        title="Share Your Travel Stories"
        gradientText="Stories"
        subtitle="Join a vibrant community of travelers sharing authentic experiences, tips, and inspiration from around the world."
        backgroundImage="https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=1600"
        height="full"
      
        badge={{ icon: BookOpen, text: "Real stories from real travelers" }}
        stats={[
          { icon: Heart, value: "5K+", label: "Stories" },
          { icon: Users, value: "12K+", label: "Members" },
          { icon: Star, value: "4.9", label: "Community" },
        ]}
      >
        <Button
          size="lg"
          variant="secondary"
          className="mt-2"
          onClick={handleShareStory}
        >
          <PenSquare size={18} className="mr-2" />
          Share Your Story
        </Button>
      </PageHero>

      <div className="custom-container max-w-3xl pt-10">
        {!stories?.length ? (
          <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
            <BookOpen className="mb-4 h-16 w-16 text-muted-foreground/50" />
            <h3 className="text-lg font-semibold">No stories yet</h3>
            <p className="text-muted-foreground">Be the first to share your travel experience!</p>
            <Button className="mt-4" onClick={handleShareStory}>
              <PenSquare size={16} className="mr-2" />Write a Story
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {stories.map((story: Record<string, unknown>) => {
              const author = (story.user || story.author) as Record<string, string> | undefined;
              return (
                <Card key={story._id as string} className="group overflow-hidden transition-all hover:shadow-md">
                  {(story.coverImage || (story.images as string[])?.length) && (
                    <Link to={`/community/${story._id}`}>
                      <div className="aspect-[3/1] overflow-hidden">
                        <img
                          src={(story.coverImage as string) || (story.images as string[])?.[0]}
                          alt=""
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                    </Link>
                  )}
                  <CardContent className="p-6">
                    <div className="mb-4 flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={author?.photo} />
                        <AvatarFallback>{author?.name?.[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{author?.name || "Anonymous"}</p>
                        <p className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar size={12} />
                          {new Date(story.createdAt as string).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                    <Link to={`/community/${story._id}`}>
                      <h2 className="mb-2 text-xl font-semibold transition-colors hover:text-primary">
                        {story.title as string}
                      </h2>
                    </Link>
                    <p className="line-clamp-3 text-muted-foreground">{story.content as string}</p>
                  </CardContent>
                  <CardFooter className="border-t px-6 py-3">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => handleLike(story._id as string)}
                        className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-red-500"
                      >
                        <Heart
                          size={18}
                          className={
                            (story.likes as string[])?.includes(user?._id || "")
                              ? "fill-red-500 text-red-500"
                              : ""
                          }
                        />
                        {(story.likes as string[])?.length || 0}
                      </button>
                      <Link
                        to={`/community/${story._id}`}
                        className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
                      >
                        <MessageCircle size={18} />
                        Read More
                      </Link>
                    </div>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* Create Story Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Share Your Story</DialogTitle>
            <DialogDescription>Tell the community about your travel experience.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input placeholder="Give your story a title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Your Story</Label>
              <Textarea placeholder="Write about your experience…" value={content} onChange={(e) => setContent(e.target.value)} rows={6} />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1.5"><ImagePlus size={14} />Image URL (optional)</Label>
              <Input placeholder="https://example.com/photo.jpg" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleSubmit} disabled={!title.trim() || !content.trim() || createStory.isPending}>
              {createStory.isPending ? "Publishing…" : "Publish Story"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {LoginModal}
    </div>
  );
}
