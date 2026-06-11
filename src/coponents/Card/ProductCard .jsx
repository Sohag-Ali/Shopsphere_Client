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
    <div className="card
  bg-base-100
  border
  border-base-300
  shadow-md
  hover:shadow-xl
  hover:scale-[1.02]
  transition-all
  duration-300
  rounded-2xl
  h-full">

      <figure className="relative h-52">

        <img
          src={images?.[0]}
          alt={title}
          className="h-full w-full object-cover"
        />

        {showDiscount && discountPrice && (
          <div className="badge badge-error absolute top-3 right-3 text-base-content">
            {discountPercent}% OFF
          </div>
        )}

      </figure>

      <div className="card-body">

        <h2 className="card-title line-clamp-1 min-h-[32px]">
          {title}
        </h2>

        <p className="text-sm text-base-content/70 line-clamp-2 min-h-[40px]">
          {shortDescription}
        </p>

        <div className="flex justify-between mt-2">

          {showDiscount && discountPrice ? (
            <div className="flex gap-2 items-center">

              <span className="line-through text-base-content/60">
                ৳ {price}
              </span>

              <span className="font-bold text-error">
                ৳ {discountPrice}
              </span>

            </div>
          ) : (
            <span className="font-bold text-primary">
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
              btn-primary
              w-full
              mt-4
              hover:bg-brand-light
              text-base-content
              font-semibold
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