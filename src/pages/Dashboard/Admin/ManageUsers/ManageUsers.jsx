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
              "User promoted to Admin",

            timer:
              1500,

            showConfirmButton:
              false,

          });

        }

      } catch (error) {

        console.log(error);

      }

    };

  // Ban / Unban

  const handleBanUser =
    async (id) => {

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

        }

      } catch (error) {

        console.log(error);

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
            "This action cannot be undone",

          icon:
            "warning",

          showCancelButton:
            true,

          confirmButtonColor:
            "#d33",

          confirmButtonText:
            "Delete",

        });

      if (
        result.isConfirmed
      ) {

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
                "User Deleted",

              timer:
                1500,

              showConfirmButton:
                false,

            });

          }

        } catch (error) {

          console.log(error);

        }

      }

    };

  return (

    <div>

      {/* Page Header */}

      <div className="mb-8">

        <h1
          className="
            text-4xl
            font-bold
          "
        >
          Manage Users
        </h1>

        <p
          className="
            text-base-content/60
            mt-2
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
          md:grid-cols-3
          gap-6
          mb-8
        "
      >

        <div
          className="
            bg-base-100
            rounded-2xl
            shadow-lg
            p-6
          "
        >

          <h3
            className="
              text-base-content/60
            "
          >
            Total Users
          </h3>

          <p
            className="
              text-4xl
              font-bold
              mt-2
            "
          >
            {users.length}
          </p>

        </div>

        <div
          className="
            bg-base-100
            rounded-2xl
            shadow-lg
            p-6
          "
        >

          <h3
            className="
              text-base-content/60
            "
          >
            Admins
          </h3>

          <p
            className="
              text-4xl
              font-bold
              text-success
              mt-2
            "
          >
            {
              users.filter(
                (user) =>
                  user.role ===
                  "admin"
              ).length
            }
          </p>

        </div>

        <div
          className="
            bg-base-100
            rounded-2xl
            shadow-lg
            p-6
          "
        >

          <h3
            className="
              text-base-content/60
            "
          >
            Banned Users
          </h3>

          <p
            className="
              text-4xl
              font-bold
              text-error
              mt-2
            "
          >
            {
              users.filter(
                (user) =>
                  user.status ===
                  "banned"
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