
import Title from "../../../../Components/reuseable/title/inex"
import firstImage from "../../../../assets/istockphoto-1164329797-612x612.jpg"
import secondImage from "../../../../assets/sea-villages-houses-cliffs-boats-blue-sky-wallpaper-preview.jpg"
import thirdImage from "../../../../assets/pexels-freestockpro-2166553.jpg"
import { FaUsers } from "react-icons/fa6"


export default function AboutUs() {
    return (
        <div>
            {/*about us section */}
            <div>
                <div className="flex justify-center items-center w-full relative">
                    <div className="absolute -top-10 right-0 flex items-center justify-center moving-box w-[869px]">
                        <div className="bg-white text-black rounded-lg p-4 shadow-lg space-y-2">
                            <h1 className="text-2xl font-bold text-center">Contact us </h1>
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 mx-auto rounded-full p-3 bg-gradient-to-b from-purple-500 to-purple-700 flex items-center justify-center">
                                    <FaUsers size={40} color="#FFF" />
                                </div>
                                <h1 className="text-2xl font-bold text-center">300+ People</h1>
                            </div>
                        </div>
                    </div>
                    {/*left side*/}
                    <div className="flex-1 w-1/2 ">
                        <Title title="About Us" subTitle="Planning a trip should be very exciting adventure"
                            className="text-start" />
                        <p className=" dark:text-gray-400 text-gray-700">
                            We&apos;re dedicated to offering exceptional value for your travel investment. Our
                            relationships with trusted travel partners
                        </p>
                        <div className="mt-8 ">
                            <div className="flex gap-6 w-full px-10">
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"
                                        fill="none" stroke="orange" strokeWidth="2" strokeLinecap="round"
                                        strokeLinejoin="round" className="lucide lucide-earth">
                                        <path d="M21.54 15H17a2 2 0 0 0-2 2v4.54" />
                                        <path
                                            d="M7 3.34V5a3 3 0 0 0 3 3a2 2 0 0 1 2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.1.9-2 2-2h3.17" />
                                        <path d="M11 21.95V18a2 2 0 0 0-2-2a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05" />
                                        <circle cx="12" cy="12" r="10" />
                                    </svg>
                                </div>
                                <div className="w-2/3">
                                    <h4 className="font-semibold text-2xl  dark:text-white text-black">
                                        International Tours
                                    </h4>
                                    <p className=" dark:text-gray-400 text-gray-700">
                                        Our team of travel professional brings a wealth of knowledge and expertise to
                                        the table
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-6 w-full px-10 mt-8">
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                        fill="none" stroke="orange" strokeWidth="2" strokeLinecap="round"
                                        strokeLinejoin="round" className="lucide lucide-book-copy">
                                        <path d="M2 16V4a2 2 0 0 1 2-2h11" />
                                        <path
                                            d="M22 18H11a2 2 0 1 0 0 4h10.5a.5.5 0 0 0 .5-.5v-15a.5.5 0 0 0-.5-.5H11a2 2 0 0 0-2 2v12" />
                                        <path d="M5 14H4a2 2 0 1 0 0 4h1" />
                                    </svg>
                                </div>
                                <div className="w-2/3">
                                    <h4 className="font-semibold text-2xl  dark:text-white text-black ">
                                        Multiple Option to Choose
                                    </h4>
                                    <p className=" dark:text-white text-gray-700">
                                        OPlanning trip should be an exciting adventure, not stressful ordeal. Let us handle the logistics
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*right side */}
                    <div className="flex-1 w-1/2 mt-8">
                        <div className="flex justify-center items-center w-full gap-6">
                            <div className="flex-1 w-1/2">
                                <img src={firstImage} className="group-hover:scale-110 [transition:0.5s]" alt="first image" />
                            </div>
                            <div className="flex-1 w-1/2 space-y-8">
                                <img src={secondImage} className="group-hover:scale-110 [transition:0.5s]" alt="first image" />
                                <img src={thirdImage} className="w-10/12 group-hover:scale-110 [transition:0.5s] " alt="first image" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}