import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import ReviewCard from "../Card/ReviewCard";

const ProductReviews = ({ productId, productTitle }) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

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

  return (
    <div>

      {/* Review Form */}

      <form
        onSubmit={handleSubmit}
        className="mb-8"
      >

        <select
          value={rating}
          onChange={(e) =>
            setRating(
              parseInt(e.target.value)
            )
          }
          className="
            select
            select-bordered
            mb-3
            w-full
          "
        >
          <option value="5">
            ⭐⭐⭐⭐⭐ 5 Star
          </option>

          <option value="4">
            ⭐⭐⭐⭐ 4 Star
          </option>

          <option value="3">
            ⭐⭐⭐ 3 Star
          </option>

          <option value="2">
            ⭐⭐ 2 Star
          </option>

          <option value="1">
            ⭐ 1 Star
          </option>
        </select>

        <textarea
          value={comment}
          onChange={(e) =>
            setComment(e.target.value)
          }
          placeholder="Write your review..."
          className="
            textarea
            textarea-bordered
            w-full
            h-32
          "
          required
        />

        <button
          type="submit"
          className="
            btn
            btn-primary
            mt-3
          "
        >
          Submit Review
        </button>

      </form>

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
            />
          ))
        )}

      </div>

    </div>
  );
};

export default ProductReviews;