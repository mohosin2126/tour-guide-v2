import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";

export default function MainLayout() {
  useEffect(() => {
    const html = document.documentElement;
    html.classList.remove("light");
    html.classList.add("dark");

    return () => {
      const saved = localStorage.getItem("mode");
      if (saved === "light") {
        html.classList.remove("dark");
        html.classList.add("light");
      }
    };
  }, []);

  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
