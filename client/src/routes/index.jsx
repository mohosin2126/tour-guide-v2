import { createBrowserRouter} from "react-router-dom";
import MainLayout from "../layout/main/index.jsx";
import ErrorPage from "../view/ErrorPage/ErrorPage.jsx";
import HomePage from "../view/all/home/index.jsx";


const routes = [

    // common home page route 
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <HomePage />
            },
        ]
    },
    {
        path: "*",
        element: <ErrorPage />
    },
]

const router = createBrowserRouter(
    routes
);

export default router;