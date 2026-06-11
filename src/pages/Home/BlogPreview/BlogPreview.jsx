import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import BlogCard from "../../../coponents/Card/BlogCard";
import { Link } from "react-router";
import BlogModal from "../../Blogs/BlogModal";

const BlogPreview = () => {

  const axiosSecure = useAxiosSecure();

  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {

    axiosSecure
      .get("/blogs")
      .then((res) => {
        setBlogs(res.data);
      });

  }, [axiosSecure]);

  return (
    <section className="max-w-7xl mx-auto py-10 px-4">

      <div className="text-center mb-12">

        <h2 className="text-4xl font-bold">
          Latest Blogs
        </h2>

        <p className="mt-3 text-base-content/70">
          Shopping tips, fashion trends and tech updates
        </p>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {blogs.slice(0, 6).map((blog) => (
          <BlogCard
            key={blog._id}
            blog={blog}
            setSelectedBlog={setSelectedBlog}
          />
        ))}
        {selectedBlog && (
  <BlogModal
    blog={selectedBlog}
    closeModal={() =>
      setSelectedBlog(null)
    }
  />
)}

      </div>
      <div className="text-center mt-10">
        <Link
          to="/blog"
          className="btn btn-primary rounded-full px-8"
        >
          See All Blogs
        </Link>
      </div>

    </section>
  );
};

export default BlogPreview;