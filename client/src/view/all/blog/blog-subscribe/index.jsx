import SubscribeForm from '../../home/subscribe/subscribe-form'
import SubscribeImage from "../../../../../public/image/subscribe/blog-subscribe.png"
import topImage from "../../../../../public/image/subscribe/shape-16.png"
import locationImage from "../../../../../public/image/subscribe/location.png"

export default function BlogSubscribe() {
    return (
        <div
            className="w-10/12 mx-auto rounded-lg relative px-3 py-5 lg:py-[80px] lg:px-[60px] top-14"
            style={{ background: 'linear-gradient(160deg, rgba(80, 255, 202, 1), rgba(250, 211, 135, 1), rgba(255, 77, 0, 1))' }}
        >
            <div className='absolute w-[218px] h-[121px] top-0 left-3'>
                <img src={topImage} alt="top-image" className='w-full h-full' />
            </div>
            <div className='flex items-center text-start justify-between flex-col lg:flex-row gap-10 '>
                <div className="flex-1 z-10 items-start space-y-5 relative">
                    <div
                        className="absolute  top-20  lg:w-[389px] lg:h-[195px] bg-no-repeat -z-10">
                        <img src={locationImage} alt="top-image" className='w-full h-full' />
                    </div>

                    <h1 className='text-[1.6rem] md:text-[2.5rem] font-bold text-black leading-normal'>
                        Subscribe for latest update about Travelling
                    </h1>
                    <SubscribeForm className=" justify-start" />
                </div>
                <div className="hidden lg:block flex-1 w-full z-10">
                    <div
                        className="absolute top-0 right-0 h-full bg-cover bg-no-repeat bg-left-center"
                        style={{ width: 'calc(50% + 50px)' }}
                    >
                        <img src={SubscribeImage} className="w-full h-full" alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}
