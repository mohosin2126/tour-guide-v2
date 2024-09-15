import { Navigate } from "react-router-dom";
import DashbaordLayout from "../../layout/dashboard/index.jsx";

const adminRoutes = [
    {
        path: "/admin/",
        element: <DashbaordLayout/>,
        children: [
            {
                path: "",
                element: <Navigate replace to="dashboard" />
            },
            {
                path: "dashboard",
                element: <div>Dashboard</div>
            }
        ]
    }
]

export default adminRoutes;