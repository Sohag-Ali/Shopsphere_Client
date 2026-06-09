import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import ReviewCard from "../../../coponents/Card/ReviewCard";

const CustomerReviews = () => {

  const axiosSecure = useAxiosSecure();

  const [reviews, setReviews] = useState([]);

  useEffect(() => {

    axiosSecure
      .get("/reviews")
      .then((res) => {
        setReviews(res.data);
      });

  }, [axiosSecure]);

  return (
    <section className="max-w-7xl mx-auto py-20 px-4">

      <div className="text-center mb-12">

        <h2 className="text-4xl font-bold">
          Customer Reviews
        </h2>

        <p className="mt-3 text-gray-500">
          What our customers say about us
        </p>

      </div>

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-3
          gap-6
        "
      >

        {reviews.map((review) => (
          <ReviewCard
            key={review._id}
            review={review}
          />
        ))}

      </div>

    </section>
  );
};

export default CustomerReviews;