import { createBrowserRouter} from "react-router-dom";
import MainLayout from "../layout/main/index.jsx";
import Index from "../view/error-page/index.jsx";
import HomePage from "../view/all/home/index.jsx";
import authRoutes from "./auth/index.jsx";
import adminRoutes from './admin/index';
import userRoutes from './user/index';


const routes = [

    // common home page route 
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <Index />,
        children: [
            {
                path: "/",
                element: <HomePage />
            },
        ]
    },
    {
        path: "*",
        element: <Index />
    },
    ...authRoutes,
    ...adminRoutes,
    ...userRoutes,
]

const router = createBrowserRouter(
    routes
);

export default router;
