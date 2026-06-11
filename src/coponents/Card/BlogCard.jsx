const BlogCard = ({
  blog,
  setSelectedBlog,
}) => {

  return (

    <div
      className="
        card
        bg-base-100
        shadow-lg
        hover:shadow-2xl
        hover:-translate-y-2
        transition-all
        duration-300
        rounded-2xl
      "
    >

      <figure className="h-52">

        <img
          src={blog.image}
          alt={blog.title}
          className="
            h-full
            w-full
            object-cover
          "
        />

      </figure>

      <div className="card-body">

        <h2
          className="
            card-title
            line-clamp-2
          "
        >
          {blog.title}
        </h2>

        <p
          className="
            text-base-content/70
            line-clamp-3
          "
        >
          {blog.shortDescription}
        </p>

        <div
          className="
            flex
            justify-between
            text-sm
            text-base-content/60
          "
        >

          <span>
            👤 {blog.author}
          </span>

          <span>
            📅 {blog.publishDate}
          </span>

        </div>

        <button
          onClick={() =>
            setSelectedBlog(blog)
          }
          className="
            btn
            btn-primary
            mt-4
          "
        >
          Read More
        </button>

      </div>

    </div>

  );

};

export default BlogCard;