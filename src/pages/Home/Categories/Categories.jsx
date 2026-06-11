import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import CategoryCard from "../../../coponents/Card/CategoryCard";
import CategoryCardSkeleton from "../../../coponents/Skeleton/CategoryCardSkeleton";


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
    <section className="max-w-7xl mx-auto py-20 px-4">

      <div className="text-center mb-12">

        <div className="skeleton h-10 w-72 mx-auto mb-4"></div>

        <div className="skeleton h-4 w-52 mx-auto"></div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {[...Array(6)].map((_, index) => (

          <CategoryCardSkeleton
            key={index}
          />

        ))}

      </div>

    </section>
  );
}

  return (
    <section className="max-w-7xl mx-auto py-20 px-4">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold">Shop By Category</h2>

        <p className="mt-3 text-base-content/70">
          Browse products by category
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <CategoryCard
            key={category._id}
            category={category}
          />
        ))}
      </div>
    </section>
  );
};

export default Categories;