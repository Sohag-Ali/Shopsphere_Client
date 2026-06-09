import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ProductInfo = ({ product }) => {

  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const handleWishlist = () => {

  const wishlistData = {

    userEmail:
      user.email,

    productId:
      product._id,

    title:
      product.title,

    image:
      product.images[0],

    price:
      product.price,

    rating:
      product.rating,

    location:
      product.location,

  };

  axiosSecure
    .post(
      "/wishlist",
      wishlistData
    )
    .then((res) => {

      console.log(res.data);

    });

};

  return (
    <div>

      <h1 className="text-4xl font-bold">
        {product.title}
      </h1>

      <p className="mt-3">
        ⭐ {product.rating}
      </p>

      <p className="mt-2">
        Brand: {product.brand}
      </p>

      <p>
        Category: {product.category}
      </p>

      <p>
        📍 {product.location}
      </p>

      <div className="mt-5">

        {product.discountPrice ? (
          <>
            <span className="line-through">
              ৳{product.price}
            </span>

            <span className="text-red-500 text-2xl ml-3">
              ৳{product.discountPrice}
            </span>
          </>
        ) : (
          <span className="text-2xl">
            ৳{product.price}
          </span>
        )}

      </div>

      <p className="mt-5">
        {product.shortDescription}
      </p>

      <button className="btn btn-primary mt-6">
        Buy Now
      </button>

      <button
  onClick={handleWishlist}
  className="
    btn
    btn-outline
  "
>
  ❤️ Wishlist
</button>

    </div>
  );
};

export default ProductInfo;