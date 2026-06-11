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
    <div>

      {/* Header */}

      <div className="mb-10">

        <h1 className="text-4xl font-bold">
          Welcome Back Admin 👋
        </h1>

        <p className="text-base-content/70 mt-2">
          Manage your store efficiently
        </p>

      </div>

      {/* Stats Cards */}

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-4
          gap-6
        "
      >

        <div className="bg-base-100 rounded-2xl shadow-lg p-6">
          <h3 className="text-sm text-gray-500">
            Total Products
          </h3>

          <p className="text-4xl font-bold mt-2">
            {data.totalProducts}
          </p>
        </div>

        <div className="bg-base-100 rounded-2xl shadow-lg p-6">
          <h3 className="text-sm text-gray-500">
            Total Users
          </h3>

          <p className="text-4xl font-bold mt-2">
            {data.totalUsers}
          </p>
        </div>

        <div className="bg-base-100 rounded-2xl shadow-lg p-6">
          <h3 className="text-sm text-gray-500">
            Total Orders
          </h3>

          <p className="text-4xl font-bold mt-2">
            {data.totalOrders}
          </p>
        </div>

        <div className="bg-base-100 rounded-2xl shadow-lg p-6">
          <h3 className="text-sm text-gray-500">
            Categories
          </h3>

          <p className="text-4xl font-bold mt-2">
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
          p-6
          mt-10
        "
      >

        <h2 className="text-2xl font-bold mb-6">
          Store Analytics
        </h2>

        <ResponsiveContainer
          width="100%"
          height={350}
        >

          <BarChart
            data={chartData}
          >

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

  <RecentOrdersTable
    orders={data.recentOrders}
  />

</div>

    </div>
  );
};

export default AdminOverview;