import Navbar from "../../components/shared/navbar/index.jsx";
import Footer from "../../components/shared/footer/index.jsx";
import {Outlet} from "react-router-dom";


export default function MainLayout() {
    return (
        <div>
            <Navbar/>
            <Outlet/>
            <Footer/>
        </div>
    );
}

