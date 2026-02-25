import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Trash2, DollarSign } from "lucide-react";
import { useWishlist, useRemoveFromWishlist } from "@/hooks/api/use-wishlist";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageLoader } from "@/components/ui/loading";
import EmptyState from "@/components/shared/empty-state";
import ConfirmDialog from "@/components/shared/confirm-dialog";

interface WishlistItem {
  _id: string;
  package?: {
    _id: string;
    title?: string;
    price?: number;
    images?: string[];
  };
}

export default function UserWishlist() {
  const { data: wishlist, isLoading } = useWishlist() as { data: WishlistItem[] | undefined; isLoading: boolean };
  const removeMutation = useRemoveFromWishlist();
  const [removeTarget, setRemoveTarget] = useState<WishlistItem | null>(null);

  if (isLoading) return <PageLoader />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">
          My Wishlist
          {wishlist?.length ? (
            <Badge variant="secondary" className="ml-3 align-middle text-xs font-normal">
              {wishlist.length}
            </Badge>
          ) : null}
        </h1>
        <p className="text-muted-foreground">Packages you&apos;ve saved for later</p>
      </div>

      {!wishlist?.length ? (
        <EmptyState
          icon={Heart}
          title="Wishlist is empty"
          description="Save packages you like to see them here"
          action={
            <Button asChild size="sm">
              <Link to="/packages">Browse Packages</Link>
            </Button>
          }
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {wishlist.map((item) => {
            const pkg = item.package || (item as unknown as WishlistItem["package"])!;
            return (
              <div key={item._id} className="group overflow-hidden rounded-xl border bg-card transition-all hover:shadow-lg">
                <Link to={`/packages/${pkg._id}`}>
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={pkg.images?.[0] || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400"}
                      alt={pkg.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </Link>
                <div className="p-4">
                  <Link to={`/packages/${pkg._id}`}>
                    <h3 className="font-semibold transition-colors hover:text-primary">{pkg.title}</h3>
                  </Link>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="flex items-center gap-1 text-lg font-bold text-primary">
                      <DollarSign size={18} />
                      {pkg.price?.toLocaleString()}
                    </span>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-9 w-9 p-0 text-destructive hover:bg-destructive/10 hover:text-destructive"
                      onClick={() => setRemoveTarget(item)}
                    >
                      <Trash2 size={18} />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <ConfirmDialog
        open={!!removeTarget}
        onOpenChange={() => setRemoveTarget(null)}
        title="Remove from Wishlist"
        description={`Remove "${removeTarget?.package?.title}" from your wishlist?`}
        confirmText="Remove"
        variant="destructive"
        onConfirm={() => {
          if (removeTarget) {
            removeMutation.mutate(removeTarget._id, {
              onSuccess: () => toast.success("Removed from wishlist"),
              onError: () => toast.error("Failed to remove from wishlist"),
            });
          }
          setRemoveTarget(null);
        }}
        loading={removeMutation.isPending}
      />
    </div>
  );
}
