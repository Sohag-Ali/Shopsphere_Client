const OrderCard = ({
  order,
}) => {

  return (

    <div className="card bg-base-100 shadow-xl">

      <div className="card-body">

        <div className="flex gap-4">

          <img
            src={order.productImage}
            alt=""
            className="
              w-24
              h-24
              rounded-xl
              object-cover
            "
          />

          <div>

            <h2 className="font-bold text-lg">
              {order.productTitle}
            </h2>

            <p>
              Price:
              ৳ {order.price}
            </p>

            <p>
              Qty:
              {order.quantity}
            </p>

            <p>
              Total:
              ৳ {
                order.totalPrice ||
                order.price *
                order.quantity
              }
            </p>

          </div>

        </div>

        <div className="flex justify-between items-center mt-4">

          <span className="text-sm text-base-content/60">

            {
              new Date(
                order.orderDate
              ).toLocaleDateString()
            }

          </span>

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

        </div>

      </div>

    </div>

  );

};

export default OrderCard;