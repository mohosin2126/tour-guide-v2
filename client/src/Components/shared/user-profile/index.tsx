import { Link } from "react-router-dom";
import { LogOut, LayoutDashboard, User } from "lucide-react";
import { useAuth } from "@/hooks/auth/use-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface UserProfileProps {
  isScrolled?: boolean;
}

export default function UserProfile({ isScrolled = true }: UserProfileProps) {
  const { user, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="hidden items-center gap-2 lg:flex">
        <Button
          variant="ghost"
          asChild
          className={cn(
            "rounded-full",
            !isScrolled && "text-white hover:bg-white/10 hover:text-white"
          )}
        >
          <Link to="/auth/login">Login</Link>
        </Button>
        <Button asChild className="rounded-full">
          <Link to="/auth/register">Sign Up</Link>
        </Button>
      </div>
    );
  }

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  const dashboardPath =
    user?.role === "admin"
      ? "/admin/overview"
      : user?.role === "guide"
        ? "/guide/overview"
        : "/user/overview";

  const profilePath =
    user?.role === "admin"
      ? "/admin/settings"
      : user?.role === "guide"
        ? "/guide/profile"
        : "/user/profile";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-9 w-9 rounded-full p-0">
          <Avatar className="h-9 w-9 ring-2 ring-primary/20 transition-all hover:ring-primary/40">
            <AvatarImage src={user?.photo} alt={user?.name} />
            <AvatarFallback className="bg-primary text-xs text-primary-foreground">
              {initials}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 rounded-xl" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.name}</p>
            <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to={dashboardPath} className="flex cursor-pointer items-center">
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to={profilePath} className="flex cursor-pointer items-center">
            <User className="mr-2 h-4 w-4" />
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={logout}
          className="cursor-pointer text-destructive focus:text-destructive"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
