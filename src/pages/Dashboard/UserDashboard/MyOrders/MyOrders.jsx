import { useEffect, useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import OrdersTable from "../../../../coponents/Table/OrdersTable";
import OrderCard from "../../../../coponents/Card/OrderCard";

const MyOrders = () => {

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    if (user?.email) {

      axiosSecure
        .get(`/my-orders/${user.email}`)
        .then((res) => {
          setOrders(res.data);
        })
        .finally(() => {
          setLoading(false);
        });

    }

  }, [user, axiosSecure]);

  const totalSpent = orders.reduce(
    (sum, order) =>
      sum +
      (order.totalPrice ||
        order.price * order.quantity),
    0
  );

  return (

    <div>

      {/* Header */}

      <div className="mb-8">

        <h1 className="text-4xl font-bold">
          My Orders
        </h1>

        <p className="text-base-content/60 mt-2">
          Track and manage your purchases
        </p>

      </div>

      {/* Stats */}

      <div className="grid md:grid-cols-2 gap-6 mb-8">

        <div className="card bg-base-100 shadow-xl">

          <div className="card-body">

            <h3 className="text-lg font-semibold">
              Total Orders
            </h3>

            <p className="text-4xl font-bold text-primary">
              {orders.length}
            </p>

          </div>

        </div>

        <div className="card bg-base-100 shadow-xl">

          <div className="card-body">

            <h3 className="text-lg font-semibold">
              Total Spending
            </h3>

            <p className="text-4xl font-bold text-success">
              ৳ {totalSpent}
            </p>

          </div>

        </div>

      </div>

      {/* Desktop Table */}

      <div className="hidden lg:block">

        <OrdersTable
          orders={orders}
          loading={loading}
        />

      </div>

      {/* Mobile Cards */}

      <div className="grid gap-5 lg:hidden">

        {loading ? (

          [...Array(5)].map((_, index) => (

            <div
              key={index}
              className="skeleton h-40 w-full rounded-2xl"
            ></div>

          ))

        ) : (

          orders.map((order) => (

            <OrderCard
              key={order._id}
              order={order}
            />

          ))

        )}

      </div>

    </div>

  );

};

export default MyOrders;