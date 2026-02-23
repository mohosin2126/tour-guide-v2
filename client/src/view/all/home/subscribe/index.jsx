import { FaArrowRightLong } from "react-icons/fa6";
import SubscribeImage from "../../../../../public/subscribe.png"
import SubscribeForm from "./subscribe-form";


export default function Subscribe() {
    return (
       <div className="w-10/12 mx-auto rounded-lg bg-amber-600 p-3 sm:p-10 relative top-14">
         <div className='flex items-center justify-between flex-col lg:flex-row gap-10 '>
            <div className="flex-1 z-10">
                <h1 className='text-[2.5rem] font-bold text-white'>
                    Subscribe for latest update about Travelling
                </h1>
            </div>
            <div className="flex items-center justify-center absolute inset-0 z-0">
                <img src={SubscribeImage} className="w-52 h-52" alt="" />
            </div>
            <div className="flex-1 w-full z-10">
              <SubscribeForm className=" justify-end" />
            </div>
        </div>
       </div>
    )
}
