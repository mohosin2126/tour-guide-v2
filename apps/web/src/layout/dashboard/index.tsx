import { useState, useMemo } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { Menu, Sun, Moon, X, LogOut, ChevronRight, Home, Bell } from "lucide-react";
import {
  adminDashboardData,
  userDashboardData,
  guideDashboardData,
} from "@/data/menu-items";
import { useTheme } from "@/context/theme-context";
import Logo from "@/components/shared/logo";
import { useAuth } from "@/hooks/auth/use-auth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import type { DashboardMenuItem } from "@/types";

function groupMenuItems(items: DashboardMenuItem[]) {
  const groups: { section: string; items: DashboardMenuItem[] }[] = [];
  let currentSection = "";
  for (const item of items) {
    const section = item.section || "Main";
    if (section !== currentSection) {
      groups.push({ section, items: [item] });
      currentSection = section;
    } else {
      groups[groups.length - 1].items.push(item);
    }
  }
  return groups;
}

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { changeTheme, mode } = useTheme();
  const { user, logout } = useAuth();
  const location = useLocation();

  const menuItems =
    user?.role === "admin"
      ? adminDashboardData
      : user?.role === "guide"
        ? guideDashboardData
        : userDashboardData;

  const groupedItems = useMemo(() => groupMenuItems(menuItems), [menuItems]);

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";


  const currentPage = menuItems.find((item) => location.pathname.startsWith(item.href));
  const roleLabel =
    user?.role === "admin" ? "Admin" : user?.role === "guide" ? "Guide" : "User";

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform border-r bg-card transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b px-4">
          <Logo size="sm" />
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={18} />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4" style={{ maxHeight: "calc(100vh - 64px - 100px)" }}>
          {groupedItems.map((group, gi) => (
            <div key={group.section} className={gi > 0 ? "mt-6" : ""}>
              {gi > 0 && (
                <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
                  {group.section}
                </p>
              )}
              <div className="flex flex-col gap-0.5">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.id}
                      to={item.href}
                      end={item.href.endsWith("overview")}
                      onClick={() => setSidebarOpen(false)}
                      className={({ isActive }) =>
                        `group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                          isActive
                            ? "border-l-[3px] border-primary bg-primary/10 text-primary"
                            : "border-l-[3px] border-transparent text-muted-foreground hover:bg-accent hover:text-foreground"
                        }`
                      }
                    >
                      <Icon size={18} className="shrink-0 transition-transform group-hover:scale-110" />
                      <span className="truncate">{item.title}</span>
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* User card at bottom */}
        <div className="absolute bottom-0 left-0 right-0 border-t bg-card p-3">
          <div className="mb-2 flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-muted/50">
            <Avatar className="h-9 w-9 ring-2 ring-primary/20">
              <AvatarImage src={user?.photo} />
              <AvatarFallback className="bg-primary/10 text-xs font-bold text-primary">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-semibold">{user?.name}</p>
              <p className="truncate text-xs text-muted-foreground">{user?.email}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-muted-foreground hover:text-destructive"
            onClick={logout}
          >
            <LogOut size={16} className="mr-2" />
            Log out
          </Button>
        </div>
      </aside>

     
      <div className="lg:pl-64">
        {/* Top header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-card/80 px-4 backdrop-blur-md lg:px-6">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={20} />
            </Button>
            {/* Breadcrumb */}
            <nav className="hidden items-center gap-1.5 text-sm text-muted-foreground sm:flex">
              <Home size={14} />
              <ChevronRight size={14} />
              <span>{roleLabel}</span>
              {currentPage && (
                <>
                  <ChevronRight size={14} />
                  <span className="font-medium text-foreground">{currentPage.title}</span>
                </>
              )}
            </nav>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="relative">
              <Bell size={18} />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary" />
            </Button>
            <Separator orientation="vertical" className="mx-1 h-6" />
            <Button variant="ghost" size="icon" onClick={changeTheme}>
              {mode === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </Button>
            <div className="ml-2 hidden items-center gap-2 lg:flex">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.photo} />
                <AvatarFallback className="bg-primary/10 text-xs font-bold text-primary">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="hidden xl:block">
                <p className="text-sm font-medium leading-none">{user?.name?.split(" ")[0]}</p>
                <Badge variant="secondary" size="sm" className="mt-0.5 capitalize">
                  {user?.role}
                </Badge>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 lg:p-6">
          <Outlet />
        </main>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
