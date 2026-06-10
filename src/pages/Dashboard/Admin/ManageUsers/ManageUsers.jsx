import { useEffect, useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const ManageUsers = () => {

  const axiosSecure =
    useAxiosSecure();

  const [users, setUsers] =
    useState([]);

  useEffect(() => {

    axiosSecure
      .get("/users")
      .then((res) => {

        setUsers(
          res.data
        );

      });

  }, [axiosSecure]);

  const handleMakeAdmin = (
    id
  ) => {

    axiosSecure
      .patch(
        `/users/admin/${id}`
      )
      .then(() => {

        const updated =
          users.map((user) => {

            if (
              user._id === id
            ) {

              return {
                ...user,
                role:
                  "admin"
              };

            }

            return user;

          });

        setUsers(updated);

      });

  };

  return (
    <div>

      <h2
        className="
          text-3xl
          font-bold
          mb-8
        "
      >
        Manage Users
      </h2>

      <div className="overflow-x-auto">

        <table
          className="
            table
            table-zebra
          "
        >

          <thead>

            <tr>

              <th>
                User
              </th>

              <th>
                Email
              </th>

              <th>
                Role
              </th>

              <th>
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {
              users.map(
                (user) => (

                  <tr
                    key={
                      user._id
                    }
                  >

                    <td>

                      <div
                        className="
                          flex
                          items-center
                          gap-3
                        "
                      >

                        <img
                          src={
                            user.photoURL
                          }
                          alt=""
                          className="
                            w-12
                            h-12
                            rounded-full
                          "
                        />

                        <span>
                          {
                            user.name
                          }
                        </span>

                      </div>

                    </td>

                    <td>
                      {
                        user.email
                      }
                    </td>

                    <td>

                      <span
                        className={`
                          badge
                          ${
                            user.role ===
                            "admin"
                              ? "badge-success"
                              : "badge-info"
                          }
                        `}
                      >

                        {
                          user.role
                        }

                      </span>

                    </td>

                    <td>

                      {
                        user.role !==
                          "admin" && (

                          <button
                            onClick={() =>
                              handleMakeAdmin(
                                user._id
                              )
                            }
                            className="
                              btn
                              btn-sm
                              btn-primary
                            "
                          >

                            Make Admin

                          </button>

                        )
                      }

                    </td>

                  </tr>

                )
              )
            }

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default ManageUsers;