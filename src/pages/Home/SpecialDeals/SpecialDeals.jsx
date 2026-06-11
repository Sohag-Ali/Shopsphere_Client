import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import ProductCard from "../../../coponents/Card/ProductCard ";

const SpecialDeals = () => {
  const axiosSecure = useAxiosSecure();

  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosSecure
      .get("/special-deals")
      .then((res) => {
        setDeals(res.data);
        console.log("Special Deals:", res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [axiosSecure]);

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto py-20 px-4">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold">Special Deals</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="skeleton h-80 w-full rounded-xl"></div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto py-20 px-4">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold">Special Deals</h2>

        <p className="mt-2 text-base-content/70">Grab today's best discounts</p>
      </div>

      <div
        className="
        grid
        grid-cols-1
        md:grid-cols-2
        lg:grid-cols-4
        gap-6
      "
      >
        {deals.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            showDiscount={true}
          />
        ))}
      </div>
    </section>
  );
};

export default SpecialDeals;
