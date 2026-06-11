import { useEffect, useState } from "react";
import { Link } from "react-router";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";

const AdminProfile = () => {

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [profile, setProfile] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    if (user?.email) {

      axiosSecure
        .get(
          `/admin/profile/${user.email}`
        )
        .then((res) => {

          setProfile(
            res.data
          );

        })
        .catch((error) => {

          console.log(error);

        })
        .finally(() => {

          setLoading(false);

        });

    }

  }, [
    user,
    axiosSecure,
  ]);

  if (
    loading ||
    !profile ||
    !profile.user
  ) {

    return (

      <div className="flex justify-center py-20">

        <span className="loading loading-spinner loading-lg"></span>

      </div>

    );

  }

  return (

    <div className="space-y-8">

      {/* Header */}

      <div
        className="
          bg-base-100
          rounded-3xl
          shadow-xl
          p-8
        "
      >

        <div
          className="
            flex
            flex-col
            lg:flex-row
            items-center
            gap-8
          "
        >

          <img
            src={
              profile.user.photo ||
              profile.user.photoURL ||
              "https://i.ibb.co/4pDNDk1/avatar.png"
            }
            alt=""
            className="
              w-32
              h-32
              rounded-full
              border-4
              border-primary
              object-cover
            "
          />

          <div className="flex-1">

            <h1
              className="
                text-4xl
                font-bold
              "
            >
              {profile.user.name}
            </h1>

            <p
              className="
                text-base-content/60
                mt-2
              "
            >
              {profile.user.email}
            </p>

            <div className="mt-4">

              <span
                className="
                  badge
                  badge-primary
                  badge-lg
                "
              >
                Administrator
              </span>

            </div>

          </div>

        </div>

      </div>

      {/* Stats */}

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-5
          gap-6
        "
      >

        <div
          className="
            bg-base-100
            rounded-3xl
            shadow-xl
            p-6
          "
        >

          <p className="text-base-content/60">
            Products
          </p>

          <h2
            className="
              text-4xl
              font-bold
              text-primary
              mt-2
            "
          >
            {profile.totalProducts}
          </h2>

        </div>

        <div
          className="
            bg-base-100
            rounded-3xl
            shadow-xl
            p-6
          "
        >

          <p className="text-base-content/60">
            Users
          </p>

          <h2
            className="
              text-4xl
              font-bold
              text-success
              mt-2
            "
          >
            {profile.totalUsers}
          </h2>

        </div>

        <div
          className="
            bg-base-100
            rounded-3xl
            shadow-xl
            p-6
          "
        >

          <p className="text-base-content/60">
            Orders
          </p>

          <h2
            className="
              text-4xl
              font-bold
              text-warning
              mt-2
            "
          >
            {profile.totalOrders}
          </h2>

        </div>

        <div
          className="
            bg-base-100
            rounded-3xl
            shadow-xl
            p-6
          "
        >

          <p className="text-base-content/60">
            Reviews
          </p>

          <h2
            className="
              text-4xl
              font-bold
              text-info
              mt-2
            "
          >
            {profile.totalReviews}
          </h2>

        </div>

        <div
          className="
            bg-base-100
            rounded-3xl
            shadow-xl
            p-6
          "
        >

          <p className="text-base-content/60">
            Revenue
          </p>

          <h2
            className="
              text-4xl
              font-bold
              text-error
              mt-2
            "
          >
            ৳
            {profile.totalRevenue?.toLocaleString()}
          </h2>

        </div>

      </div>

      {/* Account Info */}

      <div
        className="
          bg-base-100
          rounded-3xl
          shadow-xl
          p-8
        "
      >

        <h2
          className="
            text-2xl
            font-bold
            mb-6
          "
        >
          Account Information
        </h2>

        <div
          className="
            grid
            md:grid-cols-2
            gap-5
          "
        >

          <div>

            <p className="text-base-content/60">
              Name
            </p>

            <h3 className="font-semibold">
              {profile.user.name}
            </h3>

          </div>

          <div>

            <p className="text-base-content/60">
              Email
            </p>

            <h3 className="font-semibold">
              {profile.user.email}
            </h3>

          </div>

          <div>

            <p className="text-base-content/60">
              Role
            </p>

            <h3 className="font-semibold capitalize">
              {profile.user.role}
            </h3>

          </div>

          <div>

            <p className="text-base-content/60">
              Status
            </p>

            <span className="badge badge-success">
              Active
            </span>

          </div>

        </div>

      </div>

      {/* Quick Actions */}

      <div
        className="
          bg-base-100
          rounded-3xl
          shadow-xl
          p-8
        "
      >

        <h2
          className="
            text-2xl
            font-bold
            mb-6
          "
        >
          Quick Actions
        </h2>

        <div
          className="
            grid
            md:grid-cols-2
            xl:grid-cols-4
            gap-4
          "
        >

          <Link
            to="/dashboard/admin/add-product"
            className="
              btn
              btn-primary
            "
          >
            Add Product
          </Link>

          <Link
            to="/dashboard/admin/manage-products"
            className="
              btn
              btn-outline
            "
          >
            Manage Products
          </Link>

          <Link
            to="/dashboard/admin/manage-users"
            className="
              btn
              btn-outline
            "
          >
            Manage Users
          </Link>

          <Link
            to="/dashboard/admin/manage-orders"
            className="
              btn
              btn-outline
            "
          >
            Manage Orders
          </Link>

        </div>

      </div>

    </div>

  );

};

export default AdminProfile;