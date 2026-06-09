import { useEffect, useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";


const MyReviews = () => {

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [reviews, setReviews] =
    useState([]);

  useEffect(() => {

    if (user?.email) {

      axiosSecure
        .get(
          `/my-reviews/${user.email}`
        )
        .then((res) => {

          setReviews(
            res.data
          );

        });

    }

  }, [
    user,
    axiosSecure
  ]);

  const handleDelete = (id) => {

    axiosSecure
      .delete(`/reviews/${id}`)
      .then(() => {

        const remaining =
          reviews.filter(
            review =>
              review._id !== id
          );

        setReviews(
          remaining
        );

      });

  };

  return (
    <div>

      <h2
        className="
          text-3xl
          font-bold
          mb-8
        "
      >
        My Reviews
      </h2>

      {
        reviews.length === 0
          ? (
            <div
              className="
                text-center
                py-20
              "
            >
              <h3
                className="
                  text-2xl
                  font-semibold
                "
              >
                No Reviews Found
              </h3>
            </div>
          )
          : (
            <div
              className="
                space-y-6
              "
            >

              {
                reviews.map(
                  (review) => (

                    <div
                      key={review._id}
                      className="
                        bg-base-100
                        rounded-2xl
                        shadow-md
                        p-6
                      "
                    >

                      <div
                        className="
                          flex
                          justify-between
                          items-center
                        "
                      >

                        <div>

                          <h3
                            className="
                              text-xl
                              font-bold
                            "
                          >
                            {
                              review.productTitle
                            }
                          </h3>

                          <p
                            className="
                              text-sm
                              text-gray-500
                            "
                          >
                            {
                              review.createdAt
                            }
                          </p>

                        </div>

                        <div
                          className="
                            badge
                            badge-warning
                          "
                        >
                          ⭐
                          {
                            review.rating
                          }
                        </div>

                      </div>

                      <p
                        className="
                          mt-4
                          text-base-content/80
                        "
                      >
                        {
                          review.comment
                        }
                      </p>

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
                          mt-4
                        "
                      >
                        Delete Review
                      </button>

                    </div>

                  )
                )
              }

            </div>
          )
      }

    </div>
  );
};

export default MyReviews;