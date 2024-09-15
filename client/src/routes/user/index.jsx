import {Navigate} from "react-router-dom";
import Index from "../../layout/main/index.jsx";

const userRoutes = [
    {
        path: "/user/",
        element: <Index/>,
        children: [
            {
                path: "",
                element: <Navigate replace to="dashboard" />
            },
            {
                path: "dashboard",
                element: <div>User Dashboard</div>
            }
        ]
    }
]

export default userRoutes;