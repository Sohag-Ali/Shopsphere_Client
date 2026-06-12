import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import ReviewCard from "../Card/ReviewCard";
import Swal from "sweetalert2";

const ProductReviews = ({ productId, productTitle, productImage }) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [editingReview, setEditingReview] =
  useState(null);

const [editComment, setEditComment] =
  useState("");

const [editRating, setEditRating] =
  useState(5);

  const fetchReviews = () => {
  axiosSecure
    .get(`/reviews/${productId}`)
    .then((res) => {

      console.log("Reviews Data:", res.data);

      setReviews(res.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const reviewData = {
      productId,
      productImage,
      productTitle: productTitle,
      customerName: user?.displayName,
      customerEmail: user?.email,
      customerImage: user?.photoURL,

      rating,
      comment,
      createdAt: new Date(),
    };

    axiosSecure
      .post("/reviews", reviewData)
      .then((res) => {
        if (res.data.insertedId) {
          setComment("");
          setRating(5);

          fetchReviews();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

const handleDelete = async (id) => {

  const result = await Swal.fire({
    title: "Delete Review?",
    text: "You won't be able to recover it.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, Delete",
    cancelButtonText: "Cancel",
  });

  if (!result.isConfirmed) return;

  try {

    await axiosSecure.delete(
      `/reviews/${id}`
    );

    fetchReviews();

    Swal.fire({
      icon: "success",
      title: "Deleted",
      text: "Review deleted successfully",
      timer: 1500,
      showConfirmButton: false,
    });

  } catch (error) {

    console.log(error);

    Swal.fire({
      icon: "error",
      title: "Failed",
      text: "Could not delete review",
    });

  }

};

const handleEdit = (review) => {

  setEditingReview(review);

  setEditComment(
    review.comment
  );

  setEditRating(
    review.rating
  );

};

const handleUpdate = async () => {

  try {

    await axiosSecure.patch(
      `/reviews/${editingReview._id}`,
      {
        rating: editRating,
        comment: editComment,
      }
    );

    setEditingReview(null);

    fetchReviews();

    Swal.fire({
  icon: "success",

  title: "Review Updated Successfully 🎉",

  text: "Your review has been updated and is now visible to other customers.",

  confirmButtonText: "Awesome!",

  confirmButtonColor: "#8B5CF6",

  backdrop: true,

  timer: 2500,

  timerProgressBar: true,
});

  } catch (error) {

    console.log(error);

    Swal.fire({
      icon: "error",
      title: "Update Failed",
      text: "Could not update review",
    });

  }

};

  return (
    <div>

      {/* Review Form */}
<div
  className="
    bg-base-100
    rounded-2xl
    sm:rounded-3xl

    border
    border-base-300

    shadow-lg

    p-4
    sm:p-6
    lg:p-8

    mb-6
    sm:mb-8
  "
>
  {/* Header */}

  <div
    className="
      flex
      flex-col
      sm:flex-row

      sm:items-center
      sm:justify-between

      gap-4

      mb-6
      sm:mb-8
    "
  >
    <div>
      <h3
        className="
          text-xl
          sm:text-2xl
          lg:text-3xl

          font-bold
        "
      >
        Write a Review
      </h3>

      <p
        className="
          text-xs
          sm:text-sm

          text-base-content/60

          mt-1
        "
      >
        Share your experience with this product
      </p>
    </div>

    <div
      className="
        badge
        badge-primary

        badge-md
        sm:badge-lg

        self-start
        sm:self-auto
      "
    >
      {reviews.length} Reviews
    </div>
  </div>

  {/* Form */}

  <form
    onSubmit={handleSubmit}
    className="
      space-y-5
      sm:space-y-6
    "
  >
    <div
      className="
        grid

        grid-cols-1
        lg:grid-cols-4

        gap-5
        sm:gap-6
        lg:gap-8
      "
    >
      {/* Rating */}

      <div>
        <label
          className="
            font-medium
            block
            mb-3
          "
        >
          Rating
        </label>

        <div
          className="
            rating

            rating-sm
            sm:rating-md
            lg:rating-lg

            flex
            flex-wrap
            gap-1
          "
        >
          {[1, 2, 3, 4, 5].map((star) => (
            <input
              key={star}
              type="radio"
              name="rating"
              className="mask mask-star-2 bg-warning"
              checked={rating === star}
              onChange={() => setRating(star)}
            />
          ))}
        </div>
      </div>

      {/* Comment */}

      <div className="lg:col-span-3">
        <label
          className="
            font-semibold
            block
            mb-3
          "
        >
          Your Review
        </label>

        <textarea
          value={comment}
          onChange={(e) =>
            setComment(
              e.target.value
            )
          }
          placeholder="Share your experience with this product..."
          className="
            textarea
            textarea-bordered

            w-full

            h-32
            sm:h-40

            text-sm
            sm:text-base
          "
          required
        />
      </div>
    </div>

    {/* Submit Button */}

    <div
      className="
        flex
        justify-stretch
        sm:justify-end
      "
    >
      <button
        type="submit"
        className="
          btn
          btn-primary

          w-full
          sm:w-auto

          px-6
          sm:px-8

          rounded-xl
        "
      >
        Submit Review
      </button>
    </div>
  </form>
</div>

      {/* Review List */}

   <div
  className="
    space-y-4
    sm:space-y-5
    lg:space-y-6
  "
>
  {reviews.length === 0 ? (

    <div
      className="
        bg-base-100
        rounded-2xl
        sm:rounded-3xl

        border
        border-base-300

        shadow-lg

        py-10
        sm:py-14
        lg:py-20

        px-4
        sm:px-6

        text-center
      "
    >
      <div
        className="
          text-4xl
          sm:text-5xl
          lg:text-6xl

          mb-3
          sm:mb-4
        "
      >
        ⭐
      </div>

      <h3
        className="
          text-xl
          sm:text-2xl
          lg:text-3xl

          font-bold
        "
      >
        No Reviews Yet
      </h3>

      <p
        className="
          text-sm
          sm:text-base

          text-base-content/60

          mt-2
        "
      >
        Be the first customer to review this product.
      </p>
    </div>

  ) : (

    <div
      className="
        grid

        grid-cols-1

        gap-4
        sm:gap-5
        lg:gap-6
      "
    >
      {reviews.map((review) => (
        <ReviewCard
          key={review._id}
          review={review}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          handleUpdate={handleUpdate}
        />
      ))}
    </div>

  )}
</div>

      {
  editingReview && (

  <dialog
  className="
    modal
    modal-open
  "
>
  <div
    className="
      modal-box

      w-[95%]
      max-w-md
      sm:max-w-lg
      lg:max-w-xl

      rounded-2xl
      sm:rounded-3xl

      p-4
      sm:p-6
      lg:p-8
    "
  >
    {/* Header */}

    <div
      className="
        flex
        items-center
        justify-between

        mb-4
        sm:mb-6
      "
    >
      <h3
        className="
          text-lg
          sm:text-xl
          lg:text-2xl

          font-bold
        "
      >
        Edit Review
      </h3>

      <button
        onClick={() =>
          setEditingReview(null)
        }
        className="
          btn
          btn-circle
          btn-sm
        "
      >
        ✕
      </button>
    </div>

    {/* Rating */}

    <div className="mb-4">
      <label
        className="
          block
          font-medium
          mb-2
          text-sm
          sm:text-base
        "
      >
        Rating
      </label>

      <select
        value={editRating}
        onChange={(e) =>
          setEditRating(
            Number(
              e.target.value
            )
          )
        }
        className="
          select
          select-bordered

          w-full

          text-sm
          sm:text-base
        "
      >
        <option value="5">
          ⭐⭐⭐⭐⭐
        </option>

        <option value="4">
          ⭐⭐⭐⭐
        </option>

        <option value="3">
          ⭐⭐⭐
        </option>

        <option value="2">
          ⭐⭐
        </option>

        <option value="1">
          ⭐
        </option>
      </select>
    </div>

    {/* Comment */}

    <div>
      <label
        className="
          block
          font-medium
          mb-2
          text-sm
          sm:text-base
        "
      >
        Review Comment
      </label>

      <textarea
        value={editComment}
        onChange={(e) =>
          setEditComment(
            e.target.value
          )
        }
        className="
          textarea
          textarea-bordered

          w-full

          h-28
          sm:h-32
          lg:h-36

          text-sm
          sm:text-base
        "
        placeholder="Update your review..."
      />
    </div>

    {/* Footer */}

    <div
      className="
        flex

        flex-col-reverse
        sm:flex-row

        gap-3

        sm:justify-end

        mt-6
        sm:mt-8
      "
    >
      <button
        onClick={() =>
          setEditingReview(null)
        }
        className="
          btn
          btn-outline

          w-full
          sm:w-auto
        "
      >
        Cancel
      </button>

      <button
        onClick={handleUpdate}
        className="
          btn
          btn-primary

          w-full
          sm:w-auto
        "
      >
        Update Review
      </button>
    </div>
  </div>
</dialog>

  )
}

    </div>
  );
};

export default ProductReviews;