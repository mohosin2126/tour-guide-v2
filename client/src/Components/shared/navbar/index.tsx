import { useEffect, useRef, useState } from "react";
import Logo from "@/components/shared/logo";
import UserProfile from "@/components/shared/user-profile";
import { menuData } from "@/data/menu-items";
import { NavLink, useLocation } from "react-router-dom";
import { useTheme } from "@/context/theme-context";
import { Sun, Moon, Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { MenuItem } from "@/types";

// Pages with dark hero backgrounds where white text is fine
const darkHeroPages = ["/", "/about-us", "/contact-us", "/packages", "/guides", "/community"];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState<number | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const { changeTheme, mode } = useTheme();
  const location = useLocation();
  const hasDarkHero = darkHeroPages.includes(location.pathname);
  // Use light text only on dark hero pages when not scrolled
  const useWhiteText = !isScrolled && hasDarkHero;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  const closeDrawer = () => {
    setDrawerOpen(false);
    setMobileSubmenu(null);
  };

  const renderDesktopItem = (item: MenuItem) => {
    if (item.subMenu) {
      return (
        <div key={item.id} className="relative group">
          <button
            className={cn(
              "flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
              isScrolled || !useWhiteText
                ? "text-foreground hover:bg-primary/10 hover:text-primary"
                : "text-white/90 hover:bg-white/10 hover:text-white"
            )}
          >
            {item.title}
            <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180" />
          </button>
          <div className="invisible absolute left-0 top-full z-50 mt-1 min-w-[200px] rounded-xl border bg-background/95 p-2 opacity-0 shadow-xl backdrop-blur-xl transition-all duration-200 group-hover:visible group-hover:opacity-100">
            {item.subMenu.map((sub) => (
              <NavLink
                key={sub.id}
                to={sub.href}
                className={({ isActive }) =>
                  cn(
                    "block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-foreground hover:bg-accent"
                  )
                }
              >
                {sub.title}
              </NavLink>
            ))}
          </div>
        </div>
      );
    }

    return (
      <NavLink
        key={item.id}
        to={item.href}
        className={({ isActive }) =>
          cn(
            "relative rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
            isActive
              ? "bg-primary/15 text-primary"
              : isScrolled || !useWhiteText
                ? "text-foreground hover:bg-primary/10 hover:text-primary"
                : "text-white/90 hover:bg-white/10 hover:text-white"
          )
        }
      >
        {({ isActive }) => (
          <>
            {item.title}
            {isActive && (
              <span className="absolute bottom-0 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-primary transition-all duration-300" />
            )}
          </>
        )}
      </NavLink>
    );
  };

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          "fixed top-0 z-50 w-full transition-all duration-500",
          isScrolled
            ? "h-16 border-b border-border/50 bg-background/80 shadow-lg shadow-black/5 backdrop-blur-xl"
            : hasDarkHero
              ? "h-20 bg-transparent"
              : "h-20 border-b border-border/50 bg-background/80 backdrop-blur-xl"
        )}
      >
        <div className="custom-container flex h-full items-center justify-between">
          <Logo size={isScrolled ? "sm" : "md"} />

          <nav className="hidden items-center gap-1 lg:flex">
            {menuData.map(renderDesktopItem)}
          </nav>

          <div className="flex items-center gap-1.5">
            <Button
              variant="ghost"
              size="icon"
              onClick={changeTheme}
              className={cn(
                "relative h-9 w-9 rounded-full transition-all duration-300",
                isScrolled || !useWhiteText
                  ? "hover:bg-accent"
                  : "text-white hover:bg-white/10 hover:text-white"
              )}
            >
              <Sun
                className={cn(
                  "absolute h-5 w-5 transition-all duration-300",
                  mode === "dark"
                    ? "rotate-0 scale-100"
                    : "rotate-90 scale-0"
                )}
              />
              <Moon
                className={cn(
                  "absolute h-5 w-5 transition-all duration-300",
                  mode === "dark"
                    ? "-rotate-90 scale-0"
                    : "rotate-0 scale-100"
                )}
              />
            </Button>

            <UserProfile isScrolled={isScrolled && !useWhiteText} />

            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-9 w-9 rounded-full lg:hidden",
                isScrolled || !useWhiteText
                  ? "hover:bg-accent"
                  : "text-white hover:bg-white/10 hover:text-white"
              )}
              onClick={() => setDrawerOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <div
        className={cn(
          "fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden",
          drawerOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={closeDrawer}
      />
      <aside
        className={cn(
          "fixed right-0 top-0 z-[70] flex h-full w-80 flex-col bg-background shadow-2xl transition-transform duration-300 ease-out lg:hidden",
          drawerOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between border-b p-5">
          <Logo size="sm" />
          <Button variant="ghost" size="icon" onClick={closeDrawer} className="h-9 w-9 rounded-full">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4">
          <div className="flex flex-col gap-1">
            {menuData.map((item) => (
              <div key={item.id}>
                {item.subMenu ? (
                  <div>
                    <button
                      onClick={() =>
                        setMobileSubmenu(mobileSubmenu === item.id ? null : item.id)
                      }
                      className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
                    >
                      {item.title}
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform duration-200",
                          mobileSubmenu === item.id && "rotate-180"
                        )}
                      />
                    </button>
                    <div
                      className={cn(
                        "ml-3 overflow-hidden border-l border-border/50 pl-3 transition-all duration-200",
                        mobileSubmenu === item.id
                          ? "max-h-96 opacity-100"
                          : "max-h-0 opacity-0"
                      )}
                    >
                      {item.subMenu.map((sub) => (
                        <NavLink
                          key={sub.id}
                          to={sub.href}
                          onClick={closeDrawer}
                          className={({ isActive }) =>
                            cn(
                              "block rounded-lg px-3 py-2.5 text-sm transition-colors",
                              isActive
                                ? "bg-primary/10 font-medium text-primary"
                                : "text-muted-foreground hover:bg-accent hover:text-foreground"
                            )
                          }
                        >
                          {sub.title}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                ) : (
                  <NavLink
                    to={item.href}
                    onClick={closeDrawer}
                    className={({ isActive }) =>
                      cn(
                        "block rounded-lg px-3 py-3 text-sm font-semibold transition-colors",
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-foreground hover:bg-accent"
                      )
                    }
                  >
                    {item.title}
                  </NavLink>
                )}
              </div>
            ))}
          </div>
        </nav>
      </aside>
    </>
  );
}
