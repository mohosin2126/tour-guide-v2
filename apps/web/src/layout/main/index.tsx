import { Outlet } from "react-router-dom";
import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";

export default function MainLayout() {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
