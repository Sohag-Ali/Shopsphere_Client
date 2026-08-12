import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import CategoryCard from "../../../coponents/Card/CategoryCard";
import CategoryCardSkeleton from "../../../coponents/Skeleton/CategoryCardSkeleton";
import { Link } from "react-router";
import ScrollReveal from "../../../coponents/Motion/ScrollReveal";
import { StaggerContainer, StaggerItem } from "../../../coponents/Motion/StaggerContainer";
import { motion } from "framer-motion";

const Categories = () => {
  const axiosSecure = useAxiosSecure();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosSecure
      .get("/categories")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((error) => {
        console.error("Category Fetch Error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [axiosSecure]);

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto py-12 px-4">
        <div className="text-center mb-12">
          <div className="skeleton h-10 w-72 mx-auto mb-4"></div>
          <div className="skeleton h-4 w-52 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <CategoryCardSkeleton key={index} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto py-12 px-4">
      <ScrollReveal className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-base-content">Shop By Category</h2>
        <p className="mt-3 text-base-content/70">Browse top products across carefully curated categories</p>
      </ScrollReveal>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.slice(0, 6).map((category) => (
          <StaggerItem key={category._id}>
            <CategoryCard category={category} />
          </StaggerItem>
        ))}
      </StaggerContainer>

      <ScrollReveal delay={0.2} className="text-center mt-10">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
          <Link
            to="/categories"
            className="btn btn-primary px-8 rounded-full shadow-lg hover:shadow-primary/30 text-base-content font-semibold"
          >
            See All Categories
          </Link>
        </motion.div>
      </ScrollReveal>
    </section>
  );
};

export default Categories;
