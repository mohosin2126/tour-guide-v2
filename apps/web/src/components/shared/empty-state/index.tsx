import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export default function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex min-h-[350px] flex-col items-center justify-center rounded-xl border border-dashed bg-muted/30 p-8 text-center",
        className
      )}
    >

      <div className="relative mb-6">
        <div className="absolute -inset-3 rounded-full bg-primary/5" />
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
          <Icon className="h-9 w-9 text-primary/60" strokeWidth={1.5} />
        </div>
      </div>

      <h3 className="text-lg font-semibold">{title}</h3>

      {description && (
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">{description}</p>
      )}

      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
