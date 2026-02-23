import { useState } from "react";
import { RiMenu3Line } from "react-icons/ri";
import { dashboardData } from "../../data/menu-items/index.jsx";
import AccordionMenu from "../../components/link-accordion/index.jsx";
import AccordionMenuLink from "../../components/menu-accordion/index.jsx";
import { Outlet } from "react-router-dom";
import useThemeMode from "../../hooks/use-theme/index.js";
import Logo from "../../Components/shared/logo/index.jsx";
import { MdOutlineDarkMode } from "react-icons/md";
import { BsSun } from "react-icons/bs";


const Index = () => {
    const [isActive, setIsActive] = useState(false);
    const [openAccordion, setOpenAccordion] = useState(null);
    const { changeTheme, mode } = useThemeMode();
    const handleToggleLeft = () => {
        setIsActive(!isActive);
    };

    const handleToggle = (id) => {
        setOpenAccordion(openAccordion === id ? null : id);
    };
    return (
        <div>
            <div className="relative">
                {/* Sidebar */}
                <div
                    className={` z-50 fixed dark:bg-[#0c0d2c] bg-white dark:text-[#ffffff] shadow-xl overflow-y-auto min-h-screen inset-y-0 left-0 transform 
                    ${isActive ? "w-64 transition-all duration-200 translate-x-0" : "w-64 transition-all duration-200 -translate-x-full lg:translate-x-0"}`}
                >
                    {/* logo  */}
                    <div className="common-flex flex-col gap-1 w-full shadow py-3 dark:border-b dark:border-gray-800">
                        <Logo />
                    </div>
                    {/* all menu link are here map or called  */}
                    <div className="common-flex flex-col
                     gap-1 mt-7">
                        {dashboardData.map((item) => (
                            item?.subMenu ? (
                                <AccordionMenu
                                    key={item?.id}
                                    icon={item?.icon}
                                    title={item?.title}
                                    isOpen={openAccordion === item?.id}
                                    onToggle={() => handleToggle(item?.id)}
                                >
                                    {item?.subMenu.map((subItem, index) => (
                                        <AccordionMenuLink
                                            key={index}
                                            pathName={subItem?.href}
                                            linkTitle={subItem?.title}
                                            handleClick={handleToggleLeft}
                                        />
                                    ))}
                                </AccordionMenu>
                            ) : (
                                <AccordionMenuLink
                                    key={item?.id}
                                    pathName={item?.href}
                                    linkTitle={item?.title}
                                    icon={item?.icon}
                                    handleClick={handleToggleLeft}
                                />
                            )
                        ))}
                    </div>
                </div>

                {/* Top navbar */}
                <div className="z-30 fixed top-0 bg-white shadow dark:bg-[#0c0d2c] text-white right-0 flex items-center !justify-between h-16 w-full lg:w-[calc(100%-256px)] px-5">
                    <div className="flex items-center">
                        <button className="text-black dark:text-gray-300 cursor-pointer p-2 block lg:hidden rounded-md" onClick={handleToggleLeft}>
                            <RiMenu3Line className="text-3xl" />
                        </button>
                    </div>
                    <div className="common-flex !justify-end ">
                        <button onClick={changeTheme} className="bg-transparent btn-sm dark:text-white text-gray-800 hover:text-blue-500 transition mr-5 flex items-center justify-center">
                            {
                                mode === "dark" ?
                                    <BsSun size={28} /> :
                                    <MdOutlineDarkMode size={28} />
                            }
                        </button>
                        <div className="dark:text-white text-black">User Profile</div>
                    </div>
                </div>
            </div>
            {/* Main Content */}
            <div onClick={() => setIsActive(false)} className="pt-[5rem] bg-blue-50 text-black dark:bg-gray-900 dark:text-white min-h-screen h-auto w-full lg:w-[calc(100%-256px)] overflow-x-hidden float-right transition-all duration-200 p-5">
                <Outlet />
            </div>
        </div>
    );
};

export default Index;
