import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  height?: "full" | "half" | "short";
  breadcrumbs?: { label: string; href?: string }[];
  children?: React.ReactNode;
}

export default function PageHero({
  title,
  subtitle,
  backgroundImage,
  height = "half",
  breadcrumbs,
  children,
}: PageHeroProps) {
  const heightClasses = {
    full: "h-screen",
    half: "h-[50vh] min-h-[400px]",
    short: "h-[320px] min-h-[280px]",
  };

  return (
    <div className={cn("relative flex items-center justify-center overflow-hidden", heightClasses[height])}>
      {/* Background */}
      {backgroundImage ? (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${backgroundImage}')` }}
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/85 to-blue-600" />
      )}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Decorative elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <svg className="absolute bottom-0 left-0 right-0 h-12 w-full text-background" preserveAspectRatio="none" viewBox="0 0 1440 48">
          <path fill="currentColor" d="M0,48 L0,24 Q360,0 720,24 Q1080,48 1440,24 L1440,48 Z" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center text-white">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="mb-6 flex items-center justify-center gap-1 text-sm text-white/70">
            <Link to="/" className="flex items-center gap-1 transition-colors hover:text-white">
              <Home size={14} />
              Home
            </Link>
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-1">
                <ChevronRight size={14} />
                {crumb.href ? (
                  <Link to={crumb.href} className="transition-colors hover:text-white">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-white">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
          {title}
        </h1>

        {subtitle && (
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80 md:text-xl">
            {subtitle}
          </p>
        )}

        {children && <div className="mt-6">{children}</div>}
      </div>
    </div>
  );
}
