import { Link } from "react-router-dom";
import { Heart, Trash2, DollarSign } from "lucide-react";
import { useWishlist, useRemoveFromWishlist } from "@/hooks/api/use-wishlist";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageLoader } from "@/components/ui/loading";

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

  if (isLoading) return <PageLoader />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">My Wishlist</h1>
        <p className="text-muted-foreground">Packages you&apos;ve saved for later</p>
      </div>
      {!wishlist?.length ? (
        <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
          <Heart className="mb-4 h-16 w-16 text-muted-foreground/50" />
          <h3 className="text-lg font-semibold">Wishlist is empty</h3>
          <p className="text-muted-foreground">Save packages you like to see them here</p>
          <Button className="mt-4" asChild>
            <Link to="/packages">Browse Packages</Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {wishlist.map((item) => {
            const pkg = item.package || (item as unknown as WishlistItem["package"])!;
            return (
              <Card key={item._id} className="overflow-hidden">
                <Link to={`/packages/${pkg._id}`}>
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={pkg.images?.[0] || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400"}
                      alt={pkg.title}
                      className="h-full w-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                </Link>
                <CardContent className="p-4">
                  <Link to={`/packages/${pkg._id}`}>
                    <h3 className="font-semibold hover:text-primary">{pkg.title}</h3>
                  </Link>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="flex items-center gap-1 font-bold text-primary">
                      <DollarSign size={16} />{pkg.price}
                    </span>
                    <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive" onClick={() => removeMutation.mutate(item._id)} disabled={removeMutation.isPending}>
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
