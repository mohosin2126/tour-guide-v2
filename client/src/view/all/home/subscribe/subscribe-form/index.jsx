import { FaArrowRightLong } from 'react-icons/fa6'

export default function SubscribeForm({className}) {
    return (
        <form className={`flex items-center flex-col md:flex-row gap-2 ${className}`}>
            <input
                type="email"
                name=""
                required
                placeholder='Email Address*'
                className='p-3 bg-white w-full lg:w-1/2 text-black rounded-md outline-none border focus:border-[1px] focus:border-amber-500'
            />
            <button
                className="relative flex items-center justify-center gap-2 w-full sm:w-auto h-[50px] px-8 overflow-hidden border border-red-400 bg-white text-red-400 shadow-2xl transition-all before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:duration-500 after:absolute after:right-0 after:top-0 after:h-full after:w-0 after:duration-500 hover:text-white hover:shadow-red-400 hover:before:w-2/4 hover:before:bg-red-400 hover:after:w-2/4 group text-lg font-semibold hover:after:bg-red-400"
            >
                <span className="relative z-10">Subscribe</span>
                <span><FaArrowRightLong size={22} /></span>
            </button>
        </form>
    )
}
