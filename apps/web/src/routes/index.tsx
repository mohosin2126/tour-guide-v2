import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/layout/main";
import ErrorPage from "@/view/error-page";
import HomePage from "@/view/all/home";
import authRoutes from "./auth";
import adminRoutes from "./admin";
import userRoutes from "./user";
import guideRoutes from "./guide";
import Community from "@/view/all/community";
import StoryDetails from "@/view/all/community/details";
import ContactUs from "@/view/all/contact-us";
import AboutUsPage from "@/view/all/about-us";
import Packages from "@/view/all/packages";
import PackageDetails from "@/view/all/packages/details";
import Guides from "@/view/all/guides";
import GuideProfile from "@/view/all/guides/profile";

const routes = [
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "packages", element: <Packages /> },
      { path: "packages/:id", element: <PackageDetails /> },
      { path: "guides", element: <Guides /> },
      { path: "guides/:id", element: <GuideProfile /> },
      { path: "community", element: <Community /> },
      { path: "community/:id", element: <StoryDetails /> },
      { path: "contact-us", element: <ContactUs /> },
      { path: "about-us", element: <AboutUsPage /> },
    ],
  },
  ...authRoutes,
  ...adminRoutes,
  ...userRoutes,
  ...guideRoutes,
  { path: "*", element: <ErrorPage /> },
];

const router = createBrowserRouter(routes);

export default router;
