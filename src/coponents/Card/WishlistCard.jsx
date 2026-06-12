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
        h-full
        flex
        flex-col
      "
    >
      {/* Image */}

      <figure
        className="
          h-48
          sm:h-56
          md:h-60
          overflow-hidden
        "
      >
        <img
          src={item.image}
          alt={item.title}
          className="
            w-full
            h-full
            object-cover
            hover:scale-105
            transition-transform
            duration-300
          "
        />
      </figure>

      {/* Content */}

      <div
        className="
          p-4
          sm:p-5
          flex
          flex-col
          flex-1
        "
      >
        {/* Badges */}

        <div
          className="
            flex
            justify-between
            items-center
            gap-2
            mb-3
          "
        >
          <span
            className="
              badge
              badge-warning
              badge-sm
              sm:badge-md
            "
          >
            ⭐ {item.rating}
          </span>

          <span
            className="
              badge
              badge-outline
              badge-sm
              sm:badge-md
            "
          >
            Wishlist
          </span>
        </div>

        {/* Title */}

        <h2
          className="
            text-lg
            sm:text-xl
            font-bold
            line-clamp-2
            min-h-[52px]
            sm:min-h-[56px]
          "
        >
          {item.title}
        </h2>

        {/* Price */}

        <p
          className="
            text-xl
            sm:text-2xl
            font-bold
            text-primary
            mt-4
            break-words
          "
        >
          ৳ {Number(item.price).toLocaleString()}
        </p>

        {/* Push Buttons Bottom */}

        <div className="mt-auto pt-5">
          <div
            className="
              grid
              grid-cols-2
              gap-2
              sm:gap-3
            "
          >
            <Link
              to={`/product/${item.productId}`}
              className="
                btn
                btn-primary
                btn-sm
                sm:btn-md
                w-full
              "
            >
              View
            </Link>

            <button
              onClick={() =>
                handleDeleteWishlist(
                  item._id
                )
              }
              className="
                btn
                btn-error
                btn-sm
                sm:btn-md
                w-full
              "
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistCard;