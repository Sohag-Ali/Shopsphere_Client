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
        p-6
      "
    >

      <div
        className="
          flex
          justify-between
          items-center
          mb-6
        "
      >

        <h2
          className="
            text-2xl
            font-bold
          "
        >
          Recent Orders
        </h2>

        <span
          className="
            badge
            badge-primary
            badge-lg
          "
        >
          {orders?.length} Orders
        </span>

      </div>

      <OrdersTable
        orders={orders || []}
        loading={false}
      />

    </div>

  );

};

export default RecentOrders;