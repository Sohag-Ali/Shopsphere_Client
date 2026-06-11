import { Link } from "react-router";

const WishlistCard = ({
  item,
  handleDeleteWishlist,
}) => {

  return (

    <div
      className="
        bg-base-100
        rounded-3xl
        overflow-hidden
        shadow-xl
        border
        border-base-300
        hover:shadow-2xl
        hover:-translate-y-1
        transition-all
        duration-300
      "
    >

      <figure className="h-60">

        <img
          src={item.image}
          alt={item.title}
          className="
            w-full
            h-full
            object-cover
          "
        />

      </figure>

      <div className="p-5">

        <div className="flex justify-between items-center mb-3">

          <span className="badge badge-warning">
            ⭐ {item.rating}
          </span>

          <span className="badge badge-outline">
            Wishlist
          </span>

        </div>

        <h2
          className="
            text-xl
            font-bold
            line-clamp-2
            min-h-[56px]
          "
        >
          {item.title}
        </h2>

        <p
          className="
            text-2xl
            font-bold
            text-primary
            mt-4
          "
        >
          ৳ {item.price}
        </p>

        <div className="grid grid-cols-2 gap-3 mt-6">

          <Link
            to={`/product/${item.productId}`}
            className="btn btn-primary"
          >
            View
          </Link>

          <button
            onClick={() =>
              handleDeleteWishlist(
                item._id
              )
            }
            className="btn btn-error"
          >
            Delete
          </button>

        </div>

      </div>

    </div>

  );

};

export default WishlistCard;