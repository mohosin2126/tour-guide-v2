import { createBrowserRouter} from "react-router-dom";
import MainLayout from "../layout/main/index.jsx";
import Index from "../view/error-page/index.jsx";
import HomePage from "../view/all/home/index.jsx";
import authRoutes from "./auth/index.jsx";
import adminRoutes from './admin/index';
import userRoutes from './user/index';
import Community from "../view/all/community/index.jsx";
import ContactUs from './../view/all/contact-us/index';
import AboutUsPage from "../view/all/about-us/index.jsx";
import BlogPage from "../view/all/blog/index.jsx";
import BlogDetails from "../view/all/blog/details/index.jsx";


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
            {
                path: "community",
                element: <Community />
            },
            {
                path: "contact-us",
                element: <ContactUs />
            },
            {
                path: "about-us",
                element: <AboutUsPage/>
            },
            {
                path: "blogs",
                element: <BlogPage />
            },
            {
                path: "blog/:id",
                element: <BlogDetails />
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
