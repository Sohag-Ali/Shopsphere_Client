import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState } from "react";

const ProductInfo = ({ product }) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [quantity, setQuantity] = useState(1);

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

    axiosSecure.post("/wishlist", wishlistData).then((res) => {
      if (res.data.insertedId) {
        alert("Added To Wishlist");
      }

      if (res.data.inserted === false) {
        alert("Already Added");
      }
    });
  };

  const handleAddToCart = () => {
    const cartData = {
      userEmail: user.email,
      productId: product._id,
      title: product.title,
      image: product.images[0],
      price: product.discountPrice || product.price,
      quantity: quantity,
    };

    axiosSecure.post("/cart", cartData).then((res) => {
      console.log(res.data);
    });
  };

 const handleBuyNow = async () => {

  try {

    const paymentData = {

      email: user.email,
      userName : user.displayName,

      productId: product._id,

      productTitle: product.title,

      productImage: product.images[0],

      price:
        product.discountPrice ||
        product.price,

      quantity: quantity,

    };

    const res =
      await axiosSecure.post(
        "/create-checkout-session",
        paymentData
      );

    window.location.replace(
      res.data.url
    );

  } catch (error) {

    console.log(error);

  }

};

  return (
    <div className="space-y-5">
      {/* Title */}

      <h1 className="text-4xl font-bold">{product.title}</h1>

      {/* Rating */}

      <div className="flex items-center gap-2">
        <span className="text-lg">⭐ {product.rating}</span>

        <span className="text-gray-500">Product Rating</span>
      </div>

      {/* Brand */}

      <p className="text-lg">
        <span className="font-semibold">Brand:</span> {product.brand}
      </p>

      {/* Category */}

      <p className="text-lg">
        <span className="font-semibold">Category:</span> {product.category}
      </p>

      {/* Location */}

      <p className="text-lg">📍 {product.location}</p>

      {/* Price */}

      <div className="py-4 border-y">
        {product.discountPrice ? (
          <div className="flex items-center gap-3">
            <span className="text-gray-400 line-through text-xl">
              ৳ {product.price}
            </span>

            <span className="text-3xl font-bold text-error">
              ৳ {product.discountPrice}
            </span>
          </div>
        ) : (
          <span className="text-3xl font-bold text-[#C9B59C]">
            ৳ {product.price}
          </span>
        )}
      </div>

      {/* Stock Status */}

      <div className="mt-4">
        {product.stock > 0 ? (
          <p className="text-green-600 font-semibold">
            ✅ In Stock ({product.stock} available)
          </p>
        ) : (
          <p className="text-red-500 font-semibold">❌ Product Not Available</p>
        )}
      </div>

      {/* Quantity */}

      {product.stock > 0 && (
        <div className="mt-5">
          <h3 className="font-semibold mb-3">Quantity</h3>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
              className="btn btn-sm"
            >
              -
            </button>

            <span className="text-xl font-bold">{quantity}</span>

            <button
              onClick={() =>
                setQuantity(quantity < product.stock ? quantity + 1 : quantity)
              }
              className="btn btn-sm"
            >
              +
            </button>
          </div>
        </div>
      )}

      {/* Description */}

      <div>
        <h3 className="font-semibold text-lg mb-2">Short Description</h3>

        <p className="text-gray-600 leading-relaxed">
          {product.shortDescription}
        </p>
      </div>

      {/* Buttons */}

      <div className="space-y-3 mt-6">
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

        <div className="grid grid-cols-2 gap-3">
          <button onClick={handleWishlist} className="btn btn-outline">
            ❤️ Wishlist
          </button>

          <button
            disabled={product.stock === 0}
            onClick={handleBuyNow}
            className="btn btn-primary"
          >
            ⚡ Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
