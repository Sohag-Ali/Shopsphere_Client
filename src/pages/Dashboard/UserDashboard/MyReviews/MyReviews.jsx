import { useEffect, useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const MyReviews = () => {

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [reviews, setReviews] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    if (user?.email) {

      axiosSecure
        .get(`/my-reviews/${user.email}`)
        .then((res) => {

          setReviews(res.data);

        })
        .finally(() => {

          setLoading(false);

        });

    }

  }, [user, axiosSecure]);

  const handleDelete = async (id) => {

    try {

      await axiosSecure.delete(
        `/reviews/${id}`
      );

      setReviews(
        reviews.filter(
          review =>
            review._id !== id
        )
      );

    } catch (error) {

      console.log(error);

    }

  };

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce(
            (sum, review) =>
              sum +
              Number(review.rating),
            0
          ) / reviews.length
        ).toFixed(1)
      : 0;

  return (

    <div>

      {/* Header */}

      <div className="mb-10">

        <h1
          className="
            text-4xl
            font-bold
          "
        >
          My Reviews
        </h1>

        <p
          className="
            text-base-content/60
            mt-2
          "
        >
          Manage all your product reviews
        </p>

      </div>

      {/* Stats */}

      <div
        className="
          grid
          md:grid-cols-2
          gap-6
          mb-10
        "
      >

        <div
          className="
            bg-base-100
            rounded-3xl
            shadow-xl
            p-6
          "
        >

          <p
            className="
              text-base-content/60
            "
          >
            Total Reviews
          </p>

          <h2
            className="
              text-5xl
              font-bold
              text-primary
              mt-3
            "
          >
            {reviews.length}
          </h2>

        </div>

        <div
          className="
            bg-base-100
            rounded-3xl
            shadow-xl
            p-6
          "
        >

          <p
            className="
              text-base-content/60
            "
          >
            Average Rating
          </p>

          <h2
            className="
              text-5xl
              font-bold
              text-warning
              mt-3
            "
          >
            ⭐ {averageRating}
          </h2>

        </div>

      </div>

      {/* Loading */}

      {loading && (

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-3
            gap-8
          "
        >

          {[...Array(6)].map(
            (_, index) => (

              <div
                key={index}
                className="
                  skeleton
                  h-72
                  rounded-3xl
                "
              ></div>

            )
          )}

        </div>

      )}

      {/* Empty State */}

      {!loading &&
        reviews.length === 0 && (

        <div
          className="
            bg-base-100
            rounded-3xl
            shadow-xl
            py-20
            text-center
          "
        >

          <div className="text-6xl">
            ⭐
          </div>

          <h2
            className="
              text-3xl
              font-bold
              mt-4
            "
          >
            No Reviews Yet
          </h2>

          <p
            className="
              text-base-content/60
              mt-3
            "
          >
            Start reviewing products
            you've purchased.
          </p>

        </div>

      )}

      {/* Reviews */}

      {!loading &&
        reviews.length > 0 && (

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-3
            gap-8
          "
        >

          {reviews.map(
            (review) => (

              <div
                key={review._id}
                className="
                  bg-base-100
                  rounded-3xl
                  shadow-xl
                  border
                  border-base-300
                  hover:shadow-2xl
                  hover:-translate-y-1
                  transition-all
                  duration-300
                "
              >

                <div className="p-6">

                  {/* Product */}

                  <div
                    className="
                      flex
                      gap-4
                    "
                  >

                    <img
                      src={
                        review.productImage
                      }
                      alt=""
                      className="
                        w-20
                        h-20
                        rounded-2xl
                        object-cover
                      "
                    />

                    <div
                      className="
                        flex-1
                      "
                    >

                      <h3
                        className="
                          font-bold
                          text-lg
                          line-clamp-2
                        "
                      >
                        {
                          review.productTitle
                        }
                      </h3>

                      <div
                        className="
                          flex
                          flex-wrap
                          gap-2
                          mt-3
                        "
                      >

                        <span
                          className="
                            badge
                            badge-warning
                          "
                        >
                          ⭐
                          {
                            review.rating
                          }
                          /5
                        </span>

                        <span
                          className="
                            badge
                            badge-outline
                          "
                        >
                          {
                            new Date(
                              review.createdAt
                            ).toLocaleDateString()
                          }
                        </span>

                      </div>

                    </div>

                  </div>

                  {/* Review Text */}

                  <div
                    className="
                      bg-base-200
                      rounded-2xl
                      p-4
                      mt-6
                    "
                  >

                    <p
                      className="
                        text-base-content/80
                        leading-relaxed
                        line-clamp-4
                      "
                    >
                      "
                      {
                        review.comment
                      }
                      "
                    </p>

                  </div>

                  {/* Footer */}

                  <div
                    className="
                      flex
                      justify-end
                      mt-6
                    "
                  >

                    <button
                      onClick={() =>
                        handleDelete(
                          review._id
                        )
                      }
                      className="
                        btn
                        btn-error
                        btn-sm
                        rounded-xl
                      "
                    >
                      🗑 Delete Review
                    </button>

                  </div>

                </div>

              </div>

            )
          )}

        </div>

      )}

    </div>

  );

};

export default MyReviews;