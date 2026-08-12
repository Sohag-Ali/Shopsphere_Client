import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import StatisticCard from "../../../coponents/Card/StatisticCard";
import ScrollReveal from "../../../coponents/Motion/ScrollReveal";
import { StaggerContainer, StaggerItem } from "../../../coponents/Motion/StaggerContainer";

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
    <section className="max-w-7xl mx-auto py-12 px-4">
      <ScrollReveal className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-base-content">
          ShopSphere Statistics
        </h2>
        <p className="mt-3 text-base-content/70">
          Trusted by thousands of customers nationwide
        </p>
      </ScrollReveal>

      <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <StaggerItem>
          <StatisticCard
            value={stats.products}
            title="Products"
            icon={<Package size={36} />}
          />
        </StaggerItem>

        <StaggerItem>
          <StatisticCard
            value={stats.categories}
            title="Categories"
            icon={<LayoutGrid size={36} />}
          />
        </StaggerItem>

        <StaggerItem>
          <StatisticCard
            value={stats.customers}
            title="Customers"
            icon={<Users size={36} />}
          />
        </StaggerItem>

        <StaggerItem>
          <StatisticCard
            value={stats.orders}
            title="Orders"
            icon={<ShoppingBag size={36} />}
          />
        </StaggerItem>
      </StaggerContainer>
    </section>
  );
};

export default Statistics;