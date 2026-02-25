import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  );
}

type SpinnerSize = "sm" | "default" | "lg";

function LoadingSpinner({ className, size = "default" }: { className?: string; size?: SpinnerSize }) {
  const sizeClasses: Record<SpinnerSize, string> = {
    sm: "h-4 w-4",
    default: "h-6 w-6",
    lg: "h-8 w-8",
  };

  return (
    <Loader2 className={cn("animate-spin text-primary", sizeClasses[size], className)} />
  );
}

function PageLoader() {
  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <LoadingSpinner size="lg" />
    </div>
  );
}

function CardSkeleton() {
  return (
    <div className="rounded-lg border bg-card p-4 shadow-sm">
      <Skeleton className="h-48 w-full rounded-md" />
      <div className="mt-4 space-y-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
  );
}

function TableSkeleton({ rows = 5, cols = 4 }: { rows?: number; cols?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4">
          {Array.from({ length: cols }).map((_, j) => (
            <Skeleton key={j} className="h-10 flex-1" />
          ))}
        </div>
      ))}
    </div>
  );
}

export { Skeleton, LoadingSpinner, PageLoader, CardSkeleton, TableSkeleton };
