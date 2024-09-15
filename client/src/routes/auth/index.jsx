import { Navigate } from "react-router-dom";
import Index from '../../layout/main/index.jsx';
import Login from './../../Pages/Login/Login';
import Register from "../../Pages/SignUp/SignUp";
// import ForgotPassword from '../../Pages/';

const authRoutes = [
    {
        path: "/auth/",
        element: <Index/>,
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
                element: <Register/>
            },
            // {
            //     path: "forgot-password",
            //     element: <ForgotPassword/>
            // }
        ]
    }
]

export default authRoutes;