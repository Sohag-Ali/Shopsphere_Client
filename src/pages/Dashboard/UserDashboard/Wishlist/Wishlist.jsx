import { useEffect, useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import WishlistCard from "../../../../coponents/Card/WishlistCard";



const Wishlist = () => {

  const { user } =
    useAuth();

  const axiosSecure =
    useAxiosSecure();

  const [wishlist,
    setWishlist] =
    useState([]);

  useEffect(() => {

    if (user?.email) {

      axiosSecure
        .get(
          `/wishlist/${user.email}`
        )
        .then((res) => {

          setWishlist(
            res.data
          );

        });

    }

  }, [
    user,
    axiosSecure
  ]);

  return (
    <div>

      <h2
        className="
          text-3xl
          font-bold
          mb-8
        "
      >
        My Wishlist
      </h2>

      {
        wishlist.length === 0
          ? (
            <div
              className="
                text-center
                py-20
              "
            >

              <h3
                className="
                  text-2xl
                  font-semibold
                "
              >
                No Wishlist Items
              </h3>

            </div>
          )
          : (
            <div
              className="
                grid
                grid-cols-1
                md:grid-cols-2
                lg:grid-cols-3
                gap-6
              "
            >

              {
                wishlist.map(
                  (product) => (

                    <WishlistCard
                      key={
                        product._id
                      }
                      item={
                        product
                      }
                    />

                  )
                )
              }

            </div>
          )
      }

    </div>
  );
};

export default Wishlist;