import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import BlogCard from "../../../coponents/Card/BlogCard";
import { Link } from "react-router";
import BlogModal from "../../Blogs/BlogModal";
import ScrollReveal from "../../../coponents/Motion/ScrollReveal";
import { StaggerContainer, StaggerItem } from "../../../coponents/Motion/StaggerContainer";
import { motion } from "framer-motion";

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
    <section className="max-w-7xl mx-auto py-12 px-4">
      <ScrollReveal className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-base-content">
          Latest Blogs & Articles
        </h2>

        <p className="mt-3 text-base-content/70">
          Shopping tips, fashion trends, product buying guides, and tech updates.
        </p>
      </ScrollReveal>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.slice(0, 6).map((blog) => (
          <StaggerItem key={blog._id}>
            <BlogCard
              blog={blog}
              setSelectedBlog={setSelectedBlog}
            />
          </StaggerItem>
        ))}
      </StaggerContainer>

      {selectedBlog && (
        <BlogModal
          blog={selectedBlog}
          closeModal={() => setSelectedBlog(null)}
        />
      )}

      <ScrollReveal delay={0.2} className="text-center mt-10">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
          <Link
            to="/blog"
            className="btn btn-primary rounded-full px-8 shadow-lg hover:shadow-primary/30 text-base-content font-semibold"
          >
            See All Blogs
          </Link>
        </motion.div>
      </ScrollReveal>
    </section>
  );
};

export default BlogPreview;