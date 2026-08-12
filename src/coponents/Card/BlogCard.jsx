import { motion } from "framer-motion";

const BlogCard = ({
  blog,
  setSelectedBlog,
}) => {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="card bg-base-100 border border-base-300 shadow-lg hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden flex flex-col h-full group"
    >
      <figure className="h-52 overflow-hidden bg-base-200">
        <motion.img
          src={blog.image}
          alt={blog.title}
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.4 }}
          className="h-full w-full object-cover transition-transform duration-500"
        />
      </figure>

      <div className="card-body p-6 flex flex-col grow">
        <h2 className="card-title text-xl font-bold line-clamp-2 min-h-[56px] group-hover:text-primary transition-colors">
          {blog.title}
        </h2>

        <p className="text-sm text-base-content/70 line-clamp-3 min-h-[60px]">
          {blog.shortDescription}
        </p>

        <div className="flex justify-between text-xs font-medium text-base-content/60 mt-2 pt-2 border-t border-base-200">
          <span>👤 {blog.author}</span>
          <span>📅 {blog.publishDate}</span>
        </div>

        <div className="mt-auto pt-4">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.96 }}>
            <button
              onClick={() => setSelectedBlog(blog)}
              className="btn btn-primary w-full text-base-content font-semibold rounded-xl"
            >
              Read More
            </button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogCard;