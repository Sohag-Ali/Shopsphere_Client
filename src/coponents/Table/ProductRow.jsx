import { Link } from "react-router";

const ProductRow = ({
  product,
  handleDelete,
  handleMakeDeal,
  handleRemoveDeal,
}) => {
  return (
    <tr>
      {/* Image */}

      <td>
        <img
          src={product.images[0]}
          alt=""
          className="
            w-12
            h-12
            lg:w-16
            lg:h-16

            rounded-xl
            object-cover
          "
        />
      </td>

      {/* Title */}

      <td>
        <h3
          className="
            font-semibold

            max-w-[200px]
            lg:max-w-[250px]

            line-clamp-2
            break-words
          "
        >
          {product.title}
        </h3>
      </td>

      {/* Category */}

      <td>
        <span className="whitespace-nowrap">
          {product.category}
        </span>
      </td>

      {/* Price */}

      <td>
        {product.isDeal ? (
          <div className="min-w-[90px]">
            <span
              className="
                line-through
                text-gray-400
                text-sm
              "
            >
              ৳ {product.price}
            </span>

            <br />

            <span
              className="
                text-red-500
                font-bold
              "
            >
              ৳
              {
                product.discountPrice
              }
            </span>
          </div>
        ) : (
          <span className="font-medium">
            ৳ {product.price}
          </span>
        )}
      </td>

      {/* Stock */}

      <td>
        <span
          className="
            badge
            badge-primary
          "
        >
          {product.stock}
        </span>
      </td>

      {/* Deal Status */}

      <td>
        {product.isDeal ? (
          <span
            className="
              badge
              badge-error
            "
          >
            Deal
          </span>
        ) : (
          <span
            className="
              badge
              badge-info
            "
          >
            Normal
          </span>
        )}
      </td>

      {/* Actions */}

      <td>
        <div
          className="
            flex
            flex-col
            xl:flex-row

            gap-2

            min-w-[160px]
          "
        >
          {!product.isDeal ? (
            <button
              onClick={() =>
                handleMakeDeal(
                  product
                )
              }
              className="
                btn
                btn-success
                btn-xs
                lg:btn-sm
              "
            >
              Make Deal
            </button>
          ) : (
            <button
              onClick={() =>
                handleRemoveDeal(
                  product._id
                )
              }
              className="
                btn
                btn-warning
                btn-xs
                lg:btn-sm
              "
            >
              Remove Deal
            </button>
          )}

          <Link
            to={`/dashboard/update-product/${product._id}`}
            className="
              btn
              btn-info
              btn-xs
              lg:btn-sm
            "
          >
            Edit
          </Link>

          <button
            onClick={() =>
              handleDelete(
                product._id
              )
            }
            className="
              btn
              btn-error
              btn-xs
              lg:btn-sm
            "
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ProductRow;