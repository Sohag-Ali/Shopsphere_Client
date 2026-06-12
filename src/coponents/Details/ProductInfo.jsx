import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

const ProductInfo = ({ product }) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [quantity, setQuantity] = useState(1);
  const queryClient = useQueryClient();

 const handleWishlist = () => {

  if (!user) return;

  const wishlistData = {
    userEmail: user.email,
    productId: product._id,
    title: product.title,
    image: product.images[0],
    price: product.price,
    rating: product.rating,
    location: product.location,
  };

  axiosSecure
    .post("/wishlist", wishlistData)
    .then((res) => {

      if (res.data.insertedId) {

        Swal.fire({
          icon: "success",
          title: "Added To Wishlist ❤️",
          text: `${product.title} added successfully`,
          showConfirmButton: false,
          timer: 1500,
        });

      }

      if (res.data.inserted === false) {

        Swal.fire({
          icon: "info",
          title: "Already Added",
          text: "This product is already in your wishlist",
          showConfirmButton: false,
          timer: 1500,
        });

      }

    });

};

  const handleAddToCart = async () => {
    try {
      const cartData = {
        userEmail: user.email,
        productId: product._id,
        title: product.title,
        image: product.images[0],
        price: product.discountPrice || product.price,
        quantity,
      };

      const res = await axiosSecure.post("/cart", cartData);

      if (res.data.insertedId) {
        queryClient.invalidateQueries({
          queryKey: ["cart", user?.email],
        });
        Swal.fire({
          icon: "success",
          title: "Added To Cart",
          text: `${product.title} added successfully`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
      if (res.data.updated) {
        Swal.fire({
          icon: "success",
          title: "Cart Updated",
          text: "Quantity Increased",
        });
      }
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  const handleBuyNow = async () => {
    try {
      const paymentData = {
        email: user.email,
        userName: user.displayName,

        productId: product._id,

        productTitle: product.title,

        productImage: product.images[0],

        price: product.discountPrice || product.price,

        quantity: quantity,
      };

      const res = await axiosSecure.post(
        "/create-checkout-session",
        paymentData,
      );

      window.location.replace(res.data.url);
    } catch (error) {
      console.log(error);
    }
  };

 return (
  <div
    className="
      space-y-4
      sm:space-y-5
      lg:space-y-6
    "
  >
    {/* Title */}

    <h1
      className="
        text-2xl
        sm:text-3xl
        lg:text-4xl
        font-bold
        leading-tight
      "
    >
      {product.title}
    </h1>

    {/* Rating */}

    <div
      className="
        flex
        flex-wrap
        items-center
        gap-2
        text-sm
        sm:text-base
      "
    >
      <span className="font-medium">
        ⭐ {product.rating}
      </span>

      <span className="text-base-content/60">
        Product Rating
      </span>
    </div>

    {/* Brand */}

    <p
      className="
        text-sm
        sm:text-base
        lg:text-lg
      "
    >
      <span className="font-semibold">
        Brand:
      </span>{" "}
      {product.brand}
    </p>

    {/* Category */}

    <p
      className="
        text-sm
        sm:text-base
        lg:text-lg
      "
    >
      <span className="font-semibold">
        Category:
      </span>{" "}
      {product.category}
    </p>

    {/* Location */}

    <p
      className="
        text-sm
        sm:text-base
        lg:text-lg
      "
    >
      📍 {product.location}
    </p>

    {/* Price */}

    <div
      className="
        py-4
        border-y
      "
    >
      {product.discountPrice ? (
        <div
          className="
            flex
            flex-wrap
            items-center
            gap-2
            sm:gap-3
          "
        >
          <span
            className="
              text-base
              sm:text-xl
              text-gray-400
              line-through
            "
          >
            ৳ {product.price}
          </span>

          <span
            className="
              text-2xl
              sm:text-3xl
              font-bold
              text-error
            "
          >
            ৳ {product.discountPrice}
          </span>
        </div>
      ) : (
        <span
          className="
            text-2xl
            sm:text-3xl
            font-bold
            text-[#C9B59C]
          "
        >
          ৳ {product.price}
        </span>
      )}
    </div>

    {/* Stock */}

    <div>
      {product.stock > 0 ? (
        <p
          className="
            text-green-600
            font-semibold
            text-sm
            sm:text-base
          "
        >
          ✅ In Stock ({product.stock} available)
        </p>
      ) : (
        <p
          className="
            text-red-500
            font-semibold
            text-sm
            sm:text-base
          "
        >
          ❌ Product Not Available
        </p>
      )}
    </div>

    {/* Quantity */}

    {product.stock > 0 && (
      <div>
        <h3
          className="
            font-semibold
            mb-3
            text-sm
            sm:text-base
          "
        >
          Quantity
        </h3>

        <div
          className="
            flex
            items-center
            gap-3
          "
        >
          <button
            onClick={() =>
              setQuantity(
                quantity > 1
                  ? quantity - 1
                  : 1
              )
            }
            className="
              btn
              btn-sm
            "
          >
            -
          </button>

          <span
            className="
              text-lg
              sm:text-xl
              font-bold
              min-w-[40px]
              text-center
            "
          >
            {quantity}
          </span>

          <button
            onClick={() =>
              setQuantity(
                quantity < product.stock
                  ? quantity + 1
                  : quantity
              )
            }
            className="
              btn
              btn-sm
            "
          >
            +
          </button>
        </div>
      </div>
    )}

    {/* Description */}

    <div>
      <h3
        className="
          font-semibold
          text-base
          sm:text-lg
          mb-2
        "
      >
        Short Description
      </h3>

      <p
        className="
          text-sm
          sm:text-base
          text-base-content/70
          leading-relaxed
        "
      >
        {product.shortDescription}
      </p>
    </div>

    {/* Buttons */}

    <div
      className="
        space-y-3
        pt-2
      "
    >
      <button
        disabled={product.stock === 0}
        onClick={handleAddToCart}
        className="
          btn
          w-full
          bg-[#C9B59C]
          hover:bg-[#B79D7F]
          text-white
          border-none
        "
      >
        🛒 Add To Cart
      </button>

      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          gap-3
        "
      >
        <button
          onClick={handleWishlist}
          className="
            btn
            btn-outline
            w-full
          "
        >
          ❤️ Wishlist
        </button>

        <button
          disabled={product.stock === 0}
          onClick={handleBuyNow}
          className="
            btn
            btn-primary
            w-full
          "
        >
          ⚡ Buy Now
        </button>
      </div>
    </div>
  </div>
);
};

export default ProductInfo;
