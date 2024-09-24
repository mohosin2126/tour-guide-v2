import { Navigate } from "react-router-dom";
import MainLayout from "../../layout/main/index.jsx";
import Login from "../../view/auth/login/index.jsx";
import SignUp from "../../view/auth/signup/index.jsx";
// import ForgotPassword from '../../Pages/';

const authRoutes = [
    {
        path: "/auth/",
        element: <MainLayout/>,
        children: [
            {
                path: "",
                element: <Navigate replace to="login" />
            },
            {
                path: "login",
                element: <Login/>
            },
            {
                path: "register",
                element:<SignUp />
            },
            // {
            //     path: "forgot-password",
            //     element: <ForgotPassword/>
            // }
        ]
    }
]

export default authRoutes;