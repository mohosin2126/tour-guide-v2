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
            },
            {
                path: "Overview",
                element: <div>Overview</div>
            },
            {
                path: "users",
                element: <div>Users</div>
            },
            {
                path: "reports/performance",
                element: <div>reports section</div>
            },
        ]
    }
]

export default adminRoutes;