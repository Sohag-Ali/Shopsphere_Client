import { useEffect, useState } from "react";


import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const Overview = () => {

  const { user } = useAuth();

  const axiosSecure =
    useAxiosSecure();

  const [data, setData] =
    useState(null);

  useEffect(() => {

    if (user?.email) {

      axiosSecure
        .get(
          `/user-overview/${user.email}`
        )
        .then((res) => {

          setData(
            res.data
          );

        });

    }

  }, [
    user,
    axiosSecure
  ]);

  if (!data) {

    return (
      <div
        className="
          flex
          justify-center
          py-20
        "
      >
        <span
          className="
            loading
            loading-spinner
            loading-lg
          "
        ></span>
      </div>
    );

  }

  const chartData = [
    {
      name: "Orders",
      value: data.totalOrders,
    },
    {
      name: "Wishlist",
      value: data.totalWishlist,
    },
    {
      name: "Reviews",
      value: data.totalReviews,
    },
  ];

  return (
    <div>

      {/* Welcome */}

      <div className="mb-10">

        <h1
          className="
            text-4xl
            font-bold
          "
        >
          Welcome Back 👋
        </h1>

        <p
          className="
            text-base-content/70
            mt-2
          "
        >
          Here's your shopping
          overview.
        </p>

      </div>

      {/* Stats */}

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-4
          gap-6
        "
      >

        <div
          className="
            bg-base-100
            rounded-2xl
            shadow-lg
            p-6
          "
        >

          <h3
            className="
              text-sm
              text-base-content/60
            "
          >
            Total Orders
          </h3>

          <p
            className="
              text-4xl
              font-bold
              mt-2
            "
          >
            {data.totalOrders}
          </p>

        </div>

        <div
          className="
            bg-base-100
            rounded-2xl
            shadow-lg
            p-6
          "
        >

          <h3
            className="
              text-sm
              text-base-content/60
            "
          >
            Wishlist
          </h3>

          <p
            className="
              text-4xl
              font-bold
              mt-2
            "
          >
            {data.totalWishlist}
          </p>

        </div>

        <div
          className="
            bg-base-100
            rounded-2xl
            shadow-lg
            p-6
          "
        >

          <h3
            className="
              text-sm
              text-base-content/60
            "
          >
            Reviews
          </h3>

          <p
            className="
              text-4xl
              font-bold
              mt-2
            "
          >
            {data.totalReviews}
          </p>

        </div>

        <div
          className="
            bg-base-100
            rounded-2xl
            shadow-lg
            p-6
          "
        >

          <h3
            className="
              text-sm
              text-base-content/60
            "
          >
            Status
          </h3>

          <p
            className="
              text-xl
              font-bold
              text-green-500
              mt-3
            "
          >
            {data.accountStatus}
          </p>

        </div>

      </div>

      {/* Chart */}

      <div
        className="
          bg-base-100
          rounded-2xl
          shadow-lg
          p-6
          mt-10
        "
      >

        <h2
          className="
            text-2xl
            font-bold
            mb-6
          "
        >
          Activity Overview
        </h2>

        <ResponsiveContainer
          width="100%"
          height={300}
        >

          <BarChart
            data={chartData}
          >

            <XAxis
              dataKey="name"
            />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="value"
              radius={[8, 8, 0, 0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

      {/* Recent Orders */}

      <div
        className="
          bg-base-100
          rounded-2xl
          shadow-lg
          p-6
          mt-10
        "
      >

        <h2
          className="
            text-2xl
            font-bold
            mb-6
          "
        >
          Recent Orders
        </h2>

        <div className="overflow-x-auto">

          <table className="table">

            <thead>

              <tr>

                <th>
                  Product
                </th>

                <th>
                  Price
                </th>

                <th>
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

              {data.recentOrders.map(
                (order) => (

                  <tr
                    key={
                      order._id
                    }
                  >

                    <td>
                      {
                        order.productTitle
                      }
                    </td>

                    <td>
                      ৳
                      {
                        order.price
                      }
                    </td>

                    <td>

                      <span
                        className="
                          badge
                          badge-success
                        "
                      >

                        {
                          order.status
                        }

                      </span>

                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default Overview;