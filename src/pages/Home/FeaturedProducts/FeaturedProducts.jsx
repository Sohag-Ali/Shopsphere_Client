import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import ProductSkeleton from "../../../coponents/Skeleton/ProductSkeleton";
import ProductCard from "../../../coponents/Card/ProductCard ";

const FeaturedProducts = () => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {

    axiosSecure
      .get("/featured-products")
      .then((res) => {
        setProducts(res.data);
      })
      .finally(() => {
        setLoading(false);
      });

  }, []);

  return (
    <section className="max-w-7xl mx-auto py-20 px-4">

      <div className="text-center mb-12">

        <h2 className="text-4xl font-bold">
          Featured Products
        </h2>

        <p className="mt-3 text-base-content/70">
          Discover our most popular products.
        </p>

      </div>

      {loading ? (
        <div
          className="
          grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-4
          gap-6
        "
        >
          {[...Array(8)].map((_, index) => (
            
            <ProductSkeleton
              key={index}
            />
          ))}
        </div>
      ) : (
        <div
          className="
          grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-4
          gap-6
        "
        >
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}
        </div>
      )}

    </section>
  );
};

export default FeaturedProducts;