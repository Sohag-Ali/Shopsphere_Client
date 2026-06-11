import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const Cart = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: cartItems = [],
    refetch,
  } = useQuery({
    queryKey: ["cart", user?.email],
    enabled: !!user?.email,

    queryFn: async () => {
      const res = await axiosSecure.get(
        `/cart/${user.email}`
      );

      return res.data;
    },
  });

  const increaseQuantity = (id) => {
    axiosSecure
      .patch(`/cart/increase/${id}`)
      .then(() => {
        refetch();
      });
  };

  const decreaseQuantity = (id) => {
    axiosSecure
      .patch(`/cart/decrease/${id}`)
      .then(() => {
        refetch();
      });
  };

 const handleDelete = async (id) => {

  const result = await Swal.fire({
    title: "Remove Product?",
    text: "This item will be removed from your cart.",
    icon: "warning",

    showCancelButton: true,

    confirmButtonColor: "#ef4444",

    cancelButtonColor: "#6b7280",

    confirmButtonText: "Yes, Remove",

    cancelButtonText: "Cancel",
  });

  if (!result.isConfirmed) return;

  try {

    await axiosSecure.delete(
      `/cart/${id}`
    );

    refetch();

    Swal.fire({
      icon: "success",

      title: "Removed Successfully 🗑️",

      text: "Product has been removed from your cart.",

      confirmButtonColor: "#8B5CF6",
    });

  } catch (error) {

    console.log(error);

    Swal.fire({
      icon: "error",

      title: "Oops...",

      text: "Something went wrong!",
    });

  }

};



  const totalPrice = cartItems.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  const handleCartCheckout = async () => {
  try {

    const paymentData = {
      email: user.email,
      userName: user.displayName,

      cartItems,

      totalPrice,
    };

    const res =
      await axiosSecure.post(
        "/create-checkout-session",
        paymentData
      );

    window.location.replace(
      res.data.url
    );

  } catch (error) {

    console.log(error);

  }
};

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      <h1 className="text-4xl font-bold mb-8">
        Shopping Cart
      </h1>

      <div className="space-y-4">

        {cartItems.map((item) => (

          <div
            key={item._id}
            className="
              bg-base-100
              shadow
              rounded-xl
              p-4
              flex
              flex-col
              md:flex-row
              justify-between
              items-center
              gap-4
            "
          >

            <div className="flex items-center gap-4">

              <img
                src={item.image}
                alt={item.title}
                className="
                  w-24
                  h-24
                  rounded-lg
                  object-cover
                "
              />

              <div>

                <h2 className="font-bold text-lg">
                  {item.title}
                </h2>

                <p>
                  ৳ {item.price}
                </p>

                <p className="text-sm text-gray-500">
                  Subtotal:
                  ৳ {item.price * item.quantity}
                </p>

              </div>

            </div>

            <div className="flex items-center gap-3">

              <button
                onClick={() =>
                  decreaseQuantity(item._id)
                }
                className="btn btn-sm"
              >
                -
              </button>

              <span className="font-bold text-lg">
                {item.quantity}
              </span>

              <button
                onClick={() =>
                  increaseQuantity(item._id)
                }
                className="btn btn-sm"
              >
                +
              </button>

            </div>

            <button
              onClick={() =>
                handleDelete(item._id)
              }
              className="btn btn-error"
            >
              Remove
            </button>

          </div>

        ))}

      </div>

      <div
        className="
          mt-10
          bg-base-200
          rounded-xl
          p-6
        "
      >

        <h2 className="text-2xl font-bold">
          Total: ৳ {totalPrice}
        </h2>

        <button
        disabled={cartItems.length === 0}
        onClick={handleCartCheckout}
          className="
            btn
            btn-primary
            mt-4
          "
        >
          Proceed To Checkout
        </button>

      </div>

    </div>
  );
};

export default Cart;