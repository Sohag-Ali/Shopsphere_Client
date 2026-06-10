import { Link } from "react-router";

const ProductRow = ({
  product,
  handleDelete,
  handleMakeDeal,
  handleRemoveDeal,
}) => {

  return (
    <tr>

      <td>

        <img
          src={
            product.images[0]
          }
          alt=""
          className="
            w-16
            h-16
            rounded-xl
            object-cover
          "
        />

      </td>

      <td>

        <h3
          className="
            font-semibold
          "
        >
          {product.title}
        </h3>

      </td>

      <td>
        {product.category}
      </td>

      <td>

        {product.isDeal ? (

          <div>

            <span
              className="
                line-through
                text-gray-400
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
          <>৳ {product.price}</>
        )}

      </td>

      <td>
        {product.stock}
      </td>

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

      <td>

        <div
          className="
            flex
            gap-2
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
                btn-sm
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
                btn-sm
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
              btn-sm
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

export default ProductRow;