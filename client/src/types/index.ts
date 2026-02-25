import type { LucideIcon } from "lucide-react";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "guide" | "user";
  photo?: string;
  phone?: string;
  address?: string;
  bio?: string;
  location?: string;
  specialties?: string[];
  createdAt?: string;
  updatedAt?: string;
  [key: string]: unknown;
}

export interface TourPackage {
  _id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  duration: string;
  maxGroupSize: number;
  images: string[];
  coverImage?: string;
  category?: string | Category;
  guide?: string | User;
  location?: string;
  difficulty?: "easy" | "medium" | "hard";
  highlights?: string[];
  includes?: string[];
  rating?: number;
  totalReviews?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Booking {
  _id: string;
  package: string | TourPackage;
  user: string | User;
  guide?: string | User;
  email: string;
  date: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  totalPrice: number;
  groupSize: number;
  specialRequests?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Category {
  _id: string;
  name: string;
  image?: string;
  description?: string;
  count?: number;
  createdAt?: string;
}

export interface Story {
  _id: string;
  title: string;
  content: string;
  images?: string[];
  author: string | User;
  likes?: string[];
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Review {
  _id: string;
  rating: number;
  comment: string;
  user: string | User;
  guide?: string | User;
  package?: string | TourPackage;
  createdAt?: string;
}

export interface Comment {
  _id: string;
  text: string;
  author: string | User;
  storyId: string;
  createdAt?: string;
}

export interface WishlistItem {
  _id: string;
  email: string;
  packageId: string | TourPackage;
  createdAt?: string;
}

export interface MenuItem {
  id: number;
  title: string;
  href: string;
  subMenu?: MenuItem[];
}

export interface DashboardMenuItem {
  id: number;
  title: string;
  href: string;
  icon: LucideIcon;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  register: (userData: RegisterInput) => Promise<AuthResult>;
  login: (email: string, password: string) => Promise<AuthResult>;
  logout: () => void;
  updateUser: (updatedUser: User) => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isGuide: boolean;
  isUser: boolean;
}

export interface ThemeContextType {
  mode: "light" | "dark";
  changeTheme: () => void;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
  role?: string;
  photo?: string;
  phone?: string;
}

export interface AuthResult {
  success: boolean;
  user?: User;
  error?: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success?: boolean;
}

export interface PackageFilters {
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  duration?: string;
  difficulty?: string;
  search?: string;
  sort?: string;
  page?: string;
  limit?: string;
  [key: string]: string | undefined;
}

export interface TourCardData {
  image: string;
  country: string;
  title: string;
  price: { current: number; original: number };
  days: string;
  people: string;
  link: string;
  rating: number;
}

export interface TabItem {
  label: string;
}
