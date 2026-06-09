import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import ProductCard from "../Card/ProductCard ";


const RelatedProducts = ({
  category,
}) => {

  const axiosSecure = useAxiosSecure();

  const [products, setProducts] =
    useState([]);

  useEffect(() => {

    axiosSecure
      .get(
        `/related-products/${category}`
      )
      .then((res) => {
        setProducts(res.data);
      });

  }, [category, axiosSecure]);

  return (
    <section className="mt-20">

      <h2 className="text-3xl font-bold mb-8">
        Related Products
      </h2>

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

    </section>
  );
};

export default RelatedProducts;