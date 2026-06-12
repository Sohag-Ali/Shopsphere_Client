import OrderRow from "./OrderRow";

const ManageOrdersTable = ({
  orders,
  loading,
  handleDelete,
  handleStatusChange,
}) => {
  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(6)].map(
          (_, index) => (
            <div
              key={index}
              className="
                skeleton
                h-20
                w-full
                rounded-2xl
              "
            />
          )
        )}
      </div>
    );
  }

  return (
    <>
      {/* Desktop Table */}

      <div
        className="
          hidden
          lg:block

          bg-base-100
          rounded-3xl
          shadow-xl
          overflow-hidden
        "
      >
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Customer</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Total</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {orders.map(
                (order) => (
                  <OrderRow
                    key={order._id}
                    order={order}
                    handleDelete={
                      handleDelete
                    }
                    handleStatusChange={
                      handleStatusChange
                    }
                  />
                )
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile + Tablet Cards */}

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-4
          lg:hidden
        "
      >
        {orders.map((order) => (
          <div
            key={order._id}
            className="
              bg-base-100
              rounded-3xl
              shadow-xl
              p-4
            "
          >
            {/* Product */}

            <div className="flex gap-3">
              <img
                src={order.productImage}
                alt=""
                className="
                  w-16
                  h-16
                  rounded-xl
                  object-cover
                "
              />

              <div className="min-w-0">
                <h3
                  className="
                    font-bold
                    line-clamp-2
                  "
                >
                  {order.productTitle}
                </h3>

                <p
                  className="
                    text-sm
                    text-base-content/60
                  "
                >
                  {order.customerName}
                </p>
              </div>
            </div>

            {/* Details */}

            <div
              className="
                grid
                grid-cols-2
                gap-3
                mt-4
              "
            >
              <div>
                <p className="text-xs text-base-content/60">
                  Price
                </p>
                <p>
                  ৳ {order.price}
                </p>
              </div>

              <div>
                <p className="text-xs text-base-content/60">
                  Quantity
                </p>
                <p>
                  {order.quantity}
                </p>
              </div>

              <div>
                <p className="text-xs text-base-content/60">
                  Total
                </p>
                <p>
                  ৳{" "}
                  {order.totalPrice ||
                    order.price *
                      order.quantity}
                </p>
              </div>

              <div>
                <p className="text-xs text-base-content/60">
                  Status
                </p>

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
              </div>
            </div>

            {/* Status Change */}

            <div className="mt-4">
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
                  w-full
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
                <option>
                  Cancelled
                </option>
              </select>
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
                  flex-1
                "
              >
                Delete Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ManageOrdersTable;