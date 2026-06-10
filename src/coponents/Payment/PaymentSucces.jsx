import { useNavigate } from "react-router";
import { useEffect, useRef } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const PaymentSuccess = () => {

  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const calledRef = useRef(false);

  const searchParams =
    new URLSearchParams(window.location.search);

  const sessionId =
    searchParams.get("session_id");

useEffect(() => {

  if (
    !sessionId ||
    calledRef.current
  ) return;

  calledRef.current = true;

  axiosSecure
    .post(`/save-order/${sessionId}`)
    .then((res) => {

      console.log(
        "Order Saved",
        res.data
      );

    })
    .catch((error) => {

      console.log(error);

    });

}, [sessionId, axiosSecure]);

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">

      <div className="bg-base-100 max-w-xl w-full rounded-3xl shadow-xl p-10 text-center">

        <div className="w-24 h-24 mx-auto bg-green-100 rounded-full flex items-center justify-center">
          <span className="text-5xl">✅</span>
        </div>

        <h1 className="text-4xl font-bold text-green-600 mt-6">
          Payment Successful
        </h1>

        <p className="text-gray-500 mt-3">
          Thank you for your purchase.
        </p>

        <div className="bg-base-200 rounded-2xl p-6 mt-8">
          <h3 className="font-bold text-xl">
            Order Confirmed
          </h3>

          <p className="mt-2 text-gray-500">
            Your order has been placed successfully.
          </p>

          <p className="mt-4">
            Status:
            <span className="badge badge-warning ml-2">
              Pending
            </span>
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mt-8">

          <button
            onClick={() =>
              navigate("/dashboard/my-orders")
            }
            className="btn btn-primary"
          >
            View My Orders
          </button>

          <button
            onClick={() =>
              navigate("/shop")
            }
            className="btn btn-outline"
          >
            Continue Shopping
          </button>

        </div>

      </div>

    </div>
  );
};

export default PaymentSuccess;