import { useEffect, useRef, useState } from "react";
import Logo from "../logo/index.jsx";
import UserProfile from "../user-profile/index.jsx";
import { menuData } from "../../../data/menu-items/index.jsx";
import { NavLink } from "react-router-dom";
import useThemeMode from "../../../hooks/use-theme/index.js";
import { MdOutlineDarkMode } from "react-icons/md";
import { BsSun } from "react-icons/bs";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const headerRef = useRef(null);
  const { changeTheme, mode } = useThemeMode();


  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Function to render the menu options including submenus
  const renderMenuOptions = (menuItems, closeDrawer) => {
    return menuItems.map((item, index) => (
      <>

        <div key={index} className="relative group font-semibold capitalize text-lg">
          {/* Main NavLink */}
          {
            item?.subMenu ?
              <div className="flex items-center justify-start gap-2 cursor-pointer group relative">
                <a className={`menu-hover  font-semibold capitalize text-lg  ${isScrolled ? 'text-black dark:text-white' : 'text-white'}`}>
                  Services
                </a>
                <span className={`${isScrolled ? 'text-black dark:text-white' : 'text-white'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                    stroke="currentColor" className="h-6 w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </span>
              </div>

              :
              <NavLink
                onClick={() => setDrawerOpen(false)}
                to={item.href}
                className={({ isActive }) =>
                  isActive ? "text-rose-600" : ""
                }
              >
                {item?.title}
              </NavLink>
          }

          {/* Sub-menu dropdown (if any) */}
          {item.subMenu && (
            <div className="absolute group-hover:block mt-6 rounded  dropdown-content z-50 flex  flex-col bg-gray-100  px-4 text-gray-800 shadow-xl transition-all duration-500 ease-in-out max-h-0 overflow-hidden group-hover:max-h-96 w-52">
              <div className="flex flex-col items-center gap-1 w-full [transition:0.5s] ">
                {item.subMenu.map((subItem, index) => (
                  <NavLink
                    key={index}
                    onClick={() => setDrawerOpen(false)}
                    to={subItem.href}
                    className={({ isActive }) =>
                      isActive ? "text-rose-600" : "my-2 block border-b border-gray-100 py-1 font-semibold text-gray-500 hover:text-black md:mx-2"
                    }
                  >
                    {subItem.title}
                  </NavLink>
                ))}
              </div>
            </div>
          )}
        </div>
      </>


    ));
  };

  return (
    <div
      ref={headerRef}
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${isScrolled ? "dark:bg-black/65 bg-white shadow-lg bg-opacity-80 backdrop-blur-md text-black dark:text-white" : "text-white bg-transparent"
        }`}
    >
      <div className="navbar custom-container items-center justify-between md:justify-between md:gap-80 h-20 gap-36">
        {/* Logo */}
        <div className="navbar-start">
          <Logo />
        </div>

        {/* Large screen menu */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-4">
            {renderMenuOptions(menuData, () => { })}
          </ul>
         
        </div>

        <div className="navbar-end">
          {/* Small screen drawer toggle button */}
          <div className="lg:hidden  flex items-center gap-3">
            <button
              className=""
              onClick={() => setDrawerOpen(!drawerOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </button>
          </div>
          {/* User dropdown */}
          <div className="flex items-center">
            <button onClick={changeTheme} className="bg-transparent btn-sm hover:text-blue-500 transition mr-5 flex items-center justify-center">
              {
                mode === "dark" ?
                  <BsSun className="text-black dark:text-white" size={28} /> :
                  <MdOutlineDarkMode className="text-black dark:text-white" size={28} />
              }
            </button>
            <UserProfile />
          </div>
        </div>
      </div>

      {/* Drawer for small screens */}
      <div
        className={`fixed h-screen inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${drawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => setDrawerOpen(false)}
      >
        <div className={`fixed top-0 right-0 h-screen w-64 bg-gray-700  backdrop-blur-md shadow-lg transition-transform duration-300 transform ${drawerOpen ? "translate-x-0" : "translate-x-full"}`}>
          <button
            className="btn btn-ghost absolute top-2 right-2 z-20"
            onClick={() => setDrawerOpen(false)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <ul className="menu p-4 space-y-2">
            {renderMenuOptions(menuData)}
          </ul>
        </div>
      </div>
    </div>
  );
}
