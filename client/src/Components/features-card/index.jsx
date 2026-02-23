
export default function  FeatureCard({ number, title, description, buttonText, imageUrl, reverse }){
    return (
        <div className={`py-16 w-full flex px-8 gap-20 items-center ${reverse ? 'flex-row-reverse' : ''}`}>
            {/* Text Side */}
            <div className="w-2/3 flex-1 mx-auto  text-black dark:text-white">
                <h5 className="text-base font-light mb-2">Features #{number}</h5>
                <h1 className="font-semibold text-3xl mb-3">{title}</h1>
                <p className="mb-4 text-gray-700 dark:text-gray-400">{description}</p>
                <button
                    className="relative mt-4 h-[50px] w-40 overflow-hidden border border-red-400 bg-white text-red-400 shadow-2xl transition-all before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:duration-500 after:absolute after:right-0 after:top-0 after:h-full after:w-0 after:duration-500 hover:text-white hover:shadow-red-400 hover:before:w-2/4 hover:before:bg-red-400 hover:after:w-2/4 hover:after:bg-red-400"
                >
                    <span className="relative z-10">{buttonText}</span>
                </button>
            </div>
            {/* Image Side */}
            <div className="w-1/3 mx-auto">
                <img src={imageUrl} className="h-72 rounded-xl" alt="feature"/>
            </div>
        </div>
    );
}

