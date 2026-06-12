const OrderRow = ({
  order,
  handleDelete,
  handleStatusChange,
}) => {
  return (
    <tr>
      {/* Product */}

      <td>
        <div
          className="
            flex
            items-center
            gap-3

            min-w-[220px]
          "
        >
          <img
            src={order.productImage}
            alt=""
            className="
              w-12
              h-12
              lg:w-14
              lg:h-14

              rounded-xl
              object-cover

              flex-shrink-0
            "
          />

          <div className="min-w-0">
            <h3
              className="
                font-semibold

                line-clamp-2
                break-words
              "
            >
              {order.productTitle}
            </h3>
          </div>
        </div>
      </td>

      {/* Customer */}

      <td>
        <div
          className="
            min-w-[180px]
          "
        >
          <p
            className="
              font-medium
              break-words
            "
          >
            {order.userName}
          </p>

          <p
            className="
              text-xs
              text-base-content/60

              break-all
            "
          >
            {order.userEmail}
          </p>
        </div>
      </td>

      {/* Price */}

      <td>
        <span className="font-medium">
          ৳ {order.price}
        </span>
      </td>

      {/* Quantity */}

      <td>
        <span
          className="
            badge
            badge-primary
          "
        >
          {order.quantity}
        </span>
      </td>

      {/* Total */}

      <td>
        <span className="font-semibold">
          ৳{" "}
          {order.totalPrice ||
            order.price *
              order.quantity}
        </span>
      </td>

      {/* Status */}

      <td>
        <span
          className={`
            badge

            ${
              order.status ===
              "Delivered"
                ? "badge-success"
                : order.status ===
                  "Cancelled"
                ? "badge-error"
                : "badge-warning"
            }
          `}
        >
          {order.status}
        </span>
      </td>

      {/* Actions */}

      <td>
        <div
          className="
            flex
            flex-col
            xl:flex-row

            gap-2

            min-w-[180px]
          "
        >
          <select
            className="
              select
              select-bordered
              select-sm

              w-full
              xl:w-auto
            "
            defaultValue={
              order.status
            }
            onChange={(e) =>
              handleStatusChange(
                order._id,
                e.target.value
              )
            }
          >
            <option>
              Pending
            </option>

            <option>
              Processing
            </option>

            <option>
              Shipped
            </option>

            <option>
              Delivered
            </option>

            <option>
              Cancelled
            </option>
          </select>

          <button
            onClick={() =>
              handleDelete(
                order._id
              )
            }
            className="
              btn
              btn-error
              btn-sm

              w-full
              xl:w-auto
            "
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

export default OrderRow;