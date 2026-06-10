import { useEffect, useState } from "react";
import { Link } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const ManageReviews = () => {

  const axiosSecure = useAxiosSecure();

  const [reviews, setReviews] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const loadReviews = () => {

    axiosSecure
      .get("/admin/reviews")
      .then((res) => {

        setReviews(
          res.data
        );

      })
      .catch((error) => {

        console.log(error);

      })
      .finally(() => {

        setLoading(false);

      });

  };

  useEffect(() => {

    loadReviews();

  }, []);

  const handleDelete =
    async (id) => {

      const result =
        await Swal.fire({

          title:
            "Delete Review?",

          text:
            "This review will be removed permanently.",

          icon:
            "warning",

          showCancelButton:
            true,

          confirmButtonText:
            "Delete",

        });

      if (
        !result.isConfirmed
      )
        return;

      try {

        const res =
          await axiosSecure.delete(
            `/reviews/${id}`
          );

        if (
          res.data.deletedCount
        ) {

          Swal.fire({

            icon:
              "success",

            title:
              "Review Deleted",

            timer:
              1200,

            showConfirmButton:
              false,

          });

          setReviews(
            reviews.filter(
              (review) =>
                review._id !== id
            )
          );

        }

      } catch (error) {

        console.log(error);

      }

    };

  if (loading) {

    return (
      <div
        className="
          flex
          justify-center
          items-center
          h-[60vh]
        "
      >

        <span
          className="
            loading
            loading-spinner
            loading-lg
          "
        ></span>

      </div>
    );

  }

  return (
    <div>

      {/* Header */}

      <div
        className="
          flex
          justify-between
          items-center
          mb-8
        "
      >

        <div>

          <h2
            className="
              text-3xl
              font-bold
            "
          >
            Manage Reviews
          </h2>

          <p
            className="
              text-gray-500
              mt-2
            "
          >
            Total Reviews:
            {reviews.length}
          </p>

        </div>

      </div>

      {/* Table */}

      <div
        className="
          bg-base-100
          rounded-2xl
          shadow-lg
          overflow-x-auto
        "
      >

        <table
          className="
            table
            table-zebra
          "
        >

          <thead>

            <tr>

              <th>
                Customer
              </th>

              <th>
                Product
              </th>

              <th>
                Rating
              </th>

              <th>
                Comment
              </th>

              <th>
                Date
              </th>

              <th>
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {reviews.map(
              (review) => (

                <tr
                  key={review._id}
                >

                  {/* Customer */}

                  <td>

                    <div
                      className="
                        flex
                        items-center
                        gap-3
                      "
                    >

                      <img
                        src={
                          review.customerImage ||
                          "https://i.ibb.co/4pDNDk1/avatar.png"
                        }
                        alt=""
                        className="
                          w-12
                          h-12
                          rounded-full
                          object-cover
                        "
                      />

                      <div>

                        <h3
                          className="
                            font-semibold
                          "
                        >
                          {
                            review.customerName
                          }
                        </h3>

                      </div>

                    </div>

                  </td>

                  {/* Product */}

                  <td>

                    {review.productTitle ? (

                      <Link
                        to={`/product/${review.productId}`}
                        className="
                          text-primary
                          font-semibold
                          hover:underline
                        "
                      >
                        {
                          review.productTitle
                        }
                      </Link>

                    ) : (

                      <span>
                        Product
                      </span>

                    )}

                  </td>

                  {/* Rating */}

                  <td>

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
                    </span>

                  </td>

                  {/* Comment */}

                  <td
                    className="
                      max-w-sm
                    "
                  >

                    {
                      review.comment
                    }

                  </td>

                  {/* Date */}

                  <td>

                    {new Date(
                      review.createdAt
                    ).toLocaleDateString()}

                  </td>

                  {/* Actions */}

                  <td>

                    <div
                      className="
                        flex
                        gap-2
                      "
                    >

                      {review.productId && (

                        <Link
                          to={`/product/${review.productId}`}
                          className="
                            btn
                            btn-primary
                            btn-sm
                          "
                        >
                          View
                        </Link>

                      )}

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
                        "
                      >
                        Delete
                      </button>

                    </div>

                  </td>

                </tr>

              )
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default ManageReviews;