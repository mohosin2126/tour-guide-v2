import { Navigate } from "react-router-dom";
import DashboardLayout from "@/layout/dashboard";
import ProtectedRoute from "@/components/common/protected-route";
import UserOverview from "@/view/user/overview";
import UserBookings from "@/view/user/bookings";
import UserWishlist from "@/view/user/wishlist";
import UserStories from "@/view/user/stories";
import UserReviews from "@/view/user/reviews";
import UserProfile from "@/view/user/profile";

const userRoutes = [
  {
    path: "/user/",
    element: (
      <ProtectedRoute allowedRoles={["user"]}>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "", element: <Navigate replace to="overview" /> },
      { path: "overview", element: <UserOverview /> },
      { path: "bookings", element: <UserBookings /> },
      { path: "wishlist", element: <UserWishlist /> },
      { path: "stories", element: <UserStories /> },
      { path: "reviews", element: <UserReviews /> },
      { path: "profile", element: <UserProfile /> },
    ],
  },
];

export default userRoutes;
