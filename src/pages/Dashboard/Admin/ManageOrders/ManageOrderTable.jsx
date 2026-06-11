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
                h-16
                w-full
              "
            ></div>

          )
        )}

      </div>

    );

  }

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

              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {orders.map((order) => (

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

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

};

export default ManageOrdersTable;