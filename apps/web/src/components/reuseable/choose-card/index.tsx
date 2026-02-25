import type { IconType } from "react-icons";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChooseCardProps {
  img?: string;
  icon?: IconType | LucideIcon;
  title?: string;
  desc?: string;
  color?: "rose" | "blue" | "emerald" | "amber";
  className?: string;
}

const colorMap = {
  rose: "bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400 group-hover:bg-rose-100 dark:group-hover:bg-rose-900/50",
  blue: "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50",
  emerald: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/50",
  amber: "bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400 group-hover:bg-amber-100 dark:group-hover:bg-amber-900/50",
};

export default function ChooseCard({
  img = "",
  icon: Icon,
  title = "",
  desc = "",
  color = "rose",
  className,
}: ChooseCardProps) {
  return (
    <div
      className={cn(
        "group flex flex-col items-center justify-center gap-4 rounded-2xl border bg-card p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",
        className
      )}
    >
      <div
        className={cn(
          "flex h-16 w-16 items-center justify-center rounded-2xl transition-colors duration-300",
          colorMap[color]
        )}
      >
        {img && (
          <img src={img} alt={title} className="h-8 w-8 object-contain" />
        )}
        {Icon && <Icon size={28} />}
      </div>
      <h3 className="text-lg font-bold transition-colors duration-300 group-hover:text-primary">
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-muted-foreground">{desc}</p>
    </div>
  );
}
