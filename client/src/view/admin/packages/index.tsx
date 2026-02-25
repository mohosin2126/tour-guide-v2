import { useState } from "react";
import { Package, Search } from "lucide-react";
import { usePackages, useDeletePackage } from "@/hooks/api/use-packages";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageLoader } from "@/components/ui/loading";
import { Link } from "react-router-dom";

interface PackageRecord {
  _id: string;
  title?: string;
  price?: number;
  location?: string;
  difficulty?: string;
  images?: string[];
  guide?: { name?: string };
}

export default function AdminPackages() {
  const [search, setSearch] = useState("");
  const { data: packagesData, isLoading } = usePackages({});
  const deleteMutation = useDeletePackage();

  const packages: PackageRecord[] = (packagesData as Record<string, unknown>)?.packages as PackageRecord[] || packagesData as PackageRecord[] || [];

  const filtered = packages.filter(
    (p) =>
      p.title?.toLowerCase().includes(search.toLowerCase()) ||
      p.location?.toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) return <PageLoader />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Packages</h1>
        <p className="text-muted-foreground">All tour packages on the platform</p>
      </div>
      <div className="relative max-w-md">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search packages..." className="pl-9" />
      </div>
      {!filtered.length ? (
        <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
          <Package className="mb-4 h-16 w-16 text-muted-foreground/50" />
          <h3 className="text-lg font-semibold">No packages found</h3>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((pkg) => (
            <Card key={pkg._id}>
              <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  <div className="h-14 w-20 flex-shrink-0 overflow-hidden rounded-md bg-muted">
                    <img
                      src={pkg.images?.[0] || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=200"}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <Link to={`/packages/${pkg._id}`} className="font-semibold hover:text-primary">{pkg.title}</Link>
                    <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                      <span>${pkg.price}</span>
                      <span>{pkg.location}</span>
                      <Badge variant="outline" className="text-xs">{pkg.difficulty}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">Guide: {pkg.guide?.name || "Unknown"}</p>
                  </div>
                </div>
                <Button size="sm" variant="destructive" onClick={() => deleteMutation.mutate(pkg._id)} disabled={deleteMutation.isPending}>
                  Remove
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
