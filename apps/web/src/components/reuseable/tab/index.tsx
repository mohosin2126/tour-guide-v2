import type { ReactNode } from "react";
import Title from "@/components/reuseable/title";
import type { TabItem } from "@/types";

interface TabButtonProps {
  label: string;
  isActive: boolean;
  onClick: (label: string) => void;
}

function TabButton({ label, isActive, onClick }: TabButtonProps) {
  const activeStyle = isActive ? "bg-[#ff6b00] text-white" : "bg-white text-blue-500";
  return (
    <button
      className={`rounded-md border px-4 py-2 font-semibold transition-colors duration-500 hover:bg-[#ff6b00] hover:text-white dark:border-none ${activeStyle}`}
      onClick={() => onClick(label)}
    >
      {label}
    </button>
  );
}

interface TabsProps {
  tabTitle: TabItem[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  children: ReactNode;
}

export function Tabs({ tabTitle, activeTab, setActiveTab, children }: TabsProps) {
  return (
    <div>
      <div className="flex flex-col items-center justify-between gap-5 md:flex-row">
        <div>
          <Title title="Tour Packages" subTitle="Featured Tours" />
        </div>
        <div className="flex flex-wrap gap-3">
          {tabTitle.map((item) => (
            <TabButton
              key={item.label}
              label={item.label}
              isActive={item.label === activeTab}
              onClick={() => setActiveTab(item.label)}
            />
          ))}
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
}
