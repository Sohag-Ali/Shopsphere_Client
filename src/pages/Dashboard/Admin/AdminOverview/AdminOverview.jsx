import { useEffect, useState } from "react";


import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import RecentOrdersTable from "../../../../coponents/Table/RecentOrdersTable";

const AdminOverview = () => {

  const axiosSecure = useAxiosSecure();

  const [data, setData] =
    useState(null);

  useEffect(() => {

    axiosSecure
      .get("/admin-overview")
      .then((res) => {

        setData(res.data);

      });

  }, [axiosSecure]);

  if (!data) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  const chartData = [
    {
      name: "Products",
      value: data.totalProducts,
    },
    {
      name: "Users",
      value: data.totalUsers,
    },
    {
      name: "Orders",
      value: data.totalOrders,
    },
    {
      name: "Categories",
      value: data.totalCategories,
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
    {/* Header */}

    <div className="mb-6 sm:mb-8">
      <h1
        className="
          text-2xl
          sm:text-3xl
          lg:text-4xl
          font-bold
        "
      >
        Welcome Back Admin 👋
      </h1>

      <p
        className="
          text-sm
          sm:text-base
          text-base-content/70
          mt-2
        "
      >
        Manage your store efficiently
      </p>
    </div>

    {/* Stats Cards */}

    <div
      className="
        grid

        grid-cols-2
        lg:grid-cols-4

        gap-3
        sm:gap-4
        lg:gap-6
      "
    >
      <div
        className="
          bg-base-100
          rounded-2xl
          shadow-lg

          p-4
          sm:p-5
          lg:p-6
        "
      >
        <h3
          className="
            text-xs
            sm:text-sm
            text-base-content/70
          "
        >
          Total Products
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
          {data.totalProducts}
        </p>
      </div>

      <div
        className="
          bg-base-100
          rounded-2xl
          shadow-lg

          p-4
          sm:p-5
          lg:p-6
        "
      >
        <h3
          className="
            text-xs
            sm:text-sm
            text-base-content/70
          "
        >
          Total Users
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
          {data.totalUsers}
        </p>
      </div>

      <div
        className="
          bg-base-100
          rounded-2xl
          shadow-lg

          p-4
          sm:p-5
          lg:p-6
        "
      >
        <h3
          className="
            text-xs
            sm:text-sm
            text-base-content/70
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

          p-4
          sm:p-5
          lg:p-6
        "
      >
        <h3
          className="
            text-xs
            sm:text-sm
            text-base-content/70
          "
        >
          Categories
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
          {data.totalCategories}
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

        mt-6
        sm:mt-8
        lg:mt-10
      "
    >
      <h2
        className="
          text-xl
          sm:text-2xl
          font-bold
          mb-4
          sm:mb-6
        "
      >
        Store Analytics
      </h2>

      <div
        className="
          w-full

          h-[260px]
          sm:h-[320px]
          lg:h-[350px]
        "
      >
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <BarChart
            data={chartData}
          >
            <XAxis
              dataKey="name"
              tick={{
                fontSize: 12,
              }}
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
    </div>

    {/* Recent Orders */}

    <div
      className="
        bg-base-100
        rounded-2xl
        shadow-lg

        p-4
        sm:p-6

        mt-6
        sm:mt-8
        lg:mt-10
      "
    >
      <div
        className="
          flex
          flex-col
          sm:flex-row

          sm:items-center
          justify-between

          gap-3

          mb-4
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
          "
        >
          {data.recentOrders?.length || 0}
          Orders
        </span>
      </div>

      <RecentOrdersTable
        orders={data.recentOrders}
      />
    </div>
  </div>
);
};

export default AdminOverview;