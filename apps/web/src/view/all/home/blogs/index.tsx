import Title from "@/components/reuseable/title";
import { MdDateRange } from "react-icons/md";
import { Link } from "react-router-dom";

interface BlogData {
  image?: string;
  title?: string;
  date?: string;
  category?: string;
}

interface BlogsProps {
  blogData?: BlogData[];
}

export default function Blogs({ blogData }: BlogsProps) {
  if (!blogData || blogData.length === 0) return null;

  return (
    <div className="my-16">
      <Title title="Our Blog" subTitle="Get Latest News Update" className="text-center" />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blogData.map((blog, index) => (
          <Link to="/community" key={index} className="group overflow-hidden rounded-xl border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="relative h-[220px] w-full overflow-hidden">
              <img
                src={blog.image || "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800"}
                alt={blog.title || "Blog post"}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {blog.category && (
                <span className="absolute left-3 top-3 rounded-md bg-primary px-3 py-1 text-sm font-semibold text-primary-foreground">
                  {blog.category}
                </span>
              )}
            </div>
            <div className="p-5">
              {blog.date && (
                <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
                  <MdDateRange size={16} />
                  <span>{blog.date}</span>
                </div>
              )}
              <h3 className="line-clamp-2 text-xl font-bold text-foreground transition-colors duration-300 group-hover:text-primary">
                {blog.title || "Blog Post Title"}
              </h3>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                Read More →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
