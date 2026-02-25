import {
  LayoutDashboard,
  Users,
  Package,
  BookOpen,
  Star,
  Map,
  Settings,
  FileText,
  Heart,
  UserCheck,
  BarChart3,
} from "lucide-react";
import type { MenuItem, DashboardMenuItem } from "@/types";

export const menuData: MenuItem[] = [
  { id: 1, title: "Home", href: "/" },
  { id: 2, title: "Packages", href: "/packages" },
  { id: 3, title: "Guides", href: "/guides" },
  { id: 4, title: "Community", href: "/community" },
  { id: 5, title: "About Us", href: "/about-us" },
  { id: 6, title: "Contact Us", href: "/contact-us" },
];

export const adminDashboardData: DashboardMenuItem[] = [
  { id: 1, title: "Overview", href: "/admin/overview", icon: LayoutDashboard },
  { id: 2, title: "Users", href: "/admin/users", icon: Users },
  { id: 3, title: "Packages", href: "/admin/packages", icon: Package },
  { id: 4, title: "Bookings", href: "/admin/bookings", icon: BookOpen },
  { id: 5, title: "Categories", href: "/admin/categories", icon: Map },
  { id: 6, title: "Guide Approvals", href: "/admin/guide-approvals", icon: UserCheck },
  { id: 7, title: "Stories", href: "/admin/stories", icon: FileText },
  { id: 8, title: "Settings", href: "/admin/settings", icon: Settings },
];

export const userDashboardData: DashboardMenuItem[] = [
  { id: 1, title: "Overview", href: "/user/overview", icon: LayoutDashboard },
  { id: 2, title: "My Bookings", href: "/user/bookings", icon: BookOpen },
  { id: 3, title: "Wishlist", href: "/user/wishlist", icon: Heart },
  { id: 4, title: "My Stories", href: "/user/stories", icon: FileText },
  { id: 5, title: "My Reviews", href: "/user/reviews", icon: Star },
  { id: 6, title: "Profile", href: "/user/profile", icon: Settings },
];

export const guideDashboardData: DashboardMenuItem[] = [
  { id: 1, title: "Overview", href: "/guide/overview", icon: LayoutDashboard },
  { id: 2, title: "My Packages", href: "/guide/packages", icon: Package },
  { id: 3, title: "Bookings", href: "/guide/bookings", icon: BookOpen },
  { id: 4, title: "Reviews", href: "/guide/reviews", icon: Star },
  { id: 5, title: "Analytics", href: "/guide/analytics", icon: BarChart3 },
  { id: 6, title: "Profile", href: "/guide/profile", icon: Settings },
];

export const settingsData: DashboardMenuItem[] = [
  { id: 1, title: "Profile", href: "profile", icon: Users },
  { id: 2, title: "Account", href: "account", icon: Settings },
];
