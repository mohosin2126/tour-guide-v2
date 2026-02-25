interface TitleProps {
  title: string;
  subTitle: string;
  className?: string;
}

export default function Title({ title, subTitle, className }: TitleProps) {
  return (
    <div className={`my-12 ${className}`}>
      <span className="seaweed-script block text-[2rem] text-[#FFC42E]">{title}</span>
      <h1 className="font-bold leading-normal text-black dark:text-white md:text-[1.3rem] lg:text-[2.9rem]">
        {subTitle}
      </h1>
    </div>
  );
}
