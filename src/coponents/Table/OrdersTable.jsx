const OrdersTable = ({
  orders,
  loading,
}) => {

  if (loading) {

    return (

      <div className="space-y-4">

        {[...Array(6)].map((_, index) => (

          <div
            key={index}
            className="skeleton h-16 w-full"
          ></div>

        ))}

      </div>

    );

  }

  return (

    <div className="bg-base-100 rounded-3xl shadow-xl overflow-hidden">

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

                  {
                    new Date(
                      order.orderDate
                    ).toLocaleDateString()
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

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

};

export default OrdersTable;