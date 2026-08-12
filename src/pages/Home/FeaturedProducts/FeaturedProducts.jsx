import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import ProductSkeleton from "../../../coponents/Skeleton/ProductSkeleton";
import ProductCard from "../../../coponents/Card/ProductCard ";
import ScrollReveal from "../../../coponents/Motion/ScrollReveal";
import { StaggerContainer, StaggerItem } from "../../../coponents/Motion/StaggerContainer";

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
    <section className="max-w-7xl mx-auto py-12 px-4">
      <ScrollReveal className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-base-content">
          Featured Products
        </h2>
        <p className="mt-3 text-base-content/70 max-w-xl mx-auto">
          Discover our most popular products handpicked for quality and value.
        </p>
      </ScrollReveal>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <ProductSkeleton key={index} />
          ))}
        </div>
      ) : (
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <StaggerItem key={product._id}>
              <ProductCard product={product} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      )}
    </section>
  );
};

export default FeaturedProducts;