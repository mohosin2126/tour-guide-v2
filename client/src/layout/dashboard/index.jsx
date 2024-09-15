import { useState } from "react";
import { RiMenu3Line } from "react-icons/ri";
import { dashboardData } from "../../data/menu-items/index.jsx";
import AccordionMenu from "../../components/link-accordion/index.jsx";
import AccordionMenuLink from "../../components/menu-accordion/index.jsx";
import Logo from "../../components/shared/logo/index.jsx";


const Index = () => {
    const [isActive, setIsActive] = useState(false);

    const handleToggleLeft = () => {
        setIsActive(!isActive);
    };

    const [openAccordion, setOpenAccordion] = useState(null);
    const handleToggle = (id) => {
        setOpenAccordion(openAccordion === id ? null : id);
    };
    return (
        <div>
            <div className="relative">
                {/* Sidebar */}
                <div
                    className={` z-50 fixed bg-[#0c0d2c] text-[#ffffff] shadow-xl overflow-y-auto min-h-screen inset-y-0 left-0 transform 
                    ${isActive ? "w-64 transition-all duration-200 translate-x-0" : "w-64 transition-all duration-200 -translate-x-full lg:translate-x-0"}`}
                >
                    {/* logo  */}
                    <div className="common-flex flex-col gap-1 w-full border-b border-b-gray-500 py-3">
                        <Logo />
                    </div>
                    <div className="common-flex flex-col
                     gap-1">
                        {/* <AccordionMenu
                            icon={FaFacebookF}
                            title="Reports"
                            isOpen={openAccordion === 0}
                            onToggle={() => handleToggle(0)}
                        >
                            <AccordionMenuLink pathName="/admin/reports/performance" linkTitle="Performance" />
                            <AccordionMenuLink pathName="/admin/reports/conversion" linkTitle="Conversion" />
                            <AccordionMenuLink pathName="/admin/reports/conversion-logs" linkTitle="Conversion Logs" />
                            <AccordionMenuLink pathName="/admin/reports/click-logs" linkTitle="Click Logs" />
                        </AccordionMenu> */}
                        {dashboardData.map((item) => (
                            item?.subMenu ? (
                                <AccordionMenu
                                    key={item?.id}
                                    icon={item?.icon} // You can map this to a specific icon if needed
                                    title={item?.title}
                                    isOpen={openAccordion === item?.id}
                                    onToggle={() => handleToggle(item?.id)}
                                >
                                    {item?.subMenu.map((subItem, index) => (
                                        <AccordionMenuLink
                                            key={index}
                                            pathName={subItem?.href}
                                            linkTitle={subItem?.title}
                                        />
                                    ))}
                                </AccordionMenu>
                            ) : (
                                <AccordionMenuLink
                                    pathName={item?.href}
                                    linkTitle={item?.title}
                                    icon={item?.icon}
                                />
                            )
                        ))}
                    </div>
                    <div>

                    </div>
                </div>

                {/* Top navbar */}
                <div className="z-30 fixed top-0 bg-green-800 text-white right-0 flex items-center justify-between h-16 w-full lg:w-[calc(100%-256px)] px-5 shadow">
                    <div className="flex items-center">
                        <button className="text-gray-300 cursor-pointer p-2 block lg:hidden rounded-md" onClick={handleToggleLeft}>
                            <RiMenu3Line className="text-3xl" />
                        </button>
                    </div>
                    <div>User Profile</div>
                </div>
            </div>

            {/* Main Content */}
            <div onClick={() => setIsActive(false)} className="pt-[5rem] w-full lg:w-[calc(100%-256px)] float-right shadow transition-all duration-200 p-5">
                <Outlet />
            </div>
        </div>
    );
};

export default Index;
