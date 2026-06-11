import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import ReviewCard from "../Card/ReviewCard";

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

  try {

    await axiosSecure.delete(
      `/reviews/${id}`
    );

    fetchReviews();

  } catch (error) {

    console.log(error);

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

  } catch (error) {

    console.log(error);

  }

};

  return (
    <div>

      {/* Review Form */}
<div
  className="
    bg-base-100
    rounded-3xl
    border
    border-base-300
    shadow-lg
    p-6
    mb-8
  "
>

  <div
    className="
      flex
      flex-col
      md:flex-row
      md:items-center
      md:justify-between
      gap-3
      mb-8
    "
  >

    <div>

      <h3
        className="
          text-2xl
          font-bold
        "
      >
        Write a Review
      </h3>

      <p
        className="
          text-sm
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
        badge-lg
      "
    >
      {reviews.length} Reviews
    </div>

  </div>

  <form
  onSubmit={handleSubmit}
  className="space-y-5"
>

  <div
    className="
      grid
      grid-cols-1
      lg:grid-cols-4
      gap-8
    "
  >

    {/* Rating */}

   {/* Rating */}

    <div>

      <label
        className="
          font-medium
          block
          mb-2
        "
      >
        Rating
      </label>

      <div className="rating rating-lg">

        {[1,2,3,4,5].map((star) => (

          <input
            key={star}
            type="radio"
            name="rating"
            className="mask mask-star-2 bg-warning"
            checked={rating === star}
            onChange={() =>
              setRating(star)
            }
          />

        ))}

      </div>

    </div>

    {/* Comment */}

    <div
      className="
        lg:col-span-3
      "
    >

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
        placeholder="
          Share your experience with this product...
        "
        className="
          textarea
          textarea-bordered
          w-full
          h-40
        "
        required
      />

    </div>

  </div>

  <div
    className="
      flex
      justify-end
    "
  >

    <button
      type="submit"
      className="
        btn
        btn-primary
        px-8
        rounded-xl
      "
    >
      Submit Review
    </button>

  </div>

</form>

</div>

      {/* Review List */}

      <div className="space-y-4">

        {reviews.length === 0 ? (
          <p className="text-center text-gray-500">
            No Reviews Yet
          </p>
        ) : (
          reviews.map((review) => (
            <ReviewCard
              key={review._id}
              review={review}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              handleUpdate={handleUpdate}
            />
          ))
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
        "
      >

        <h3
          className="
            text-xl
            font-bold
            mb-4
          "
        >
          Edit Review
        </h3>

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
            mb-4
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
            h-32
          "
        />

        <div
          className="
            modal-action
          "
        >

          <button
            onClick={() =>
              setEditingReview(
                null
              )
            }
            className="btn"
          >
            Cancel
          </button>

          <button
            onClick={
              handleUpdate
            }
            className="
              btn
              btn-primary
            "
          >
            Update
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