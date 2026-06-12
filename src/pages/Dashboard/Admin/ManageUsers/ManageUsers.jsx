import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import UserTable from "./UserTable";


const ManageUsers = () => {

  const axiosSecure =
    useAxiosSecure();

  const [users, setUsers] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    axiosSecure
      .get("/users")
      .then((res) => {

        setUsers(
          res.data
        );

      })
      .catch((error) => {

        console.log(error);

      })
      .finally(() => {

        setLoading(false);

      });

  }, [axiosSecure]);

  // Make Admin

  const handleMakeAdmin =
  async (id) => {

    const result =
      await Swal.fire({

        title:
          "Make Admin?",

        text:
          "This user will get administrator privileges.",

        icon:
          "question",

        showCancelButton:
          true,

        confirmButtonColor:
          "#8B5CF6",

        cancelButtonColor:
          "#6b7280",

        confirmButtonText:
          "Yes, Make Admin",

      });

    if (
      !result.isConfirmed
    )
      return;

    try {

      const res =
        await axiosSecure.patch(
          `/users/admin/${id}`
        );

      if (
        res.data.modifiedCount
      ) {

        setUsers(

          users.map(
            (user) =>

              user._id === id

                ? {
                    ...user,
                    role:
                      "admin",
                  }

                : user
          )

        );

        Swal.fire({

          icon:
            "success",

          title:
            "Admin Access Granted 👑",

          text:
            "The user has been promoted to administrator.",

          confirmButtonColor:
            "#8B5CF6",

        });

      }

    } catch (error) {

      console.log(error);

      Swal.fire({

        icon:
          "error",

        title:
          "Failed",

        text:
          "Could not promote user to admin.",

      });

    }

  };

  // Ban / Unban

