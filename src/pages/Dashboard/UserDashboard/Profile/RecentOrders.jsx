const RecentOrders = ({
  orders
}) => {

  return (

    <div
      className="
      bg-base-100
      rounded-2xl
      shadow
      p-6
    "
    >

      <h2
        className="
        text-2xl
        font-bold
        mb-5
      "
      >
        Recent Orders
      </h2>

      <div className="space-y-4">

        {orders?.map(
          (order) => (

            <div
              key={order._id}
              className="
              flex
              justify-between
              items-center
              border-b
              pb-3
            "
            >

              <div>

                <h3>
                  {order.productTitle}
                </h3>

                <p>
                  Qty:
                  {order.quantity}
                </p>

              </div>

              <div>

                <p>
                  ৳
                  {order.totalPrice}
                </p>

                <span className="badge badge-success">
                  {order.status}
                </span>

              </div>

            </div>

          )
        )}

      </div>

    </div>

  );
};

export default RecentOrders;