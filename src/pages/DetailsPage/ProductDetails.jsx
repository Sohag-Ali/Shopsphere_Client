import { useParams } from "react-router";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import ProductGallery from "../../coponents/Details/ProductGallery";
import ProductInfo from "../../coponents/Details/ProductInfo";
import ProductTabs from "../../coponents/Details/ProductTabs";
import RelatedProducts from "../../coponents/Details/RelatedProducts";
import useTitle from "../../hooks/useTitle";

const ProductDetails = () => {
    useTitle("Product Details");
  const { id } = useParams();

  const axiosSecure =
    useAxiosSecure();

  const [product, setProduct] =
    useState(null);

  useEffect(() => {
    axiosSecure
      .get(`/products/${id}`)
      .then((res) => {
        setProduct(res.data);
      });
  }, [id, axiosSecure]);

  if (!product) {
    return (
      <div
        className="
          flex
          justify-center
          items-center

          min-h-[50vh]
        "
      >
        <span
          className="
            loading
            loading-spinner
            loading-lg
          "
        ></span>
      </div>
    );
  }

  return (
    <div
      className="
        max-w-7xl
        mx-auto

        px-3
        sm:px-4
        md:px-6
        lg:px-8

        py-6
        sm:py-8
        lg:py-10
      "
    >
      {/* Product Section */}

      <div
        className="
          grid

          grid-cols-1
          lg:grid-cols-2

          gap-6
          sm:gap-8
          lg:gap-10
          xl:gap-14

          items-start
        "
      >
        {/* Gallery */}

        <div
          className="
            order-1
          "
        >
          <ProductGallery
            images={product.images}
          />
        </div>

        {/* Product Info */}

        <div
          className="
            order-2

            w-full
            min-w-0
          "
        >
          <ProductInfo
            product={product}
          />
        </div>
      </div>

      {/* Tabs */}

      <div
        className="
          mt-10
          sm:mt-12
          lg:mt-16
        "
      >
        <ProductTabs
          product={product}
        />
      </div>

      {/* Related Products */}

      <div
        className="
          mt-10
          sm:mt-14
          lg:mt-20
        "
      >
        <RelatedProducts
          category={
            product.category
          }
        />
      </div>
    </div>
  );
};

export default ProductDetails;