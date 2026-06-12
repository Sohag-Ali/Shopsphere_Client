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
import OrdersTable from "../../../../coponents/Table/OrdersTable";

const Overview = () => {
  const { user } = useAuth();

  const axiosSecure = useAxiosSecure();

  const [data, setData] = useState(null);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/user-overview/${user.email}`)
        .then((res) => {
          setData(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [user, axiosSecure]);

  if (!data) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <span className="loading loading-spinner loading-lg"></span>
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
    <div className="mx-auto

    px-4
    sm:px-6
    lg:px-8

    space-y-6
    sm:space-y-8
    lg:space-y-10">

      {/* Welcome */}

      <div className="mb-8 sm:mb-10">
        <h1
          className="
            text-2xl
            sm:text-3xl
            md:text-4xl
            font-bold
          "
        >
          Welcome Back 👋
        </h1>

        <p
          className="
            text-sm
            sm:text-base
            text-base-content/70
            mt-2
          "
        >
          Here's your shopping overview.
        </p>
      </div>

      {/* Stats */}

      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          xl:grid-cols-4
          gap-4
          sm:gap-6
        "
      >
        {/* Orders */}

        <div
          className="
            bg-base-100
            rounded-2xl
            shadow-lg
            p-4
            sm:p-6
          "
        >
          <h3 className="text-sm text-base-content/60">
            Total Orders
          </h3>

          <p
            className="
              text-2xl
              sm:text-3xl
              lg:text-4xl
              font-bold
              mt-2
            "
          >
            {data.totalOrders}
          </p>
        </div>

        {/* Wishlist */}

        <div
          className="
            bg-base-100
            rounded-2xl
            shadow-lg
            p-4
            sm:p-6
          "
        >
          <h3 className="text-sm text-base-content/60">
            Wishlist
          </h3>

          <p
            className="
              text-2xl
              sm:text-3xl
              lg:text-4xl
              font-bold
              mt-2
            "
          >
            {data.totalWishlist}
          </p>
        </div>

        {/* Reviews */}

        <div
          className="
            bg-base-100
            rounded-2xl
            shadow-lg
            p-4
            sm:p-6
          "
        >
          <h3 className="text-sm text-base-content/60">
            Reviews
          </h3>

          <p
            className="
              text-2xl
              sm:text-3xl
              lg:text-4xl
              font-bold
              mt-2
            "
          >
            {data.totalReviews}
          </p>
        </div>

        {/* Status */}

        <div
          className="
            bg-base-100
            rounded-2xl
            shadow-lg
            p-4
            sm:p-6
          "
        >
          <h3 className="text-sm text-base-content/60">
            Account Status
          </h3>

          <p
            className="
              text-lg
              sm:text-xl
              font-bold
              text-green-500
              mt-3
              break-words
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
          p-4
          sm:p-6
          mt-8
          sm:mt-10
        "
      >
        <h2
          className="
            text-lg
            sm:text-xl
            lg:text-2xl
            font-bold
            mb-4
            sm:mb-6
          "
        >
          Activity Overview
        </h2>

        <ResponsiveContainer
          width="100%"
          height={250}
        >
          <BarChart data={chartData}>
            <XAxis dataKey="name" />

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

      <div className="mt-8 sm:mt-10">
        <h2
          className="
            text-lg
            sm:text-xl
            lg:text-2xl
            font-bold
            mb-4
            sm:mb-6
          "
        >
          Recent Orders
        </h2>

        <div
          className="
            bg-base-100
            rounded-2xl
            shadow-lg
            overflow-x-auto
          "
        >
          <OrdersTable
            orders={data.recentOrders}
            loading={false}
          />
        </div>
      </div>
    </div>
  );
};

export default Overview;