import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import BlogModal from "./BlogModal";
import BlogCard from "../../coponents/Card/BlogCard";
import useTitle from "../../hooks/useTitle";


const Blogs = () => {
  useTitle("Blogs");


  const axiosSecure =
    useAxiosSecure();

  const [blogs, setBlogs] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [selectedBlog,
    setSelectedBlog] =
    useState(null);

  useEffect(() => {

    axiosSecure
      .get("/blogs")
      .then((res) => {

        setBlogs(
          res.data
        );

      })
      .finally(() => {

        setLoading(false);

      });

  }, [axiosSecure]);

  if (loading) {

    return (
      

      <div
        className="
          grid
          md:grid-cols-2
          lg:grid-cols-3
          gap-8
          max-w-7xl
          mx-auto
          py-12
        "
      >

        {[...Array(6)].map(
          (_, index) => (

            <div
              key={index}
              className="
                skeleton
                h-96
                rounded-2xl
              "
            ></div>

          )
        )}

      </div>

    );

  }

  return (

    <div
      className="
        max-w-7xl
        mx-auto
        px-4
        py-12
      "
    >

      <div className="text-center mb-12">

        <h1
          className="
            text-5xl
            font-bold
          "
        >
          Our Blogs
        </h1>

        <p
          className="
            text-base-content/60
            mt-4
          "
        >
          Latest tips, trends and insights
        </p>

      </div>

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-3
          gap-8
        "
      >

        {blogs.map((blog) => (

          <BlogCard
            key={blog._id}
            blog={blog}
            setSelectedBlog={
              setSelectedBlog
            }
          />

        ))}

      </div>

      {selectedBlog && (

        <BlogModal
          blog={selectedBlog}
          closeModal={() =>
            setSelectedBlog(null)
          }
        />

      )}

    </div>

  );

};

export default Blogs;