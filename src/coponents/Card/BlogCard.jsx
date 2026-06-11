import { Link } from "react-router";

const BlogCard = ({ blog }) => {
  return (
    <div className="card bg-base-100 shadow-lg rounded-xl h-full">

      <figure className="h-52">
        <img
          src={blog.image}
          alt={blog.title}
          className="h-full w-full object-cover"
        />
      </figure>

      <div className="card-body">

        <h2 className="card-title line-clamp-2">
          {blog.title}
        </h2>

        <p className="text-sm text-base-content/70 line-clamp-3">
          {blog.shortDescription}
        </p>

        <p className="text-sm">
          📅 {blog.publishDate}
        </p>

        <Link
          to="/blogs"
          className="btn btn-primary mt-3"
        >
          Read More
        </Link>

      </div>

    </div>
  );
};

export default BlogCard;