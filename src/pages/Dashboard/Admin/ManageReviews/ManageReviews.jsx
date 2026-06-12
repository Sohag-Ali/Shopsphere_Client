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
    <div className="mx-auto

    px-4
    sm:px-6
    lg:px-8

    space-y-6
    sm:space-y-8
    lg:space-y-10">

      {/* Header */}

     <div
  className="
    flex
    flex-col
    sm:flex-row

    sm:items-center
    justify-between

    gap-4

    mb-6
    sm:mb-8
  "
>
  {/* Left Content */}

  <div className="min-w-0">
    <h2
      className="
        text-2xl
        sm:text-3xl
        lg:text-4xl

        font-bold

        break-words
      "
    >
      Manage Reviews
    </h2>

    <p
      className="
        text-sm
        sm:text-base

        text-base-content/60

        mt-2
      "
    >
      Total Reviews:
      <span
        className="
          font-semibold
          ml-1
        "
      >
        {reviews.length}
      </span>
    </p>
  </div>

  {/* Right Badge */}

  <div
    className="
      self-start
      sm:self-auto
    "
  >
    <span
      className="
        badge
        badge-primary

        badge-md
        sm:badge-lg

        px-3
        sm:px-4
      "
    >
      {reviews.length} Reviews
    </span>
  </div>
</div>

      {/* Table */}

   {/* Desktop Table */}

<div
  className="
    hidden
    lg:block

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
        <th>Customer</th>
        <th>Product</th>
        <th>Rating</th>
        <th>Comment</th>
        <th>Date</th>
        <th>Actions</th>
      </tr>
    </thead>

    <tbody>
      {reviews.map((review) => (
        <tr key={review._id}>
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
                <h3 className="font-semibold">
                  {review.customerName}
                </h3>
              </div>
            </div>
          </td>

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
                {review.productTitle}
              </Link>
            ) : (
              <span>Product</span>
            )}
          </td>

          <td>
            <span
              className="
                badge
                badge-warning
              "
            >
              ⭐ {review.rating}
            </span>
          </td>

          <td className="max-w-xs">
            <p className="line-clamp-2">
              {review.comment}
            </p>
          </td>

          <td>
            {new Date(
              review.createdAt
            ).toLocaleDateString()}
          </td>

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
      ))}
    </tbody>
  </table>
</div>

{/* Mobile & Tablet Cards */}

<div
  className="
    grid
    grid-cols-1
    md:grid-cols-2
    gap-4
    lg:hidden
  "
>
  {reviews.map((review) => (
    <div
      key={review._id}
      className="
        bg-base-100
        rounded-3xl
        shadow-lg
        p-4
      "
    >
      {/* Customer */}

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
            w-14
            h-14
            rounded-full
            object-cover
          "
        />

        <div className="min-w-0">
          <h3
            className="
              font-bold
              truncate
            "
          >
            {review.customerName}
          </h3>

          <p
            className="
              text-xs
              text-base-content/60
            "
          >
            {new Date(
              review.createdAt
            ).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Product */}

      <div className="mt-4">
        <p
          className="
            text-xs
            text-base-content/60
          "
        >
          Product
        </p>

        {review.productTitle ? (
          <Link
            to={`/product/${review.productId}`}
            className="
              text-primary
              font-semibold
              hover:underline
              break-words
            "
          >
            {review.productTitle}
          </Link>
        ) : (
          <span>Product</span>
        )}
      </div>

      {/* Rating */}

      <div className="mt-3">
        <span
          className="
            badge
            badge-warning
          "
        >
          ⭐ {review.rating}
        </span>
      </div>

      {/* Comment */}

      <div
        className="
          mt-4
          bg-base-200
          rounded-xl
          p-3
        "
      >
        <p
          className="
            text-sm
            line-clamp-4
            break-words
          "
        >
          {review.comment}
        </p>
      </div>

      {/* Actions */}

      <div
        className="
          mt-4

          flex
          flex-col
          sm:flex-row

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
              flex-1
            "
          >
            View Product
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
            flex-1
          "
        >
          Delete
        </button>
      </div>
    </div>
  ))}
</div>

    </div>
  );
};

export default ManageReviews;