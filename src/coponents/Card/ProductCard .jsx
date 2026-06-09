import { Link } from "react-router";

const ProductCard = ({ product }) => {
  const {
    _id,
    title,
    shortDescription,
    images,
    price,
    rating,
    location,
  } = product;

  return (
    <div className="card bg-base-100 shadow-lg rounded-xl h-full">

      <figure className="h-52">
        <img
          src={images[0]}
          alt={title}
          className="h-full w-full object-cover"
        />
      </figure>

      <div className="card-body">

        <h2 className="card-title line-clamp-1">
          {title}
        </h2>

        <p className="text-sm text-gray-500 line-clamp-2">
          {shortDescription}
        </p>

        <div className="flex justify-between mt-2">

          <span className="font-bold text-[#C9B59C]">
            ৳ {price}
          </span>

          <span>
            ⭐ {rating}
          </span>

        </div>

        <p className="text-sm">
          📍 {location}
        </p>

        <Link
          to={`/product/${_id}`}
          className="
            btn
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
  );
};

export default ProductCard;