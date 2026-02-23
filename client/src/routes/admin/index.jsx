import { Navigate } from "react-router-dom";
import DashbaordLayout from "../../layout/dashboard/index.jsx";
import Dashboard from "../../view/admin/dashboard/index.jsx";
import Overview from "../../view/admin/overview/index.jsx";
import Users from "../../view/admin/users/index.jsx";
import Performance from "../../view/admin/reports/performance/index.jsx";
import Conversion from "../../view/admin/reports/conversion/index.jsx";
import ConversionLogs from "../../view/admin/reports/conversion-logs/index.jsx";
import ClickLogs from "../../view/admin/reports/click-logs/index.jsx";
import HeplAndSupport from "../../view/admin/help-and-support/index.jsx";
import ProfileSettings from "../../view/admin/settings/profile-settings/index.jsx";
import Security from "../../view/admin/settings/security/index.jsx";
import Notifications from "../../view/admin/settings/notifications/index.jsx";
import Settings from "../../view/admin/settings/index.jsx";

const adminRoutes = [
    {
        path: "/admin/",
        element: <DashbaordLayout />,
        children: [
            {
                path: "",
                element: <Navigate replace to="dashboard" />
            },
            {
                path: "dashboard",
                element: <Dashboard />
            },
            {
                path: "Overview",
                element: <Overview />
            },
            {
                path: "users",
                element: <Users />
            },
            {
                path: "reports/",
                element: "",
                children: [
                    {
                        path: "performance",
                        element: <Performance />
                    },
                    {
                        path: "conversion",
                        element: <Conversion />
                    },
                    {
                        path: "conversion-logs",
                        element: <ConversionLogs />
                    },
                    {
                        path: "click-logs",
                        element: <ClickLogs />
                    },
                ]
            },
            {
                path: "settings",
                element: <Settings />,
                    children: [
                    {
                       index: true,
                        element:  <div>ProfileSettings</div>
                    },
                    {
                        path: "profile",
                        element: <ProfileSettings />
                    },
                    {
                        path: "security",
                        element: <Security />
                    },
                    {
                        path: "notifications",
                        element: <Notifications />
                    },
                ]
            },
            // {
            //     path: "settings/",
            //     element:"",
            
            // },
            {
                path: "help",
                element: <HeplAndSupport />
            },
        ]
    }
]

export default adminRoutes;