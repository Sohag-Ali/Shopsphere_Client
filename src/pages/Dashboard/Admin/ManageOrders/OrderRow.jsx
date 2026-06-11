const OrderRow = ({
  order,
  handleDelete,
  handleStatusChange,
}) => {

  return (

    <tr>

      <td>

        <div
          className="
            flex
            items-center
            gap-3
          "
        >

          <img
            src={order.productImage}
            alt=""
            className="
              w-14
              h-14
              rounded-xl
              object-cover
            "
          />

          <div>

            <h3 className="font-semibold">
              {order.productTitle}
            </h3>

          </div>

        </div>

      </td>

      <td>

        <div>

          <p className="font-medium">
            {order.userName}
          </p>

          <p
            className="
              text-xs
              text-base-content/60
            "
          >
            {order.userEmail}
          </p>

        </div>

      </td>

      <td>
        ৳ {order.price}
      </td>

      <td>

        <span className="badge badge-primary">
          {order.quantity}
        </span>

      </td>

      <td>

        ৳ {
          order.totalPrice ||
          order.price *
          order.quantity
        }

      </td>

      <td>

        <span
          className={`
            badge

            ${
              order.status === "Delivered"
                ? "badge-success"
                : order.status === "Cancelled"
                ? "badge-error"
                : "badge-warning"
            }
          `}
        >

          {order.status}

        </span>

      </td>

      <td>

        <div className="flex gap-2">

          <select
            className="
              select
              select-bordered
              select-sm
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