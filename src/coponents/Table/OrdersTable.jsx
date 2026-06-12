const OrdersTable = ({
  orders = [],
  loading,
}) => {

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="skeleton h-20 w-full rounded-2xl"
          />
        ))}
      </div>
    );
  }

  if (!orders?.length) {
    return (
      <div
        className="
          bg-base-100
          rounded-3xl
          shadow-xl
          p-10
          text-center
        "
      >
        <h3 className="text-xl font-semibold">
          No Orders Found
        </h3>

        <p className="text-base-content/60 mt-2">
          You haven't placed any orders yet.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Mobile Cards */}

      <div className="lg:hidden space-y-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className="
              bg-base-100
              rounded-2xl
              shadow-lg
              p-4
            "
          >
            <div className="flex gap-4">
              <img
                src={order.productImage}
                alt={order.productTitle}
                className="
                  w-20
                  h-20
                  rounded-xl
                  object-cover
                  flex-shrink-0
                "
              />

              <div className="flex-1 min-w-0">
                <h3
                  className="
                    font-semibold
                    text-sm
                    sm:text-base
                    line-clamp-2
                  "
                >
                  {order.productTitle}
                </h3>

                <div className="mt-3 space-y-1 text-sm">
                  <p>
                    <span className="font-medium">
                      Price:
                    </span>{" "}
                    ৳ {order.price}
                  </p>

                  <p>
                    <span className="font-medium">
                      Quantity:
                    </span>{" "}
                    {order.quantity}
                  </p>

                  <p>
                    <span className="font-medium">
                      Total:
                    </span>{" "}
                    ৳{" "}
                    {order.totalPrice ||
                      order.price *
                        order.quantity}
                  </p>

                  <p>
                    <span className="font-medium">
                      Date:
                    </span>{" "}
                    {new Date(
                      order.orderDate
                    ).toLocaleDateString()}
                  </p>
                </div>

                <div className="mt-3">
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
            </div>
          </div>
        ))}
      </div>

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
                <th>Price</th>
                <th>Qty</th>
                <th>Total</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>
                    <div className="flex items-center gap-3">
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

                      <div>
                        <h3 className="font-semibold">
                          {order.productTitle}
                        </h3>
                      </div>
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
                    ৳{" "}
                    {order.totalPrice ||
                      order.price *
                        order.quantity}
                  </td>

                  <td>
                    {new Date(
                      order.orderDate
                    ).toLocaleDateString()}
                  </td>

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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default OrdersTable;