import { Link } from "react-router-dom"
import headerImage from "../../../../public/image/blog-header.jpg"
import BlogSubscribe from "./blog-subscribe"
import HeaderSection from "../../../Components/reuseable/header-section"
import BlogCard from "../../../Components/reuseable/blog-card"

export default function BlogPage() {
    return (
        <section>
            <HeaderSection headerImage={headerImage}>
                <div className="relative flex justify-center items-center  text-center flex-col gap-1 h-full text-white">
                    <h1 className="text-[2.5rem] md:text-[3rem] lg:text-[5rem] font-bold text-white">Blog Grid</h1>
                    <h1 className="text-[1.6rem] font-bold seaweed-script">
                        <Link to="/">
                            <span className="text-[#ffc437] [transition:0.5s] hover:text-[#ff6b00]">
                                Home
                            </span>
                        </Link>
                        - <span>Blog Grid</span>
                    </h1>
                </div>
            </HeaderSection>
            <div className="custom-container">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-12">
                    <BlogCard />
                    <BlogCard />
                    <BlogCard />
                    <BlogCard />
                    <BlogCard />
                </div>
            </div>

            <div>
                <BlogSubscribe />
            </div>
        </section>
    )
}
