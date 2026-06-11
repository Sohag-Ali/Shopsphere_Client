import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import StatisticCard from "../../../coponents/Card/StatisticCard";

import {
  Package,
  LayoutGrid,
  Users,
  ShoppingBag,
} from "lucide-react";

const Statistics = () => {
  const axiosSecure = useAxiosSecure();

  const [stats, setStats] = useState({});

  useEffect(() => {
    axiosSecure
      .get("/statistics")
      .then((res) => {
        setStats(res.data);
      });
  }, [axiosSecure]);

  return (
    <section className="max-w-7xl mx-auto py-10 px-4">

      <div className="text-center mb-12">

        <h2 className="text-4xl font-bold">
          ShopSphere Statistics
        </h2>

        <p className="mt-3 text-base-content/70">
          Trusted by thousands of customers
        </p>

      </div>

      <div
        className="
          grid
          grid-cols-2
          lg:grid-cols-4
          gap-6
        "
      >
        <StatisticCard
          value={stats.products}
          title="Products"
          icon={<Package size={40} />}
        />

        <StatisticCard
          value={stats.categories}
          title="Categories"
          icon={<LayoutGrid size={40} />}
        />

        <StatisticCard
          value={stats.customers}
          title="Customers"
          icon={<Users size={40} />}
        />

        <StatisticCard
          value={stats.orders}
          title="Orders"
          icon={<ShoppingBag size={40} />}
        />
      </div>

    </section>
  );
};

export default Statistics;