import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import AccordionMenuLink from "../../components/menu-accordion";
import { settingsData } from "../../data/menu-items";


export default function SettingLayout() {
    const [isActive,setIsActive] = useState(false)
    const handleToggleLeft = () => {
        setIsActive(!isActive);
    };

    return (
        <div>
            <Link to={''}>
                <span className="text-black text-xl font-bold dark:text-white ">Dashboar / settings/ Profile</span>
            </Link>
            <div className="flex flex-col lg:flex-row gap-10">
                <div
                    className="mt-6 dark:bg-[#0c0d2c] bg-white dark:text-[#ffffff] shadow-xl overflow-y-auto w-max p-3 inset-y-0 left-0 transform lg:w-64 transition-all duration-200 "
                >
                    {/* all menu link are here map or called  */}
                    <div className="common-flex flex-wrap lg:flex-col
                     gap-1">
                        {settingsData.map((item) => (

                            <AccordionMenuLink
                                key={item?.id}
                                pathName={item?.href}
                                linkTitle={item?.title}
                                icon={item?.icon}
                                handleClick={handleToggleLeft}
                            />
                        )
                        )}
                    </div>
                </div>
                {/* Main Content */}
                <div className="w-full mt-6"
                >
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
