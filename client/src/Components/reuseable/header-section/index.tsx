import type { ReactNode } from "react";

interface HeaderSectionProps {
  headerImage: string;
  children: ReactNode;
}

export default function HeaderSection({ headerImage, children }: HeaderSectionProps) {
  return (
    <div
      className="relative w-full bg-cover bg-center px-5 py-10 md:h-[60vh] md:p-0"
      style={{ backgroundImage: `url(${headerImage})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      {children}
    </div>
  );
}
