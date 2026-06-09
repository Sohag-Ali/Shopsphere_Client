import { useParams } from "react-router";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import ProductGallery from "../../coponents/Details/ProductGallery";
import ProductInfo from "../../coponents/Details/ProductInfo";
import ProductTabs from "../../coponents/Details/ProductTabs";
import RelatedProducts from "../../coponents/Details/RelatedProducts";



const ProductDetails = () => {

  const { id } = useParams();

  const axiosSecure = useAxiosSecure();

  const [product, setProduct] = useState(null);

  useEffect(() => {

    axiosSecure
      .get(`/products/${id}`)
      .then((res) => {
        setProduct(res.data);
      });

  }, [id, axiosSecure]);

  if (!product) {
    return (
      <div className="text-center py-20">
        Loading...
      </div>
    );
  }

  

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      <div
        className="
          grid
          lg:grid-cols-2
          gap-10
        "
      >
        <ProductGallery
          images={product.images}
        />

        <ProductInfo
          product={product}
        />
      </div>

      <ProductTabs
        product={product}
      />

      <RelatedProducts
        category={product.category}
      />

    </div>
  );
};

export default ProductDetails;