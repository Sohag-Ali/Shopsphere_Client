import { Link } from "react-router";

const ReviewRow = ({
  review,
  handleDelete,
}) => {

  return (
    <tr>

      {/* Customer */}

      <td>

        <div className="flex items-center gap-3">

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

      {/* Product */}

      <td>

        <Link
          to={`/product/${review.productId}`}
          className="
            font-semibold
            text-blue-500
            hover:underline
          "
        >
          {review.productTitle}
        </Link>

      </td>

      {/* Rating */}

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

      {/* Comment */}

      <td
        className="
          max-w-xs
          truncate
        "
      >
        {review.comment}
      </td>

      {/* Date */}

      <td>

        {new Date(
          review.createdAt
        ).toLocaleDateString()}

      </td>

      {/* Actions */}

      <td>

        <div className="flex gap-2">

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
  );
};

export default ReviewRow;