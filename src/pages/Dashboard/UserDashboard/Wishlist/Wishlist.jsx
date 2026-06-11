import { useEffect, useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import WishlistCard from "../../../../coponents/Card/WishlistCard";
import Swal from "sweetalert2";

const Wishlist = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/wishlist/${user.email}`)
        .then((res) => {
          setWishlist(res.data);
        });
    }
  }, [user, axiosSecure]);

  const handleDeleteWishlist = async (id) => {

    const result = await Swal.fire({
      title: "Remove From Wishlist?",
      text: "This product will be removed from your wishlist.",
      icon: "warning",

      showCancelButton: true,

      confirmButtonText: "Yes, Remove",

      cancelButtonText: "Cancel",

      confirmButtonColor: "#ef4444",
    });

    if (!result.isConfirmed) return;

    try {

      await axiosSecure.delete(
        `/wishlist/${id}`
      );

      setWishlist(
        wishlist.filter(
          item => item._id !== id
        )
      );

      Swal.fire({
        icon: "success",

        title: "Removed ❤️",

        text: "Product removed from wishlist.",

        confirmButtonColor: "#8B5CF6",
      });

    } catch (error) {

      console.log(error);

      Swal.fire({
        icon: "error",

        title: "Failed",

        text: "Something went wrong.",
      });

    }

  };

  return (
    <div>

      <div className="mb-8">

        <h2 className="text-4xl font-bold">
          My Wishlist
        </h2>

        <p className="text-base-content/60 mt-2">
          Products you saved for later
        </p>

      </div>

      {
        wishlist.length === 0 ? (

          <div className="text-center py-20 bg-base-100 rounded-3xl shadow-lg">

            <div className="text-6xl mb-4">
              ❤️
            </div>

            <h3 className="text-2xl font-bold">
              Wishlist Empty
            </h3>

            <p className="text-base-content/60 mt-2">
              Save products you like and find them later.
            </p>

          </div>

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {
              wishlist.map((product) => (

                <WishlistCard
                  key={product._id}
                  item={product}
                  handleDeleteWishlist={
                    handleDeleteWishlist
                  }
                />

              ))
            }

          </div>

        )
      }

    </div>
  );
};

export default Wishlist;