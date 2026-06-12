import OrdersTable from "../../../../coponents/Table/OrdersTable";

const RecentOrders = ({
  orders,
}) => {
  return (
    <div
      className="
        bg-base-100
        rounded-3xl
        shadow-xl

        p-4
        sm:p-6
        lg:p-8
      "
    >
      {/* Header */}

      <div
        className="
          flex
          flex-col
          sm:flex-row

          sm:items-center
          justify-between

          gap-3

          mb-5
          sm:mb-6
        "
      >
        <h2
          className="
            text-xl
            sm:text-2xl
            font-bold
          "
        >
          Recent Orders
        </h2>

        <span
          className="
            badge
            badge-primary

            badge-md
            sm:badge-lg

            self-start
            sm:self-auto
          "
        >
          {orders?.length || 0} Orders
        </span>
      </div>

      {/* Orders */}

      {orders?.length > 0 ? (
        <OrdersTable
          orders={orders}
          loading={false}
        />
      ) : (
        <div
          className="
            text-center

            py-10
            sm:py-16

            bg-base-200/40
            rounded-2xl
          "
        >
          <div
            className="
              text-4xl
              sm:text-5xl
              mb-3
            "
          >
            📦
          </div>

          <h3
            className="
              text-lg
              sm:text-xl
              font-semibold
            "
          >
            No Recent Orders
          </h3>

          <p
            className="
              text-sm
              sm:text-base
              text-base-content/60
              mt-2
            "
          >
            Your recent orders will appear here.
          </p>
        </div>
      )}
    </div>
  );
};

export default RecentOrders;