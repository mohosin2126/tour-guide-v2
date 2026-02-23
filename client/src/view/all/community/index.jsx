import { Link } from "react-router-dom";
import HeaderSection from "../../../Components/reuseable/header-section";
import community from "../../../assets/community.jpg";
import CountUp from "react-countup";


export default function Community() {
  const countCommunity = [
    { value: "6200+", description: "Tourist" },
    { value: "700+", description: "Places" },
    { value: "97%", description: "Satisfied" },
    { value: "12+", description: "Everyday Booking" },
    { value: "28+", description: "Workable Member" },
  ];
  const membersData = [
    {
      id: 1,
      image: "https://placehold.co/2000x2000",
      name: "Mohosin Ali Shah",
      role: "Frontend Developer",
    },
    {
      id: 2,
      image: "https://placehold.co/2000x2000",
      name: "Sushil Hemrom",
      role: "Frontend Developer",
    },
    {
      id: 3,
      image: "https://placehold.co/2000x2000",
      name: "Mohosin Ali Shah",
      role: "Frontend Developer",
    },
    {
      id: 4,
      image: "https://placehold.co/2000x2000",
      name: "Mohosin Ali Shah",
      role: "Frontend Developer",
    },
    {
      id: 5,
      image: "https://placehold.co/2000x2000",
      name: "Sushil Hemrom",
      role: "Frontend Developer",
    },
    {
      id: 6,
      image: "https://placehold.co/2000x2000",
      name: "Mohosin Ali Shah",
      role: "Frontend Developer",
    },
    {
      id: 7,
      image: "https://placehold.co/2000x2000",
      name: "Sushil Hemrom",
      role: "Frontend Developer",
    },
    {
      id: 8,
      image: "https://placehold.co/2000x2000",
      name: "Mohosin Ali Shah",
      role: "Frontend Developer",
    },
    {
      id: 9,
      image: "https://placehold.co/2000x2000",
      name: "Sushil Hemrom",
      role: "Frontend Developer",
    },
    {
      id: 10,
      image: "https://placehold.co/2000x2000",
      name: "Mohosin Ali Shah",
      role: "Frontend Developer",
    },
    {
      id: 11,
      image: "https://placehold.co/2000x2000",
      name: "Sushil Hemrom",
      role: "Frontend Developer",
    },
    {
      id: 12,
      image: "https://placehold.co/2000x2000",
      name: "Mohosin Ali Shah",
      role: "Frontend Developer",
    }
  ]
  return (
    <section>
      <HeaderSection headerImage={community}>
        <div className="relative flex justify-center items-center  text-center flex-col gap-1 h-full text-white">
          <h1 className="text-[2.5rem] md:text-[3rem] lg:text-[5rem] font-bold text-white">Our Community</h1>
          <h1 className="text-[1.6rem] font-bold seaweed-script">
            <Link to="/">
              <span className="text-[#ffc437] [transition:0.5s] hover:text-[#ff6b00]">
                Home
              </span>
            </Link> -
            <span>Our Community</span>
          </h1>
        </div>
      </HeaderSection>
      <div className="custom-container">
        {/*count down section for community */}
        <div className="h-auto lg:h-56 flex items-center justify-center my-8">
          <div className="w-full lg:w-2/3 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mt-10">
            {countCommunity.map((stat, index) => (
              <div key={index} className="text-black dark:text-white text-center">
                {/*{stat.value}*/}
                <CountUp
                  className="lg:text-3xl text-lg  font-semibold montserrat"
                  start={0}
                  end={parseInt(stat.value)} // Convert to number
                  duration={2.5}
                  useEasing={true}
                  separator=","
                  suffix={
                    stat.value.includes("+") || stat.value.includes("%")
                      ? stat.value.replace(/[\d,]/g, "")
                      : ""
                  } // Add suffix
                />
                <p className="text-base font-normal mt-3 montserrat text-black dark:text-white">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="flex flex-col md:flex-row items-center justify-between text-white my-5">
            <h1 className="text-xl md:text-2xl">Our Active Members</h1>
            <Link to="" className="border-b [transition:0.5s] hover:text-blue-500 hover:border-b-blue-500">View All Our Members</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
            {
              membersData?.length > 0 && membersData?.map((member, index) => (
                <button key={index} className="py-4 group relative grid overflow-hidden px-4 shadow-[0_1000px_0_0_hsl(0_0%_20%)_inset] transition-colors duration-200 dark:border border-none dark:border-neutral-700 rounded-lg">
                  <span>
                    <span className="spark mask-gradient absolute inset-0 h-[100%] w-[100%] animate-flip overflow-hidden [mask:linear-gradient(white,_transparent_50%)] before:absolute before:aspect-square before:w-[200%] before:rotate-[-90deg] before:animate-rotate before:bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] before:content-[''] before:[inset:0_auto_auto_50%] before:[translate:-50%_-15%]" />
                  </span>
                  <span className="backdrop absolute inset-[1px] rounded-lg bg-white shadow-sm dark:shadow-none dark:bg-neutral-950  transition-colors duration-200 group-hover:bg-gray-100 dark:group-hover:bg-neutral-800" />
                  <span className="z-10 py-0.5 text-sm text-neutral-100">
                    <div className="px-4 lg:p-5 flex flex-col items-center justify-center text-center text-black">
                      <figure className="w-24 h-24 rounded-full border-none dark:border dark:border-neutral-700">
                        <img
                          src="https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                          alt="person"
                          className="w-full h-full rounded-full"
                        />
                      </figure>
                      <h1 className="text-xl md:text-3xl font-bold text-black dark:text-gray-200 mt-5">John Doe</h1>
                      <p className="text-lg font-semibold text-black dark:text-gray-200">CEO & Founder</p>
                    </div>
                  </span>
                </button>
              ))
            }
          </div>
        </div>
      </div>
    </section>
  )
}
