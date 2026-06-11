const ReviewSliderCard = ({ review }) => {
  return (
    <div
      className="
        bg-base-100
        border
        border-base-300
        rounded-3xl
        shadow-xl
        p-6

        h-[300px]

        flex
        flex-col

        hover:-translate-y-2
        hover:shadow-2xl

        transition-all
        duration-300
      "
    >
      {/* User */}

      <div className="flex items-center gap-4 mb-5">

        <img
          src={review.customerImage}
          alt={review.customerName}
          className="
            w-16
            h-16
            rounded-full
            object-cover
            border-2
            border-primary
          "
        />

        <div>

          <h3 className="font-bold text-lg">
            {review.customerName}
          </h3>

          <p className="text-sm opacity-70">
            Verified Customer
          </p>

        </div>

      </div>

      {/* Rating */}

      <div className="flex gap-1 mb-4">

        {Array.from({ length: 5 }).map(
          (_, i) => (
            <span key={i}>
              {i < review.rating
                ? "⭐"
                : "☆"}
            </span>
          )
        )}

      </div>

      {/* Comment */}

      <div className="flex-1">

        <p
          className="
            italic
            text-base-content/80
            line-clamp-5
          "
        >
          "{review.comment}"
        </p>

      </div>

      {/* Footer */}

      <div
        className="
          mt-4
          pt-4
          border-t
          border-base-300
        "
      >
        <span
          className="
            text-success
            font-medium
            text-sm
          "
        >
          ✓ Verified Purchase
        </span>
      </div>

    </div>
  );
};

export default ReviewSliderCard;