const handleBanUser = async (id) => {

  const selectedUser =
    users.find(
      (user) => user._id === id
    );

  const isCurrentlyBanned =
    selectedUser?.status === "banned";

  const result =
    await Swal.fire({

      title: isCurrentlyBanned
        ? "Unban User?"
        : "Ban User?",

      text: isCurrentlyBanned
        ? "This user will regain access to the platform."
        : "This user will no longer be able to access the platform.",

      icon: "warning",

      showCancelButton: true,

      confirmButtonColor:
        isCurrentlyBanned
          ? "#10b981"
          : "#ef4444",

      cancelButtonColor:
        "#6b7280",

      confirmButtonText:
        isCurrentlyBanned
          ? "Yes, Unban"
          : "Yes, Ban",

      cancelButtonText:
        "Cancel",
    });

  if (!result.isConfirmed)
    return;

  try {

    const res =
      await axiosSecure.patch(
        `/users/ban/${id}`
      );

    if (
      res.data.modifiedCount
    ) {

      setUsers(

        users.map(
          (user) =>

            user._id === id

              ? {
                  ...user,

                  status:
                    user.status ===
                    "banned"

                      ? "active"

                      : "banned",
                }

              : user
        )

      );

      Swal.fire({

        icon:
          isCurrentlyBanned
            ? "success"
            : "warning",

        title:
          isCurrentlyBanned
            ? "User Unbanned ✅"
            : "User Banned 🚫",

        text:
          isCurrentlyBanned
            ? "The user can now access the platform."
            : "The user has been restricted from accessing the platform.",

        confirmButtonColor:
          "#8B5CF6",
      });

    }

  } catch (error) {

    console.log(error);

    Swal.fire({

      icon: "error",

      title:
        "Something Went Wrong",

      text:
        "Failed to update user status.",

    });

  }

};

  // Delete User

  const handleDeleteUser =
  async (id) => {

    const result =
      await Swal.fire({

        title:
          "Delete User?",

        text:
          "This action cannot be undone.",

        icon:
          "warning",

        showCancelButton:
          true,

        confirmButtonColor:
          "#ef4444",

        cancelButtonColor:
          "#6b7280",

        confirmButtonText:
          "Yes, Delete",

        cancelButtonText:
          "Cancel",

      });

    if (
      !result.isConfirmed
    )
      return;

    try {

      const res =
        await axiosSecure.delete(
          `/users/${id}`
        );

      if (
        res.data.deletedCount
      ) {

        setUsers(

          users.filter(
            (user) =>
              user._id !== id
          )

        );

        Swal.fire({

          icon:
            "success",

          title:
            "User Deleted Successfully 🗑️",

          text:
            "The user account has been permanently removed.",

          confirmButtonColor:
            "#8B5CF6",

        });

      }

    } catch (error) {

      console.log(error);

      Swal.fire({

        icon:
          "error",

        title:
          "Delete Failed",

        text:
          "Unable to delete this user.",

      });

    }

  };

  return (

    <div className="
    
    mx-auto

    px-4
    sm:px-6
    lg:px-8

    space-y-6
    sm:space-y-8
    lg:space-y-10
  ">

      {/* Page Header */}

    <div
  className="
    mb-6
    sm:mb-8
  "
>
  <h1
    className="
      text-2xl
      sm:text-3xl
      lg:text-4xl

      font-bold

      leading-tight
    "
  >
    Manage Users
  </h1>

  <p
    className="
      text-sm
      sm:text-base

      text-base-content/60

      mt-2

      max-w-2xl
    "
  >
    Manage user roles,
    account status
    and permissions
  </p>
</div>

      {/* Stats */}

     <div
  className="
    grid

    grid-cols-1
    sm:grid-cols-2
    lg:grid-cols-3

    gap-4
    sm:gap-5
    lg:gap-6

    mb-6
    sm:mb-8
  "
>
  {/* Total Users */}

  <div
    className="
      bg-base-100
      rounded-2xl
      shadow-lg

      p-4
      sm:p-5
      lg:p-6
    "
  >
    <h3
      className="
        text-xs
        sm:text-sm

        text-base-content/60
      "
    >
      Total Users
    </h3>

    <p
      className="
        text-2xl
        sm:text-3xl
        lg:text-4xl

        font-bold

        mt-2
      "
    >
      {users.length}
    </p>
  </div>

  {/* Admins */}

  <div
    className="
      bg-base-100
      rounded-2xl
      shadow-lg

      p-4
      sm:p-5
      lg:p-6
    "
  >
    <h3
      className="
        text-xs
        sm:text-sm

        text-base-content/60
      "
    >
      Admins
    </h3>

    <p
      className="
        text-2xl
        sm:text-3xl
        lg:text-4xl

        font-bold
        text-success

        mt-2
      "
    >
      {
        users.filter(
          (user) =>
            user.role === "admin"
        ).length
      }
    </p>
  </div>

  {/* Banned Users */}

  <div
    className="
      bg-base-100
      rounded-2xl
      shadow-lg

      p-4
      sm:p-5
      lg:p-6

      sm:col-span-2
      lg:col-span-1
    "
  >
    <h3
      className="
        text-xs
        sm:text-sm

        text-base-content/60
      "
    >
      Banned Users
    </h3>

    <p
      className="
        text-2xl
        sm:text-3xl
        lg:text-4xl

        font-bold
        text-error

        mt-2
      "
    >
      {
        users.filter(
          (user) =>
            user.status === "banned"
        ).length
      }
    </p>
  </div>
</div>

      {/* Loading */}

      {loading ? (

        <div className="space-y-4">

          {[...Array(6)].map(
            (_, index) => (

              <div
                key={index}
                className="
                  skeleton
                  h-16
                  w-full
                "
              ></div>

            )
          )}

        </div>

      ) : (

        <UserTable
          users={users}
          handleMakeAdmin={
            handleMakeAdmin
          }
          handleBanUser={
            handleBanUser
          }
          handleDeleteUser={
            handleDeleteUser
          }
        />

      )}

    </div>

  );

};

export default ManageUsers;