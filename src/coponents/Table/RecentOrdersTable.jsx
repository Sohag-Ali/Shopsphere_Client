const RecentOrdersTable = ({
  orders,
}) => {

  return (

    <div
      className="
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

            {orders?.map((order) => (

              <tr key={order._id}>

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
                      alt={order.productTitle}
                      className="
                        w-12
                        h-12
                        rounded-xl
                        object-cover
                      "
                    />

                    <span className="font-medium">
                      {order.productTitle}
                    </span>

                  </div>

                </td>

                <td>
                  {order.userEmail}
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

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

};

export default RecentOrdersTable;