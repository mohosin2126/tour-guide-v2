import type { IconType } from "react-icons";

interface ChooseCardProps {
  img?: string;
  icon?: IconType;
  title?: string;
  desc?: string;
}

export default function ChooseCard({ img = "", icon: Icon, title = "", desc = "" }: ChooseCardProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-5 rounded p-5 text-center shadow-lg">
      <div className="mx-auto flex h-14 w-14 items-center justify-center">
        {img && (
          <img
            src="https://i.ibb.co.com/H2xjXhN/blog1.gif"
            alt="choose-image"
            className="h-full w-full"
          />
        )}
        {Icon && <Icon size={64} color="rgb(226 32 75)" />}
      </div>
      <h1 className="cursor-pointer text-xl font-bold text-black transition-colors duration-500 hover:text-rose-600 dark:text-white">
        {title}
      </h1>
      <p className="text-lg text-gray-700 dark:text-gray-400">{desc}</p>
    </div>
  );
}
