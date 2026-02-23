import { Link } from "react-router-dom";

export default function BlogCard() {
    return (
        <Link to={"/blog/1"}>
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg rounded-t-xl">
                <div className="w-full h-56 relative ">
                    <p className="bg-blue-500 text-white absolute top-3 left-0 py-2 px-3 rounded-e-full">Travel</p>
                    <img src="https://ceoworld.biz/wp-content/uploads/2020/01/Paris.jpg" alt="famous-place" className="rounded-t-xl" />
                </div>
                <div className="px-2 py-4 space-y-1">
                    <article>
                        <span className="text-md font-medium text-gray-500">#tour #latest #recommended </span>
                    </article>
                    <h1 className="text-xl font-semibold text-black dark:text-white">Journy is the best way to see the world</h1>
                    <p className="text-gray-500">Paris is the capital city of France. It is the most populous city and the most populous city in the world.</p>
                    <div className="flex items-center gap-3">
                        <figure className="w-14 h-14 rounded-full">
                            <img src="https://a.storyblok.com/f/191576/1200x800/a3640fdc4c/profile_picture_maker_before.webp" alt="profile" className="w-full h-full rounded-full" />
                        </figure>
                        <div>
                            <h2 className="text-base font-medium text-black dark:text-white">Sushil Hemrom</h2>
                            <p className="text-sm text-gray-400">15k followers</p>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}
