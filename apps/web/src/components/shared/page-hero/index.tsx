import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { ChevronRight, Home, type LucideIcon } from "lucide-react";

interface HeroStat {
  icon: LucideIcon;
  value: string;
  label: string;
}

interface HeroCTA {
  label: string;
  href: string;
  variant?: "primary" | "outline";
  icon?: LucideIcon;
}

interface PageHeroProps {
  title: string;
  /** Word or phrase to render with a gradient accent */
  gradientText?: string;
  subtitle?: string;
  backgroundImage?: string;
  height?: "full" | "half" | "short";
  breadcrumbs?: { label: string; href?: string }[];
  /** Small badge shown above the title */
  badge?: { icon?: LucideIcon; text: string };
  /** CTA buttons rendered below the subtitle */
  ctaButtons?: HeroCTA[];
  /** Floating stats shown at the bottom */
  stats?: HeroStat[];
  children?: React.ReactNode;
}

export default function PageHero({
  title,
  gradientText,
  subtitle,
  backgroundImage,
  height = "full",
  breadcrumbs,
  badge,
  ctaButtons,
  stats,
  children,
}: PageHeroProps) {
  const heightClasses = {
    full: "h-screen",
    half: "h-[50vh] min-h-[400px]",
    short: "h-[320px] min-h-[280px]",
  };

  /* Split title around the gradient word so we can style it */
  const renderTitle = () => {
    if (!gradientText) {
      return <>{title}</>;
    }
    const idx = title.indexOf(gradientText);
    if (idx === -1) return <>{title}</>;
    const before = title.slice(0, idx);
    const after = title.slice(idx + gradientText.length);
    return (
      <>
        {before}
        <span className="bg-gradient-to-r from-primary via-rose-400 to-amber-400 bg-clip-text text-transparent">
          {gradientText}
        </span>
        {after}
      </>
    );
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
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />

      {/* Decorative elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -right-32 bottom-1/4 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
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

        {badge && (
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white/90 backdrop-blur-sm">
            {badge.icon && <badge.icon size={14} className="fill-yellow-400 text-yellow-400" />}
            {badge.text}
          </div>
        )}

        <h1 className="max-w-4xl text-4xl font-extrabold leading-tight text-white md:text-5xl lg:text-6xl">
          {renderTitle()}
        </h1>

        {subtitle && (
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
            {subtitle}
          </p>
        )}

        {ctaButtons && ctaButtons.length > 0 && (
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            {ctaButtons.map((cta) =>
              cta.variant === "outline" ? (
                <Link
                  key={cta.label}
                  to={cta.href}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-8 py-3.5 font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20"
                >
                  {cta.label}
                  {cta.icon && <cta.icon size={18} />}
                </Link>
              ) : (
                <Link
                  key={cta.label}
                  to={cta.href}
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 font-semibold text-white shadow-lg shadow-primary/30 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/40"
                >
                  {cta.label}
                  {cta.icon && <cta.icon size={18} />}
                </Link>
              )
            )}
          </div>
        )}

        {children && <div className="mt-8">{children}</div>}

        {stats && stats.length > 0 && (
          <div className="mt-14 flex items-center justify-center gap-6 sm:gap-10">
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-center gap-2.5 text-white/80">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
                  <stat.icon size={18} />
                </div>
                <div className="text-left">
                  <p className="text-lg font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-white/60">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
