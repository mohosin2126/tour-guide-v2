import { Trash2, FileText } from "lucide-react";
import { useStories, useDeleteStory } from "@/hooks/api/use-stories";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PageLoader } from "@/components/ui/loading";

interface StoryRecord {
  _id: string;
  title?: string;
  content?: string;
  createdAt?: string;
  likes?: string[];
  author?: { name?: string; photo?: string };
}

export default function AdminStories() {
  const { data: stories, isLoading } = useStories() as { data: StoryRecord[] | undefined; isLoading: boolean };
  const deleteMutation = useDeleteStory();

  if (isLoading) return <PageLoader />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Stories</h1>
        <p className="text-muted-foreground">Moderate community stories</p>
      </div>
      {!stories?.length ? (
        <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
          <FileText className="mb-4 h-16 w-16 text-muted-foreground/50" />
          <h3 className="text-lg font-semibold">No stories yet</h3>
        </div>
      ) : (
        <div className="space-y-4">
          {stories.map((story) => {
            const initials = story.author?.name?.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) || "U";
            return (
              <Card key={story._id}>
                <CardContent className="flex items-start justify-between p-4">
                  <div className="flex items-start gap-3">
                    <Avatar className="mt-1">
                      <AvatarImage src={story.author?.photo} />
                      <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{story.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        by {story.author?.name} · {new Date(story.createdAt || "").toLocaleDateString()}
                      </p>
                      <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{story.content}</p>
                      <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                        <span>{story.likes?.length || 0} likes</span>
                      </div>
                    </div>
                  </div>
                  <Button size="sm" variant="destructive" onClick={() => deleteMutation.mutate(story._id)} disabled={deleteMutation.isPending}>
                    <Trash2 size={14} />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
