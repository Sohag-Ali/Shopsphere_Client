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
        .catch((error) => {
          console.log(error);
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
    <div className="mx-auto

    px-4
    sm:px-6
    lg:px-8

    space-y-6
    sm:space-y-8
    lg:space-y-10">

      {/* Header */}

      <div className="mb-8 sm:mb-10">
        <h1
          className="
            text-2xl
            sm:text-3xl
            md:text-4xl
            font-bold
          "
        >
          My Orders
        </h1>

        <p
          className="
            text-sm
            sm:text-base
            text-base-content/60
            mt-2
          "
        >
          Track and manage your purchases
        </p>
      </div>

      {/* Stats */}

      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          gap-4
          sm:gap-6
          mb-8
        "
      >
        {/* Total Orders */}

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body p-4 sm:p-6">
            <h3
              className="
                text-base
                sm:text-lg
                font-semibold
              "
            >
              Total Orders
            </h3>

            <p
              className="
                text-2xl
                sm:text-3xl
                lg:text-4xl
                font-bold
                text-primary
              "
            >
              {orders.length}
            </p>
          </div>
        </div>

        {/* Total Spending */}

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body p-4 sm:p-6">
            <h3
              className="
                text-base
                sm:text-lg
                font-semibold
              "
            >
              Total Spending
            </h3>

            <p
              className="
                text-2xl
                sm:text-3xl
                lg:text-4xl
                font-bold
                text-success
                break-words
              "
            >
              ৳ {totalSpent.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Empty State */}

      {!loading && orders.length === 0 && (
        <div
          className="
            bg-base-100
            rounded-3xl
            shadow-xl
            p-8
            sm:p-12
            text-center
          "
        >
          <h3
            className="
              text-xl
              sm:text-2xl
              font-bold
            "
          >
            No Orders Yet
          </h3>

          <p
            className="
              text-base-content/60
              mt-2
            "
          >
            You haven't placed any orders.
          </p>
        </div>
      )}

      {/* Desktop Table */}

      {orders.length > 0 && (
        <div className="hidden lg:block">
          <OrdersTable
            orders={orders}
            loading={loading}
          />
        </div>
      )}

      {/* Mobile + Tablet Cards */}

      {orders.length > 0 && (
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-4
            sm:gap-5
            lg:hidden
          "
        >
          {loading
            ? [...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="
                    skeleton
                    h-40
                    w-full
                    rounded-2xl
                  "
                />
              ))
            : orders.map((order) => (
                <OrderCard
                  key={order._id}
                  order={order}
                />
              ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;