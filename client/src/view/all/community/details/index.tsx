import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Heart, Calendar, Send, LogIn } from "lucide-react";
import { useStory, useToggleLike } from "@/hooks/api/use-stories";
import { useComments } from "@/hooks/api/use-general";
import { useAuth } from "@/hooks/auth/use-auth";
import { api } from "@/hooks/auth/use-api";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { PageLoader } from "@/components/ui/loading";

export default function StoryDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { data: story, isLoading } = useStory(id);
  const { data: comments, refetch: refetchComments } = useComments(id);
  const toggleLike = useToggleLike();
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleLike = () => {
    if (!isAuthenticated || !user) {
      navigate("/auth/login", { state: { from: { pathname: `/community/${id}` } } });
      return;
    }
    toggleLike.mutate({ storyId: id!, userId: user._id });
  };

  const handleComment = async () => {
    if (!comment.trim() || !isAuthenticated) return;
    setSubmitting(true);
    try {
      await api.post("/comments", { storyId: id, content: comment });
      setComment("");
      refetchComments();
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) return <PageLoader />;
  if (!story) return <div className="pt-24 text-center">Story not found</div>;

  const author = story.user || story.author;

  return (
    <div className="min-h-screen pb-16 pt-24">
      <div className="custom-container max-w-3xl">
        <Button variant="ghost" className="mb-4" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} className="mr-2" />
          Back
        </Button>

        <article>
          <div className="mb-6 flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={author?.photo} />
              <AvatarFallback>{author?.name?.[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{author?.name || "Anonymous"}</p>
              <p className="flex items-center gap-1 text-sm text-muted-foreground">
                <Calendar size={14} />
                {new Date(story.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>

          <h1 className="text-3xl font-bold">{story.title}</h1>

          {story.images?.length > 0 && (
            <div className="mt-6 space-y-4">
              {story.images.map((img: string, i: number) => (
                <div key={i} className="overflow-hidden rounded-xl">
                  <img src={img} alt={`Story image ${i + 1}`} className="w-full object-cover" />
                </div>
              ))}
            </div>
          )}

          <div className="mt-6 whitespace-pre-line leading-relaxed text-foreground">
            {story.content}
          </div>

          <div className="mt-6 flex items-center gap-4">
            <button
              onClick={handleLike}
              className="flex items-center gap-1.5 text-sm transition-colors hover:text-red-500"
            >
              <Heart
                size={20}
                className={
                  (story.likes as string[])?.includes(user?._id || "")
                    ? "fill-red-500 text-red-500"
                    : "text-muted-foreground"
                }
              />
              <span>{story.likes?.length || 0} likes</span>
            </button>
          </div>
        </article>

        <Separator className="my-8" />

        <div>
          <h2 className="mb-4 text-xl font-semibold">Comments ({comments?.length || 0})</h2>

          {isAuthenticated ? (
            <div className="mb-6 flex gap-3">
              <Avatar className="h-9 w-9">
                <AvatarImage src={user?.photo} />
                <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-2">
                <Textarea
                  placeholder="Write a comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={3}
                />
                <Button
                  size="sm"
                  disabled={!comment.trim() || submitting}
                  onClick={handleComment}
                >
                  <Send size={14} className="mr-1" />
                  {submitting ? "Posting..." : "Post"}
                </Button>
              </div>
            </div>
          ) : (
            <Card className="mb-6">
              <CardContent className="flex items-center justify-between p-4">
                <p className="text-sm text-muted-foreground">Sign in to join the conversation</p>
                <Button size="sm" asChild>
                  <Link to="/auth/login" state={{ from: { pathname: `/community/${id}` } }}>
                    <LogIn size={14} className="mr-1.5" />Sign In
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}

          <div className="space-y-4">
            {comments?.map((c: Record<string, unknown>) => (
              <Card key={c._id as string}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={(c.user as Record<string, string>)?.photo} />
                      <AvatarFallback>
                        {(c.user as Record<string, string>)?.name?.[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium">
                          {(c.user as Record<string, string>)?.name}
                        </p>
                        <span className="text-xs text-muted-foreground">
                          {new Date(c.createdAt as string).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">{c.content as string}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
