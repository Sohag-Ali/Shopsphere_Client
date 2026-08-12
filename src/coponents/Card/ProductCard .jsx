import { Link } from "react-router";
import { motion } from "framer-motion";

const ProductCard = ({
  product,
  showDiscount = false,
}) => {

  const {
    _id,
    title,
    shortDescription,
    images,
    price,
    discountPrice,
    rating,
    location,
  } = product;

  const discountPercent =
    discountPrice
      ? Math.round(
          ((price - discountPrice) / price) * 100
        )
      : 0;

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="card bg-base-100 border border-base-300 shadow-md hover:shadow-2xl transition-all duration-300 rounded-2xl h-full overflow-hidden flex flex-col group"
    >
      <figure className="relative h-52 overflow-hidden bg-base-200">
        <motion.img
          src={images?.[0]}
          alt={title}
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="h-full w-full object-cover transition-transform duration-500"
        />

        {showDiscount && discountPrice && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="badge badge-error absolute top-3 right-3 text-base-content font-bold shadow-md"
          >
            {discountPercent}% OFF
          </motion.div>
        )}
      </figure>

      <div className="card-body p-5 flex flex-col grow">
        <h2 className="card-title text-lg font-bold line-clamp-1 min-h-[28px] group-hover:text-primary transition-colors">
          {title}
        </h2>

        <p className="text-sm text-base-content/70 line-clamp-2 min-h-[40px]">
          {shortDescription}
        </p>

        <div className="flex justify-between items-center mt-2">
          {showDiscount && discountPrice ? (
            <div className="flex gap-2 items-center">
              <span className="line-through text-xs text-base-content/60">
                ৳ {price}
              </span>
              <span className="font-bold text-error text-base">
                ৳ {discountPrice}
              </span>
            </div>
          ) : (
            <span className="font-bold text-primary text-base">
              ৳ {price}
            </span>
          )}

          <span className="text-sm font-semibold bg-base-200 px-2 py-1 rounded-lg">
            ⭐ {rating}
          </span>
        </div>

        <p className="text-xs text-base-content/70 mt-1">
          📍 {location}
        </p>

        <div className="mt-auto pt-4">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.96 }}>
            <Link
              to={`/product/${_id}`}
              className="btn btn-primary w-full text-base-content font-semibold rounded-xl shadow-md"
            >
              View Details
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;