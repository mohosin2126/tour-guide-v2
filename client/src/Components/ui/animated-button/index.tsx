import * as React from "react";
import { cn } from "@/lib/utils";

export interface AnimatedButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  asChild?: boolean;
  size?: "default" | "sm" | "lg";
}

const AnimatedButton = React.forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ className, children, size = "default", ...props }, ref) => {
    const sizeClasses = {
      sm: "h-9 px-4 text-sm",
      default: "h-[50px] px-8 text-base",
      lg: "h-14 px-10 text-lg",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "relative overflow-hidden border border-primary bg-card font-semibold text-primary shadow-2xl transition-all",
          "before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:duration-500",
          "after:absolute after:right-0 after:top-0 after:h-full after:w-0 after:duration-500",
          "hover:text-white hover:shadow-primary",
          "hover:before:w-2/4 hover:before:bg-primary",
          "hover:after:w-2/4 hover:after:bg-primary",
          "disabled:pointer-events-none disabled:opacity-50",
          sizeClasses[size],
          className
        )}
        {...props}
      >
        <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
      </button>
    );
  }
);

AnimatedButton.displayName = "AnimatedButton";

export { AnimatedButton };
export default AnimatedButton;
