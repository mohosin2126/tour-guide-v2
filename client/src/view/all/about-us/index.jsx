import firstImage from "../../../assets/istockphoto-942152278-612x612.jpg";
import secondImage from "../../../assets/tower-city-tourist-attraction-tower-block-wallpaper-preview.jpg";
import AboutUs from "../home/about-us/index.jsx";
import FeatureCard from "../../../components/features-card/index.jsx";
import Title from "../../../components/reuseable/title/inex.jsx";

export default function AboutUsPage() {
    const features = [
        {
            number: "01",
            title: "Excellent Reputation",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt dolore magna aliqua.",
            buttonText: "Get In Touch",
            imageUrl: secondImage,
            reverse: false,
        },
        {
            number: "02",
            title: "Best Local Agents",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt dolore magna aliqua.",
            buttonText: "Our Agent",
            imageUrl: secondImage,
            reverse: true,
        },
        {
            number: "03",
            title: "Tons Of Options",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt dolore magna aliqua.",
            buttonText: "Booking",
            imageUrl: secondImage,
            reverse: false,
        },
    ];

    return (
        <div className="mt-20">
            {/* Banner Section */}
            <div className="relative h-[50vh] w-full">
                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-no-repeat"
                    style={{
                        backgroundImage: `url(${firstImage})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center"
                    }}
                >
                    {/* Optional Overlay for Text Readability */}
                    <div className="absolute inset-0 bg-black opacity-60"></div>
                </div>
              

                {/* Text Overlay */}
                <div className="relative z-10 flex items-center justify-center h-full text-center">
                    <div className="text-white">
                        <span className="text-[2rem] text-3xl font-extrabold text-[#FFC42E] block">Welcome to our company</span>
                        <div className="flex gap-6 justify-center items-center mt-6">
                            <h4 className="text-xl seaweed-script">Home</h4>
                            <div>-</div>
                            <h4 className="text-xl seaweed-script">About</h4>
                        </div>
                    </div>
                </div>
            </div>

            <div className="custom-container mx-auto mt-12">
                {/* About Us Section */}
                <div>
                    <AboutUs />
                </div>

                {/* Features Section */}
                <div>
                    <Title title="Features" subTitle="You can see our feature" className="text-center" />
                    {features.map((feature, index) => (
                        <FeatureCard
                            key={index}
                            number={feature.number}
                            title={feature.title}
                            description={feature.description}
                            buttonText={feature.buttonText}
                            imageUrl={feature.imageUrl}
                            reverse={feature.reverse}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
