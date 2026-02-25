import { FaArrowRightLong } from "react-icons/fa6";

interface SubscribeFormProps {
  className?: string;
}

export default function SubscribeForm({ className }: SubscribeFormProps) {
  return (
    <form className={`flex flex-col items-center gap-2 md:flex-row ${className}`}>
      <input
        type="email"
        required
        placeholder="Email Address*"
        className="w-full rounded-md border bg-card p-3 text-card-foreground outline-none focus:border-[1px] focus:border-amber-500 lg:w-1/2"
      />
      <button className="group relative flex h-[50px] w-full items-center justify-center gap-2 overflow-hidden border border-primary bg-card px-8 text-lg font-semibold text-primary shadow-2xl transition-all before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:duration-500 after:absolute after:right-0 after:top-0 after:h-full after:w-0 after:duration-500 hover:text-primary-foreground hover:shadow-primary hover:before:w-2/4 hover:before:bg-primary hover:after:w-2/4 hover:after:bg-primary sm:w-auto">
        <span className="relative z-10">Subscribe</span>
        <span>
          <FaArrowRightLong size={22} />
        </span>
      </button>
    </form>
  );
}
