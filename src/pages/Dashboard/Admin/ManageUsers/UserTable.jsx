const UserTable = ({
  users,
  handleMakeAdmin,
  handleBanUser,
  handleDeleteUser,
}) => {
  return (
    <>
      {/* Desktop Table */}

      <div
        className="
          hidden
          lg:block

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
                    <span className="break-all">
                      {user.email}
                    </span>
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
                      {user.role}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`
                        badge
                        ${
                          user.status ===
                          "banned"
                            ? "badge-error"
                            : "badge-success"
                        }
                      `}
                    >
                      {user.status ||
                        "active"}
                    </span>
                  </td>

                  <td>
                    <div className="flex gap-2">
                      {user.role !==
                        "admin" && (
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
                        {user.status ===
                        "banned"
                          ? "Unban"
                          : "Ban"}
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

      {/* Mobile & Tablet Cards */}

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-4
          lg:hidden
        "
      >
        {users.map((user) => (
          <div
            key={user._id}
            className="
              bg-base-100
              rounded-3xl
              shadow-xl
              p-4
            "
          >
            {/* User Info */}

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
                  w-14
                  h-14
                  rounded-full
                  object-cover
                "
              />

              <div className="min-w-0">
                <h3
                  className="
                    font-bold
                    truncate
                  "
                >
                  {user.name}
                </h3>

                <p
                  className="
                    text-xs
                    text-base-content/60
                    break-all
                  "
                >
                  {user.email}
                </p>
              </div>
            </div>

            {/* Role & Status */}

            <div
              className="
                flex
                flex-wrap
                gap-2
                mt-4
              "
            >
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
                {user.role}
              </span>

              <span
                className={`
                  badge
                  ${
                    user.status ===
                    "banned"
                      ? "badge-error"
                      : "badge-success"
                  }
                `}
              >
                {user.status ||
                  "active"}
              </span>
            </div>

            {/* Actions */}

            <div
              className="
                grid
                grid-cols-1
                sm:grid-cols-3
                gap-2
                mt-5
              "
            >
              {user.role !==
                "admin" && (
                <button
                  onClick={() =>
                    handleMakeAdmin(
                      user._id
                    )
                  }
                  className="
                    btn
                    btn-primary
                    btn-sm
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
                  btn-warning
                  btn-sm
                "
              >
                {user.status ===
                "banned"
                  ? "Unban"
                  : "Ban"}
              </button>

              <button
                onClick={() =>
                  handleDeleteUser(
                    user._id
                  )
                }
                className="
                  btn
                  btn-error
                  btn-sm
                "
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default UserTable;