const ReviewCard = ({ review }) => {
    if (!review) {
    return null;
  }

  const {
    customerName,
    customerImage,
    rating,
    comment,
  } = review;

  return (
    <div
      className="
      card
      bg-base-100
      shadow-lg
      rounded-xl
      h-full
    "
    >
      <div className="card-body">

        <div className="flex items-center gap-3">

          <img
            src={customerImage}
            alt={customerName}
            className="
              w-12
              h-12
              rounded-full
              object-cover
            "
          />

          <div>
            <h3 className="font-semibold">
              {customerName}
            </h3>

            <p className="text-yellow-500">
              ⭐ {rating}/5
            </p>
          </div>

        </div>

        <p className="mt-4 text-gray-500">
          "{comment}"
        </p>

      </div>
    </div>
  );
};

export default ReviewCard;