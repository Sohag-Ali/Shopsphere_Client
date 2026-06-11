const OrderRow = ({
  order,
  handleStatusChange,
  handleDelete,
}) => {

  return (
    <tr>

      <td>

        <img
          src={order.productImage}
          alt={order.productTitle}
          className="
            w-14
            h-14
            rounded-xl
            object-cover
          "
        />

      </td>

      <td>

        <div>

          <h3 className="font-semibold">
            {order.customerName}
          </h3>

          <p className="text-xs text-gray-500">
            {order.userEmail}
          </p>

        </div>

      </td>

      <td>

        {order.productTitle}

      </td>

      <td>

        ৳ {order.price}

      </td>

      <td>

        <select
          value={order.status}
          onChange={(e) =>
            handleStatusChange(
              order._id,
              e.target.value
            )
          }
          className="
            select
            select-bordered
            select-sm
          "
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

        </select>

      </td>

      <td>

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

      </td>

    </tr>
  );
};

export default OrderRow;