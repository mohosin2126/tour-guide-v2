import { Navigate } from "react-router-dom";
import MainLayout from "@/layout/main";
import Login from "@/view/auth/login";
import SignUp from "@/view/auth/signup";

const authRoutes = [
  {
    path: "/auth/",
    element: <MainLayout />,
    children: [
      { path: "", element: <Navigate replace to="login" /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <SignUp /> },
    ],
  },
];

export default authRoutes;
