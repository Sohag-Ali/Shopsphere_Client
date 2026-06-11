const UserTable = ({
  users,
  handleMakeAdmin,
  handleBanUser,
  handleDeleteUser,
}) => {

  return (

    <div
      className="
        bg-base-100
        rounded-3xl
        shadow-xl
        overflow-hidden
      "
    >

      <div className="overflow-x-auto">

        <table className="table">

          <thead>

            <tr>

              <th>User</th>

              <th>Email</th>

              <th>Role</th>

              <th>Status</th>

              <th>Actions</th>

            </tr>

          </thead>

          <tbody>

            {users.map((user) => (

              <tr key={user._id}>

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
                        user.photo ||
                        user.photoURL
                      }
                      alt=""
                      className="
                        w-12
                        h-12
                        rounded-full
                        object-cover
                      "
                    />

                    <div>

                      <h3 className="font-semibold">
                        {user.name}
                      </h3>

                    </div>

                  </div>

                </td>

                <td>
                  {user.email}
                </td>

                <td>

                  <span
                    className={`
                      badge

                      ${
                        user.role === "admin"
                          ? "badge-success"
                          : "badge-info"
                      }
                    `}
                  >

                    {user.role}

                  </span>

                </td>

                <td>

                  <span
                    className={`
                      badge

                      ${
                        user.status === "banned"
                          ? "badge-error"
                          : "badge-success"
                      }
                    `}
                  >

                    {user.status || "active"}

                  </span>

                </td>

                <td>

                  <div className="flex gap-2">

                    {user.role !== "admin" && (

                      <button
                        onClick={() =>
                          handleMakeAdmin(
                            user._id
                          )
                        }
                        className="
                          btn
                          btn-xs
                          btn-primary
                        "
                      >
                        Admin
                      </button>

                    )}

                    <button
                      onClick={() =>
                        handleBanUser(
                          user._id
                        )
                      }
                      className="
                        btn
                        btn-xs
                        btn-warning
                      "
                    >
                      {
                        user.status ===
                        "banned"
                          ? "Unban"
                          : "Ban"
                      }
                    </button>

                    <button
                      onClick={() =>
                        handleDeleteUser(
                          user._id
                        )
                      }
                      className="
                        btn
                        btn-xs
                        btn-error
                      "
                    >
                      Delete
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

};

export default UserTable;