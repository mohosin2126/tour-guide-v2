import { Navigate } from "react-router-dom";
import DashboardLayout from "@/layout/dashboard";
import ProtectedRoute from "@/components/common/protected-route";
import GuideOverview from "@/view/guide/overview";
import GuidePackages from "@/view/guide/packages";
import GuideBookings from "@/view/guide/bookings";
import GuideReviews from "@/view/guide/reviews";
import GuideAnalytics from "@/view/guide/analytics";
import GuideProfile from "@/view/guide/profile";

const guideRoutes = [
  {
    path: "/guide/",
    element: (
      <ProtectedRoute allowedRoles={["guide"]}>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "", element: <Navigate replace to="overview" /> },
      { path: "overview", element: <GuideOverview /> },
      { path: "packages", element: <GuidePackages /> },
      { path: "bookings", element: <GuideBookings /> },
      { path: "reviews", element: <GuideReviews /> },
      { path: "analytics", element: <GuideAnalytics /> },
      { path: "profile", element: <GuideProfile /> },
    ],
  },
];

export default guideRoutes;
