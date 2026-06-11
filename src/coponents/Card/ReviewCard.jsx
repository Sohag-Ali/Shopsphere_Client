import useAuth from "../../hooks/useAuth";

const ReviewCard = ({ review, handleDelete, handleEdit }) => {
  const { user } = useAuth();

  if (!review) return null;

  const { customerName, customerEmail, customerImage, rating, comment, createdAt } =
    review;

  const isOwner = user?.email === customerEmail;

  return (
    <div
      className="
        card
        bg-base-100
        shadow-lg
        rounded-2xl
        border
        border-base-300
      "
    >
      <div className="card-body">
        <div
          className="
            flex
            items-center
            justify-between
          "
        >
          <div
            className="
              flex
              items-center
              gap-3
            "
          >
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
              <h3 className="font-semibold">{customerName}</h3>

              <p
                className="
      text-xs
      text-base-content/50
      mt-1
    "
              >
                {new Date(createdAt).toLocaleDateString("en-GB")}
              </p>

              <p className="text-warning">⭐ {rating}/5</p>
            </div>
          </div>

          {/* ONLY OWNER */}

          {isOwner && (
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(review)}
                className="
                  btn
                  btn-sm
                  btn-outline
                  btn-primary
                "
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(review._id)}
                className="
                  btn
                  btn-sm
                  btn-error
                "
              >
                Delete
              </button>
            </div>
          )}
        </div>

        <p
          className="
            mt-4
            text-base-content/70
          "
        >
          "{comment}"
        </p>
      </div>
    </div>
  );
};

export default ReviewCard;
