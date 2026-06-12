import { useEffect, useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import WishlistCard from "../../../../coponents/Card/WishlistCard";
import Swal from "sweetalert2";

const Wishlist = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/wishlist/${user.email}`)
        .then((res) => {
          setWishlist(res.data);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
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
      await axiosSecure.delete(`/wishlist/${id}`);

      setWishlist(
        wishlist.filter(
          (item) => item._id !== id
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
    <div className="mx-auto

    px-4
    sm:px-6
    lg:px-8

    space-y-6
    sm:space-y-8
    lg:space-y-10">

      {/* Header */}

      <div className="mb-8 sm:mb-10">

        <h2
          className="
            text-2xl
            sm:text-3xl
            md:text-4xl
            font-bold
          "
        >
          My Wishlist
        </h2>

        <p
          className="
            text-sm
            sm:text-base
            text-base-content/60
            mt-2
          "
        >
          Products you saved for later
        </p>

      </div>

      {/* Loading */}

      {loading && (
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            xl:grid-cols-3
            gap-4
            sm:gap-6
          "
        >
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="
                skeleton
                h-[420px]
                w-full
                rounded-3xl
              "
            />
          ))}
        </div>
      )}

      {/* Empty State */}

      {!loading &&
        wishlist.length === 0 && (

          <div
            className="
              text-center
              py-12
              sm:py-20
              px-4
              bg-base-100
              rounded-3xl
              shadow-lg
            "
          >
            <div
              className="
                text-5xl
                sm:text-6xl
                mb-4
              "
            >
              ❤️
            </div>

            <h3
              className="
                text-xl
                sm:text-2xl
                font-bold
              "
            >
              Wishlist Empty
            </h3>

            <p
              className="
                text-sm
                sm:text-base
                text-base-content/60
                mt-2
                max-w-md
                mx-auto
              "
            >
              Save products you like and
              find them later.
            </p>
          </div>

        )}

      {/* Wishlist Grid */}

      {!loading &&
        wishlist.length > 0 && (

          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              xl:grid-cols-3
              gap-4
              sm:gap-6
            "
          >
            {wishlist.map((product) => (
              <WishlistCard
                key={product._id}
                item={product}
                handleDeleteWishlist={
                  handleDeleteWishlist
                }
              />
            ))}
          </div>

        )}
    </div>
  );
};

export default Wishlist;