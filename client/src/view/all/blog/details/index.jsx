import { Link } from "react-router-dom"
import headerImage from "../../../../../public/image/blog-header.jpg"
import HeaderSection from '../../../../Components/reuseable/header-section'
import { RiDoubleQuotesL } from "react-icons/ri";
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { useForm } from "react-hook-form";
import Input from "../../../../Components/reuseable/input";
import Textarea from "../../../../Components/reuseable/text-area";
import { GoSearch } from "react-icons/go";
import { MdOutlineDateRange, MdOutlineKeyboardArrowRight } from "react-icons/md";



export default function BlogDetails() {
    const { register, handleSubmit, watch, formState: { errors }, } = useForm();

    const onSubmit = (data) => {
        console.log(data)
    }

    const handleSearch = (data) => {
        console.log(data)
    }

    const tags = ["activities", "certificate", "city", "depertment"];


    return (
        <section>
            <HeaderSection headerImage={headerImage}>
                <div className="relative flex justify-center items-center text-center flex-col gap-1 h-full text-white w-full lg:w-9/12 mx-auto">
                    <h1 className="text-[1.5rem] md:text-[2.8rem] lg:text-[4rem] font-bold text-white">Booking travel during Corona: Find who are giving service</h1>
                    <h3 className="text-[1.6rem] font-bold seaweed-script"><Link to="/"><span className="text-[#ffc437] [transition:0.5s] hover:text-[#ff6b00]">Home</span></Link> - <span>Booking travel during Corona: Find who are giving service</span></h3>
                </div>
            </HeaderSection>
            <div className="custom-container mt-20">
                <div className="grid grid-cols-8 gap-5">
                    {/* left side section  */}
                    <div className="col-span-8 lg:col-span-6">
                        <div className="w-full h-52 lg:h-[510px] mb-5">
                            <img src={headerImage} alt="header-image" className="w-full h-full" />
                        </div>
                        {/* details  */}
                        <div>
                            <h4 className="rounded-md px-2 py-1 w-max border-[1px] border-[#ffb24e] bg-gray-500 text-[#ffb24e] text-lg font-normal mt-6">Blog Travel</h4>
                            <article className="space-y-6 mt-6">
                                <p>
                                    Eternity bands dolor sit amet consectetur. Ut parturient aliquam. Mauris felis purus morbi facilisis. Lorem ipsumoi dolor sit amet consectetur adipiscing elit eiusmod tempor incididunt labore etore dolore magnanis aliqua.bands needs no occasion to be gifted and can be given as gifts whenever onewishes to. Eternity bands are also known as the wedding bands. The circular loop of diamonds signifies eternal and morer unending love.
                                </p>
                                <p>
                                    This sentiment is what makes the eternity band a perfect gift for couples on special occasions, such as anniries, childbirth or anything that makes a difference to their life.dolor sit and amet consectetur ander adipiscing elites eiusmod tempor incididunt labore et dolore magna aliqua. Bands needs no occasion too be gifted and can been given as gifts whenever onewishes to. Eternity bands are also known as the wedding bands. The circular looper of diamonds signifies eternal and unending love.
                                </p>
                                <div className="bg-gray-700 !text-black p-6 relative z-20">
                                    <span className="absolute top-5 -z-10">
                                        <RiDoubleQuotesL size={60} color="#ff6b00" />
                                    </span>
                                    <p className="text-lg font-thin">Have you been monitoring how the self-driving car industry has been attempt to shape the regulatory around their vehicles?</p>
                                    <h2 className="text-xl font-bold mt-3">Brooklyn Simmons</h2>
                                </div>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur. Ut parturient aliquam. Mauris felis purus morbi facilisis. Lorem ipsumoi dolor sit amet consectetur adipiscing elit eiusmod tempor incididunt labore etore dolore magnanis aliqua.bands needs no occasion to be gifted and can be given as gifts whenever onewishes to. Eternity bands are also known as the wedding bands. The circular loop of diamonds signifies eternal and morer unending love.
                                </p>
                            </article>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 my-6">
                                <div className="w-full h-52 lg:h-[410px] ">
                                    <img src={headerImage} alt="header-image" className="w-full h-full" />
                                </div>
                                <div className="w-full h-52 lg:h-[410px] ">
                                    <img src={headerImage} alt="header-image" className="w-full h-full" />
                                </div>
                            </div>
                            <article className="space-y-6 mt-6">
                                <h1 className="text-[2rem] font-bold text-white">I was doing a course on Greek & Roman Literature</h1>
                                <p>
                                    This sentiment is what makes the eternity band a perfect gift for couples on special occasions, such as anniries, childbirth or anything that makes a difference to their life.dolor sit and amet consectetur ander adipiscing elites eiusmod tempor incididunt labore et dolore magna aliqua. Bands needs no occasion too be gifted and can been given as gifts whenever onewishes to. Eternity bands are also known as the wedding bands. The circular looper of diamonds signifies eternal and unending love.
                                </p>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur. Ut parturient aliquam. Mauris felis purus morbi facilisis. Lorem ipsumoi dolor sit amet consectetur adipiscing elit eiusmod tempor incididunt labore etore dolore magnanis aliqua.bands needs no occasion to be gifted and can be given as gifts whenever onewishes to. Eternity bands are also known as the wedding bands. The circular loop of diamonds signifies eternal and morer unending love.
                                </p>
                            </article>
                            {/* tag section  */}
                            <div className="flex items-start flex-col md:flex-row justify-evenly lg:justify-between my-6 gap-6">
                                <div className="flex items-start gap-5">
                                    <h1 className="text-xl text-white">Tags:</h1>
                                    <div className="flex items-center flex-wrap gap-3">
                                        {
                                            tags?.map((tag, index) => (
                                                <button key={index} className="px-4 py-2 rounded-md [transition:0.5s] hover:bg-[#ff6b00] hover:text-white font-semibold border capitalize">{tag}</button>
                                            ))
                                        }
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <h1 className="text-lg text-white">Shere This :</h1>
                                    <div className="flex items-center gap-2">
                                        <FaFacebookF size={22} className="cursor-pointer [transition:0.5s] hover:text-[#ff6b00]" />
                                        <FaTwitter size={22} className="cursor-pointer [transition:0.5s] hover:text-[#ff6b00]" />
                                        <FaLinkedinIn size={22} className="cursor-pointer [transition:0.5s] hover:text-[#ff6b00]" />
                                    </div>
                                </div>
                            </div>
                            {/* admin section  */}
                            <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-6 pb-16 text-center md:text-start">
                                <div className="w-32 md:w-52 lg:w-32 h-32 rounded-full">
                                    <img src={headerImage} alt="header-image" className="w-full h-full rounded-full" />
                                </div>
                                <div className="space-y-2">
                                    <h1 className="text-xl font-bold text-white">Admin & Founder</h1>
                                    <p>About Author</p>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit amet sit purus tempor dui pharetra consequat nibh elit urna interdum viera quam.</p>
                                </div>
                            </div>
                            <hr className="w-full h-[1px] bg-gray-500" />
                            {/* comments section  */}
                            <div className="my-12">
                                <h1 className="text-[2rem] font-bold text-white">Leave A Comment</h1>
                                <div className="mt-5">
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <Input
                                                name="name"
                                                type='text'
                                                placeholder='Name'
                                                register={register}
                                                errors={errors}
                                            />
                                            <Input
                                                name="email"
                                                type='email'
                                                placeholder='Email'
                                                register={register}
                                                errors={errors}
                                            />
                                        </div>
                                        <Textarea
                                            type="message"
                                            name="message"
                                            placeholder="Type Comment Here..."
                                            errors={errors}
                                            register={register}
                                        />
                                        <button
                                            className="relative flex items-center justify-center gap-2 mt-6 w-full sm:w-auto h-[50px] px-8 overflow-hidden border border-red-400 bg-white text-red-400 shadow-2xl transition-all before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:duration-500 after:absolute after:right-0 after:top-0 after:h-full after:w-0 after:duration-500 hover:text-white hover:shadow-red-400 hover:before:w-2/4 hover:before:bg-red-400 hover:after:w-2/4 group text-lg font-semibold hover:after:bg-red-400"
                                        >
                                            <span className="relative z-10"> Post Comment</span>
                                        </button>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-8 lg:col-span-2 space-y-10">
                        {/* search  */}
                        <div>
                            <h1 className="text-[2rem] font-bold text-white">Search</h1>
                            <form className="relative group mt-3">
                                <input
                                    type="search"
                                    className=" w-full px-3 !text-[#B8B8B8] py-2 border-[1px] mt-2 border-[#444449] rounded outline-none [transition:0.5s] ease-in-out focus:shadow-xl text-base font-normal focus:border-[#ff6b00] focus:ring-[.5px]"
                                    placeholder="Search..."
                                />
                                <span className="absolute right-3 top-[18px] text-white text-3xl [transition:0.5s] group-focus-within:text-[#ff6b00]"><GoSearch size={24} /></span>
                            </form>
                        </div>
                        {/* category  */}
                        <div>
                            <h1 className="text-[2rem] font-bold text-white">Categories</h1>
                            <div className="flex items-center gap-1 mt-3">
                                <span><MdOutlineKeyboardArrowRight size={24} /></span>
                                <Link to={''} className="text-lg [transition:0.5s] hover:text-blue-500 text-white">Covid Travel</Link>
                            </div>
                            <div className="flex items-center gap-1">
                                <span><MdOutlineKeyboardArrowRight size={24} /></span>
                                <Link to={''} className="text-lg [transition:0.5s] hover:text-blue-500 text-white">Travel Blog</Link>
                            </div>
                        </div>
                        {/* latest news  */}
                        <div>
                            <h1 className="text-[2rem] font-bold text-white">Latest News</h1>
                            <div className="flex flex-col items-center md:items-start gap-8 text-white mt-3">
                                <div className="flex items-center justify-start gap-2 border-b pb-3">
                                    <div className="w-40 h-24">
                                        <img src={headerImage} alt="header-image" className="w-full h-full rounded" />
                                    </div>
                                    <div>
                                        <h1 className="text-lg font-bold"> Discovering India’s treasures beyond the World Cup 2023</h1>
                                        <div className="flex items-center gap-2 mt-2">
                                            <MdOutlineDateRange />
                                            <p>December 5, 2023</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-start gap-2 border-b pb-3">
                                    <div className="w-40 h-24">
                                        <img src={headerImage} alt="header-image" className="w-full h-full rounded" />
                                    </div>
                                    <div>
                                        <h1 className="text-lg font-bold"> Discovering India’s treasures beyond the World Cup 2023</h1>
                                        <div className="flex items-center gap-2 mt-2">
                                            <MdOutlineDateRange />
                                            <p>December 5, 2023</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-start gap-2 border-b pb-3">
                                    <div className="w-40 h-24">
                                        <img src={headerImage} alt="header-image" className="w-full h-full rounded" />
                                    </div>
                                    <div>
                                        <h1 className="text-lg font-bold"> Discovering India’s treasures beyond the World Cup 2023</h1>
                                        <div className="flex items-center gap-2 mt-2">
                                            <MdOutlineDateRange />
                                            <p>December 5, 2023</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-start gap-2 border-b pb-3">
                                    <div className="w-40 h-24">
                                        <img src={headerImage} alt="header-image" className="w-full h-full rounded" />
                                    </div>
                                    <div>
                                        <h1 className="text-lg font-bold"> Discovering India’s treasures beyond the World Cup 2023</h1>
                                        <div className="flex items-center gap-2 mt-2">
                                            <MdOutlineDateRange />
                                            <p>December 5, 2023</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* latest project  */}
                        <div>
                            <h1 className="text-[2rem] font-bold text-white">Our Projects</h1>
                            <div className="grid grid-cols-3 gap-3 mt-3">
                                <img src={headerImage} alt="header-image" className="w-full h-24 rounded" />
                                <img src={headerImage} alt="header-image" className="w-full h-24 rounded" />
                                <img src={headerImage} alt="header-image" className="w-full h-24 rounded" />
                                <img src={headerImage} alt="header-image" className="w-full h-24 rounded" />
                                <img src={headerImage} alt="header-image" className="w-full h-24 rounded" />
                                <img src={headerImage} alt="header-image" className="w-full h-24 rounded" />
                            </div>
                        </div>
                        <div>
                            <h1 className="text-[2rem] font-bold text-white">Archives</h1>
                            <div className="flex items-center gap-1 mt-3">
                                <span><MdOutlineKeyboardArrowRight size={24} /></span>
                                <Link to={''} className="text-lg [transition:0.5s] hover:text-blue-500 text-white">December 2023</Link>
                            </div>
                        </div>
                        <div>
                            <h1 className="text-[2rem] font-bold text-white">Popular Tags</h1>
                            <div className="flex items-center flex-wrap gap-3 mt-3">
                                {
                                    tags?.map((tag, index) => (
                                        <button key={index} className="px-4 py-2 rounded-md [transition:0.5s] hover:bg-[#ff6b00] hover:text-white font-semibold border capitalize">{tag}</button>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
