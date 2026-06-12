const RecentOrdersTable = ({
  orders,
}) => {
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
              </tr>
            </thead>

            <tbody>
              {orders?.map(
                (order) => (
                  <tr
                    key={order._id}
                  >
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
                            order.productImage
                          }
                          alt={
                            order.productTitle
                          }
                          className="
                            w-12
                            h-12
                            rounded-xl
                            object-cover
                          "
                        />

                        <span
                          className="
                            font-medium
                            line-clamp-2
                          "
                        >
                          {
                            order.productTitle
                          }
                        </span>
                      </div>
                    </td>

                    <td>
                      <span className="break-all">
                        {
                          order.userEmail
                        }
                      </span>
                    </td>

                    <td>
                      ৳ {order.price}
                    </td>

                    <td>
                      <span
                        className="
                          badge
                          badge-primary
                        "
                      >
                        {
                          order.quantity
                        }
                      </span>
                    </td>

                    <td>
                      ৳{" "}
                      {order.totalPrice ||
                        order.price *
                          order.quantity}
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
        {orders?.map(
          (order) => (
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

              <div
                className="
                  flex
                  gap-3
                  items-center
                "
              >
                <img
                  src={
                    order.productImage
                  }
                  alt={
                    order.productTitle
                  }
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
                    {
                      order.productTitle
                    }
                  </h3>

                  <p
                    className="
                      text-xs
                      text-base-content/60
                      break-all
                    "
                  >
                    {
                      order.userEmail
                    }
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
                  <p
                    className="
                      text-xs
                      text-base-content/60
                    "
                  >
                    Price
                  </p>

                  <p>
                    ৳ {order.price}
                  </p>
                </div>

                <div>
                  <p
                    className="
                      text-xs
                      text-base-content/60
                    "
                  >
                    Quantity
                  </p>

                  <span
                    className="
                      badge
                      badge-primary
                    "
                  >
                    {
                      order.quantity
                    }
                  </span>
                </div>

                <div>
                  <p
                    className="
                      text-xs
                      text-base-content/60
                    "
                  >
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
                  <p
                    className="
                      text-xs
                      text-base-content/60
                    "
                  >
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
            </div>
          )
        )}
      </div>
    </>
  );
};

export default RecentOrdersTable;