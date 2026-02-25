import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeConfig = {
  sm: { icon: 28, text: "text-xl" },
  md: { icon: 36, text: "text-2xl" },
  lg: { icon: 44, text: "text-3xl" },
};

export default function Logo({ size = "md", className }: LogoProps) {
  const config = sizeConfig[size];

  return (
    <Link to="/" className={cn("flex items-center gap-2.5 group", className)}>
      <div className="relative">
        <svg
          width={config.icon}
          height={config.icon}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-500 group-hover:rotate-[360deg]"
        >
          <defs>
            <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e11d48" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
          <circle cx="24" cy="24" r="22" stroke="url(#logoGrad)" strokeWidth="2.5" fill="none" />
          <circle cx="24" cy="24" r="3" fill="url(#logoGrad)" />
          <path d="M24 6 L26.5 20 L24 18 L21.5 20 Z" fill="#e11d48" />
          <path d="M24 42 L26.5 28 L24 30 L21.5 28 Z" fill="#3b82f6" />
          <path d="M6 24 L20 21.5 L18 24 L20 26.5 Z" fill="#3b82f6" />
          <path d="M42 24 L28 21.5 L30 24 L28 26.5 Z" fill="#e11d48" />
          <circle cx="24" cy="24" r="14" stroke="url(#logoGrad)" strokeWidth="0.75" fill="none" opacity="0.4" />
        </svg>
      </div>
      <div className={cn("font-bold tracking-tight leading-none", config.text)}>
        <span className="bg-gradient-to-r from-rose-600 to-blue-500 bg-clip-text text-transparent">
          Tour
        </span>
        <span className="text-foreground">Guide</span>
      </div>
    </Link>
  );
}
