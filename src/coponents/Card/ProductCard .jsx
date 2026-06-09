import { Link } from "react-router";

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
    <div className="card bg-base-100 shadow-lg rounded-xl h-full">

      <figure className="relative h-52">

        <img
          src={images?.[0]}
          alt={title}
          className="h-full w-full object-cover"
        />

        {showDiscount && discountPrice && (
          <div className="badge badge-error absolute top-3 right-3 text-white">
            {discountPercent}% OFF
          </div>
        )}

      </figure>

      <div className="card-body">

        <h2 className="card-title line-clamp-1 min-h-[32px]">
          {title}
        </h2>

        <p className="text-sm text-gray-500 line-clamp-2 min-h-[40px]">
          {shortDescription}
        </p>

        <div className="flex justify-between mt-2">

          {showDiscount && discountPrice ? (
            <div className="flex gap-2 items-center">

              <span className="line-through text-gray-400">
                ৳ {price}
              </span>

              <span className="font-bold text-error">
                ৳ {discountPrice}
              </span>

            </div>
          ) : (
            <span className="font-bold text-[#C9B59C]">
              ৳ {price}
            </span>
          )}

          <span>
            ⭐ {rating}
          </span>

        </div>

        <p className="text-sm">
          📍 {location}
        </p>

        <div className="mt-auto">
          <Link
            to={`/product/${_id}`}
            className="
              btn
              w-full
              mt-4
              bg-[#C9B59C]
              text-white
              hover:bg-[#B79D7F]
            "
          >
            View Details
          </Link>
        </div>

      </div>
    </div>
  );
};

export default ProductCard;