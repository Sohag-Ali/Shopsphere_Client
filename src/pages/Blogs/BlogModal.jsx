const BlogModal = ({
  blog,
  closeModal,
}) => {

  if (!blog) return null;

  const readingTime =
    Math.ceil(
      (blog.content?.split(" ").length || 0) / 200
    );

  return (

    <div
      className="
        fixed
        inset-0
        z-50
        bg-black/70
        backdrop-blur-sm
        flex
        items-center
        justify-center
        p-4
      "
    >

      <div
        className="
          bg-base-100
          rounded-3xl
          w-full
          max-w-5xl
          max-h-[95vh]
          overflow-hidden
          shadow-2xl
          relative
        "
      >

        {/* Close Button */}

        <button
          onClick={closeModal}
          className="
            btn
            btn-circle
            btn-sm
            absolute
            top-5
            right-5
            z-50
            bg-white
            text-black
            border-none
          "
        >
          ✕
        </button>

        {/* Scroll Area */}

        <div className="overflow-y-auto max-h-[95vh]">

          {/* Hero */}

          <div className="relative">

            <img
              src={blog.image}
              alt={blog.title}
              className="
                w-full
                h-[250px]
                md:h-[450px]
                object-cover
              "
            />

            <div
              className="
                absolute
                inset-0
                bg-gradient-to-t
                from-black/90
                via-black/40
                to-transparent
              "
            />

            <div
              className="
                absolute
                bottom-0
                left-0
                p-6
                md:p-10
                text-white
              "
            >

              <span
                className="
                  badge
                  badge-primary
                  mb-4
                "
              >
                Featured Blog
              </span>

              <h1
                className="
                  text-3xl
                  md:text-5xl
                  font-bold
                  max-w-4xl
                "
              >
                {blog.title}
              </h1>

            </div>

          </div>

          {/* Content */}

          <div className="p-6 md:p-10">

            {/* Author */}

            <div
              className="
                flex
                justify-between
                items-center
                flex-wrap
                gap-4
                border-b
                border-base-300
                pb-6
                mb-8
              "
            >

              <div
                className="
                  flex
                  items-center
                  gap-4
                "
              >

                <div
                  className="
                    w-14
                    h-14
                    rounded-full
                    bg-primary
                    text-white
                    flex
                    items-center
                    justify-center
                    text-xl
                    font-bold
                  "
                >
                  {blog.author?.charAt(0)}
                </div>

                <div>

                  <h3
                    className="
                      text-lg
                      font-bold
                    "
                  >
                    {blog.author}
                  </h3>

                  <p
                    className="
                      text-sm
                      text-base-content/60
                    "
                  >
                    📅 {blog.publishDate}
                  </p>

                </div>

              </div>

              <div
                className="
                  badge
                  badge-outline
                  badge-lg
                "
              >
                ⏱ {readingTime} min read
              </div>

            </div>

            {/* Short Description */}

            <div
              className="
                bg-base-200
                rounded-2xl
                p-6
                mb-8
              "
            >

              <p
                className="
                  italic
                  text-lg
                  text-base-content/80
                "
              >
                {blog.shortDescription}
              </p>

            </div>

            {/* Article */}

            <div
              className="
                text-lg
                leading-9
                text-base-content/80
                space-y-6
              "
            >

              {blog.content
                ?.split("\n")
                .map(
                  (
                    paragraph,
                    index
                  ) => (

                    <p key={index}>
                      {paragraph}
                    </p>

                  )
                )}

            </div>

            {/* Footer */}

            <div
              className="
                mt-12
                pt-8
                border-t
                border-base-300
                flex
                justify-between
                items-center
                flex-wrap
                gap-4
              "
            >

              <p
                className="
                  text-base-content/60
                "
              >
                Thanks for reading ❤️
              </p>

              <button
                onClick={closeModal}
                className="
                  btn
                  btn-primary
                  px-8
                "
              >
                Close Article
              </button>

            </div>

          </div>

        </div>

      </div>

      {/* Backdrop Click */}

      <div
        className="
          absolute
          inset-0
          -z-10
        "
        onClick={closeModal}
      />

    </div>

  );

};

export default BlogModal;