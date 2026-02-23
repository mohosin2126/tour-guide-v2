import { useState } from "react";
import Title from "../title/inex";

const TabButton = ({ label, isActive, onClick, ...props }) => {
    const activeStyle = isActive ? 'bg-[#ff6b00] text-white ' : 'bg-white text-blue-500';
    return (
        <button
            className={`px-4 py-2 rounded-md border dark:border-none [transition:0.5s] hover:bg-[#ff6b00] hover:text-white font-semibold ${activeStyle} `}
            onClick={() => onClick(label)}
        >
            {label}
        </button>
    );
};


export const Tabs = ({ tabTitle, activeTab, setActiveTab, children }) => {
    return (
        <div>
            <div className='flex items-center justify-between gap-5 flex-col md:flex-row'>
                <div>
                    <Title title="Tour Packages" subTitle="Featured Tours" />
                </div>
                <div className="flex flex-wrap gap-3 ">
                    {tabTitle.map((item) => (
                        <TabButton
                            key={item.label}
                            label={item.label}
                            isActive={item.label === activeTab}
                            onClick={() => setActiveTab(item?.label)}
                        />
                    ))}
                </div>
            </div>
            <div>
                {
                    children
                }
            </div>
        </div>
    );
};
