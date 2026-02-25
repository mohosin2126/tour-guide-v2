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
  { id: 1, title: "Overview", href: "/admin/overview", icon: LayoutDashboard, section: "Main" },
  { id: 2, title: "Users", href: "/admin/users", icon: Users, section: "Management" },
  { id: 3, title: "Packages", href: "/admin/packages", icon: Package, section: "Management" },
  { id: 4, title: "Bookings", href: "/admin/bookings", icon: BookOpen, section: "Management" },
  { id: 5, title: "Categories", href: "/admin/categories", icon: Map, section: "Management" },
  { id: 6, title: "Guide Approvals", href: "/admin/guide-approvals", icon: UserCheck, section: "Management" },
  { id: 7, title: "Stories", href: "/admin/stories", icon: FileText, section: "Content" },
  { id: 8, title: "Settings", href: "/admin/settings", icon: Settings, section: "Content" },
];

export const userDashboardData: DashboardMenuItem[] = [
  { id: 1, title: "Overview", href: "/user/overview", icon: LayoutDashboard, section: "Main" },
  { id: 2, title: "My Bookings", href: "/user/bookings", icon: BookOpen, section: "Activity" },
  { id: 3, title: "Wishlist", href: "/user/wishlist", icon: Heart, section: "Activity" },
  { id: 4, title: "My Stories", href: "/user/stories", icon: FileText, section: "Community" },
  { id: 5, title: "My Reviews", href: "/user/reviews", icon: Star, section: "Community" },
  { id: 6, title: "Profile", href: "/user/profile", icon: Settings, section: "Community" },
];

export const guideDashboardData: DashboardMenuItem[] = [
  { id: 1, title: "Overview", href: "/guide/overview", icon: LayoutDashboard, section: "Main" },
  { id: 2, title: "My Packages", href: "/guide/packages", icon: Package, section: "Business" },
  { id: 3, title: "Bookings", href: "/guide/bookings", icon: BookOpen, section: "Business" },
  { id: 4, title: "Reviews", href: "/guide/reviews", icon: Star, section: "Insights" },
  { id: 5, title: "Analytics", href: "/guide/analytics", icon: BarChart3, section: "Insights" },
  { id: 6, title: "Profile", href: "/guide/profile", icon: Settings, section: "Insights" },
];

export const settingsData: DashboardMenuItem[] = [
  { id: 1, title: "Profile", href: "profile", icon: Users },
  { id: 2, title: "Account", href: "account", icon: Settings },
];
