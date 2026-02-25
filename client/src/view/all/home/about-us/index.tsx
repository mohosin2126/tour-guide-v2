import Title from "@/components/reuseable/title";
import firstImage from "@/assets/istockphoto-1164329797-612x612.jpg";
import secondImage from "@/assets/sea-villages-houses-cliffs-boats-blue-sky-wallpaper-preview.jpg";
import thirdImage from "@/assets/pexels-freestockpro-2166553.jpg";
import { FaUsers } from "react-icons/fa6";

export default function AboutUs() {
  return (
    <div>
      <div>
        <div className="relative flex w-full items-center justify-center">
          <div className="moving-box absolute -top-10 right-0 flex w-[869px] items-center justify-center">
            <div className="space-y-2 rounded-lg bg-card p-4 text-card-foreground shadow-lg">
              <h1 className="text-center text-2xl font-bold">Contact us</h1>
              <div className="flex items-center gap-3">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-b from-purple-500 to-purple-700 p-3">
                  <FaUsers size={40} color="#FFF" />
                </div>
                <h1 className="text-center text-2xl font-bold">300+ People</h1>
              </div>
            </div>
          </div>
          <div className="w-1/2 flex-1">
            <Title
              title="About Us"
              subTitle="Planning a trip should be very exciting adventure"
              className="text-start"
            />
            <p className="text-gray-700 dark:text-gray-400">
              We&apos;re dedicated to offering exceptional value for your travel investment. Our
              relationships with trusted travel partners
            </p>
            <div className="mt-8">
              <div className="flex w-full gap-6 px-10">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="orange"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-earth"
                  >
                    <path d="M21.54 15H17a2 2 0 0 0-2 2v4.54" />
                    <path d="M7 3.34V5a3 3 0 0 0 3 3a2 2 0 0 1 2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.1.9-2 2-2h3.17" />
                    <path d="M11 21.95V18a2 2 0 0 0-2-2a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05" />
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                </div>
                <div className="w-2/3">
                  <h4 className="text-2xl font-semibold text-foreground">International Tours</h4>
                  <p className="text-gray-700 dark:text-gray-400">
                    Our team of travel professional brings a wealth of knowledge and expertise to
                    the table
                  </p>
                </div>
              </div>
              <div className="mt-8 flex w-full gap-6 px-10">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="orange"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-book-copy"
                  >
                    <path d="M2 16V4a2 2 0 0 1 2-2h11" />
                    <path d="M22 18H11a2 2 0 1 0 0 4h10.5a.5.5 0 0 0 .5-.5v-15a.5.5 0 0 0-.5-.5H11a2 2 0 0 0-2 2v12" />
                    <path d="M5 14H4a2 2 0 1 0 0 4h1" />
                  </svg>
                </div>
                <div className="w-2/3">
                  <h4 className="text-2xl font-semibold text-foreground">
                    Multiple Option to Choose
                  </h4>
                  <p className="text-muted-foreground">
                    Planning trip should be an exciting adventure, not stressful ordeal. Let us
                    handle the logistics
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 w-1/2 flex-1">
            <div className="flex w-full items-center justify-center gap-6">
              <div className="w-1/2 flex-1">
                <img
                  src={firstImage}
                  className="group-hover:scale-110 [transition:0.5s]"
                  alt="first image"
                />
              </div>
              <div className="w-1/2 flex-1 space-y-8">
                <img
                  src={secondImage}
                  className="group-hover:scale-110 [transition:0.5s]"
                  alt="second image"
                />
                <img
                  src={thirdImage}
                  className="w-10/12 group-hover:scale-110 [transition:0.5s]"
                  alt="third image"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
