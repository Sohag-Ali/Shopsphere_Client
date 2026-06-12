import { useEffect, useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useTitle from "../../../../hooks/useTitle";

const MyReviews = () => {
  useTitle("My Reviews");
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/my-reviews/${user.email}`)
        .then((res) => {
          setReviews(res.data);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [user, axiosSecure]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Review?",
      text: "This review will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      await axiosSecure.delete(`/reviews/${id}`);

      setReviews(
        reviews.filter(
          (review) => review._id !== id
        )
      );

      Swal.fire({
        icon: "success",
        title: "Review Deleted 🗑️",
        text: "Your review has been removed successfully.",
        confirmButtonColor: "#8B5CF6",
      });
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Delete Failed",
        text: "Something went wrong. Please try again.",
        confirmButtonColor: "#ef4444",
      });
    }
  };

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce(
            (sum, review) =>
              sum + Number(review.rating),
            0
          ) / reviews.length
        ).toFixed(1)
      : 0;

  return (
    <div className="mx-auto

    px-4
    sm:px-6
    lg:px-8

    space-y-6
    sm:space-y-8
    lg:space-y-10">
      {/* Header */}

      <div className="mb-8 sm:mb-10">
        <h1
          className="
            text-2xl
            sm:text-3xl
            md:text-4xl
            font-bold
          "
        >
          My Reviews
        </h1>

        <p
          className="
            text-sm
            sm:text-base
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
          grid-cols-1
          sm:grid-cols-2
          gap-4
          sm:gap-6
          mb-8
          sm:mb-10
        "
      >
        <div
          className="
            bg-base-100
            rounded-3xl
            shadow-xl
            p-4
            sm:p-6
          "
        >
          <p className="text-base-content/60">
            Total Reviews
          </p>

          <h2
            className="
              text-3xl
              sm:text-4xl
              lg:text-5xl
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
            p-4
            sm:p-6
          "
        >
          <p className="text-base-content/60">
            Average Rating
          </p>

          <h2
            className="
              text-3xl
              sm:text-4xl
              lg:text-5xl
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
            sm:grid-cols-2
            xl:grid-cols-3
            gap-4
            sm:gap-6
          "
        >
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="
                skeleton
                h-72
                rounded-3xl
              "
            />
          ))}
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
              py-12
              sm:py-20
              px-4
              text-center
            "
          >
            <div
              className="
                text-5xl
                sm:text-6xl
              "
            >
              ⭐
            </div>

            <h2
              className="
                text-2xl
                sm:text-3xl
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
                max-w-md
                mx-auto
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
              sm:grid-cols-2
              xl:grid-cols-3
              gap-4
              sm:gap-6
            "
          >
            {reviews.map((review) => (
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
                  h-full
                  flex
                  flex-col
                "
              >
                <div
                  className="
                    p-4
                    sm:p-6
                    flex
                    flex-col
                    h-full
                  "
                >
                  {/* Product */}

                  <div
                    className="
                      flex
                      flex-col
                      sm:flex-row
                      gap-4
                    "
                  >
                    <img
                      src={review.productImage}
                      alt={review.productTitle}
                      className="
                        w-full
                        h-48
                        sm:w-20
                        sm:h-20
                        rounded-2xl
                        object-cover
                        flex-shrink-0
                      "
                    />

                    <div className="flex-1">
                      <h3
                        className="
                          font-bold
                          text-base
                          sm:text-lg
                          line-clamp-2
                        "
                      >
                        {review.productTitle}
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
                            badge-sm
                            sm:badge-md
                          "
                        >
                          ⭐ {review.rating}/5
                        </span>

                        <span
                          className="
                            badge
                            badge-outline
                            badge-sm
                            sm:badge-md
                          "
                        >
                          {new Date(
                            review.createdAt
                          ).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Review Text */}

                  <div
                    className="
                      bg-base-200
                      rounded-2xl
                      p-3
                      sm:p-4
                      mt-6
                    "
                  >
                    <p
                      className="
                        text-sm
                        sm:text-base
                        text-base-content/80
                        leading-relaxed
                        line-clamp-5
                      "
                    >
                      "{review.comment}"
                    </p>
                  </div>

                  {/* Footer */}

                  <div
                    className="
                      mt-auto
                      pt-6
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
                        sm:btn-md
                        rounded-xl
                        w-full
                      "
                    >
                      🗑 Delete Review
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
    </div>
  );
};

export default MyReviews;