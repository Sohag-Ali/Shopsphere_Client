import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import ProductCard from "../Card/ProductCard ";

const RelatedProducts = ({
  category,
}) => {

  const axiosSecure =
    useAxiosSecure();

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

    <section
      className="
        mt-10
        sm:mt-14
        lg:mt-20

        px-3
        sm:px-4
        lg:px-0
      "
    >

      {/* Header */}

      <div
        className="
          flex
          flex-col
          sm:flex-row

          sm:items-center
          sm:justify-between

          gap-3

          mb-6
          sm:mb-8
        "
      >

        <h2
          className="
            text-2xl
            sm:text-3xl
            lg:text-4xl

            font-bold
          "
        >
          Related Products
        </h2>

        <span
          className="
            badge
            badge-primary

            badge-md
            sm:badge-lg

            self-start
            sm:self-auto
          "
        >
          {products.length} Products
        </span>

      </div>

      {/* Products Grid */}

      <div
        className="
          grid

          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4

          gap-4
          sm:gap-5
          lg:gap-6
        "
      >

        {products.length > 0 ? (

          products.map((product) => (

            <ProductCard
              key={product._id}
              product={product}
            />

          ))

        ) : (

          <div
            className="
              col-span-full

              bg-base-100
              rounded-2xl

              p-8
              sm:p-10

              text-center
              shadow-lg
            "
          >

            <h3
              className="
                text-lg
                sm:text-xl

                font-semibold
              "
            >
              No Related Products Found
            </h3>

            <p
              className="
                text-sm
                sm:text-base

                text-base-content/60

                mt-2
              "
            >
              Similar products are not available right now.
            </p>

          </div>

        )}

      </div>

    </section>

  );
};

export default RelatedProducts;