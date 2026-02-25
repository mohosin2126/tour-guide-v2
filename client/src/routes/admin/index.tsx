import { Navigate } from "react-router-dom";
import DashboardLayout from "@/layout/dashboard";
import ProtectedRoute from "@/components/common/protected-route";
import AdminOverview from "@/view/admin/overview";
import AdminUsers from "@/view/admin/users";
import AdminPackages from "@/view/admin/packages";
import AdminBookings from "@/view/admin/bookings";
import AdminCategories from "@/view/admin/categories";
import AdminGuideApprovals from "@/view/admin/guide-approvals";
import AdminStories from "@/view/admin/stories";
import AdminSettings from "@/view/admin/settings";

const adminRoutes = [
  {
    path: "/admin/",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "", element: <Navigate replace to="overview" /> },
      { path: "overview", element: <AdminOverview /> },
      { path: "users", element: <AdminUsers /> },
      { path: "packages", element: <AdminPackages /> },
      { path: "bookings", element: <AdminBookings /> },
      { path: "categories", element: <AdminCategories /> },
      { path: "guide-approvals", element: <AdminGuideApprovals /> },
      { path: "stories", element: <AdminStories /> },
      { path: "settings", element: <AdminSettings /> },
    ],
  },
];

export default adminRoutes;
