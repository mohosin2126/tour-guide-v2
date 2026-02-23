import { Link } from "react-router-dom"
import headerImage from "../../../../public/image/blog-header.jpg"
import HeaderSection from '../../../Components/reuseable/header-section'
import { MdOutlineLocationOn, MdOutlineEmail, MdWifiCalling3 } from "react-icons/md";
import Title from "../../../Components/reuseable/title/inex";
import { useForm } from "react-hook-form";
import Input from "../../../Components/reuseable/input";
import Textarea from "../../../Components/reuseable/text-area";
import BlogSubscribe from "../blog/blog-subscribe";

export default function ContactUs() {
  const { register, handleSubmit,  formState: { errors }, } = useForm();

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <section>
      <HeaderSection headerImage={headerImage}>
        <div className="relative flex justify-center items-center  text-center flex-col gap-1 h-full text-white">
          <h1 className="text-[2.5rem] md:text-[3rem] lg:text-[5rem] font-bold text-white">Contact Us</h1>
          <h className="text-[1.6rem] font-bold seaweed-script"><Link to="/"><span className="text-[#ffc437] [transition:0.5s] hover:text-[#ff6b00]">Home</span></Link> - <span>Contact Us</span></h>
        </div>
      </HeaderSection>
      <div className="my-20 custom-container">
        <Title title="Contact Details" subTitle="Contact Information" className="text-center" />
        {/* contact box section  */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 my-12">
          <div className="flex items-center justify-center flex-col gap-5 text-center text-white py-10 bg-gray-700 [transition:0.5s] rounded hover:-translate-y-2">
            <div className="flex items-center justify-center p-5 bg-[#ff6b00] rounded">
              <MdOutlineLocationOn size={60} color="#FFF" />
            </div>
            <h1 className="text-2xl font-bold ">Our Location</h1>
            <p>1901 Thornridge Cir. Shiloh, <br />
              Hawaii 81063</p>
          </div>
          <div className="flex items-center justify-center flex-col gap-5 text-center text-white py-10 bg-gray-700 [transition:0.5s] rounded hover:-translate-y-2">
            <div className="flex items-center justify-center p-5 bg-[#ff6b00] rounded">
              <MdOutlineEmail size={60} color="#FFF" />
            </div>
            <h1 className="text-2xl font-bold ">Email Address</h1>
            <p>info@example.com
              <br />
              info@example.com
            </p>
          </div>
          <div className="flex items-center justify-center flex-col gap-5 text-center text-white py-10 bg-gray-700 [transition:0.5s] rounded hover:-translate-y-2">
            <div className="flex items-center justify-center p-5 bg-[#ff6b00] rounded">
              <MdWifiCalling3 size={60} color="#FFF" />
            </div>
            <h1 className="text-2xl font-bold ">Phone Number</h1>
            <p>Emergency Cases
              <br />
              +(208)-555-0112 (24/7)
            </p>
          </div>
        </div>
        {/* location  */}
        {/* <div>
          Location
        </div> */}
        {/* form section  */}
        <div className="w-full md:w-11/12 lg:w-2/3 mx-auto">
          <Title title="Connect" subTitle="Send us Message" className="text-center" />
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Input
                  name="name"
                  type='text'
                  placeholder='Your Name'
                  register={register}
                  errors={errors}
                />
                <Input
                  name="email"
                  type='email'
                  placeholder='Your Email'
                  register={register}
                  errors={errors}
                />
                <Input
                  name="phone"
                  type='number'
                  placeholder='Phone'
                  register={register}
                  errors={errors}
                />
                <Input
                  name="subject"
                  type='text'
                  placeholder='Subject'
                  register={register}
                  errors={errors}
                />
              </div>
              <Textarea
                type="message"
                name="message"
                placeholder="Type Message..."
                errors={errors}
                register={register}
              />
              <div className="flex items-center justify-center">
                <button
                  className="relative flex items-center justify-center gap-2 mt-6 w-full sm:w-auto h-[50px] px-8 overflow-hidden border border-red-400 bg-white text-red-400 shadow-2xl transition-all before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:duration-500 after:absolute after:right-0 after:top-0 after:h-full after:w-0 after:duration-500 hover:text-white hover:shadow-red-400 hover:before:w-2/4 hover:before:bg-red-400 hover:after:w-2/4 group text-lg font-semibold hover:after:bg-red-400"
                >
                  <span className="relative z-10"> Send Message</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
      <BlogSubscribe />
    </section>
  )
}
