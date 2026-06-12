import { useEffect, useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import Swal from "sweetalert2";

const Settings = () => {

  const { user, logoutUser, changePassword , forgotPassword } = useAuth();

  const isGoogleUser =
    user?.providerData?.[0]?.providerId ===
    "google.com";

  const [theme, setTheme] =
    useState(
      localStorage.getItem("theme") ||
      "shopsphere"
    );

    const [showPasswordModal, setShowPasswordModal] =
  useState(false);

const [passwordData, setPasswordData] =
  useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {

    document.documentElement.setAttribute(
      "data-theme",
      theme
    );

    localStorage.setItem(
      "theme",
      theme
    );

  }, [theme]);

  const handleThemeToggle = () => {

    setTheme(
      theme === "shopsphere"
        ? "shopsphere-dark"
        : "shopsphere"
    );

  };

  const handleLogout = () => {

  logoutUser()
    .then(() => {

      localStorage.removeItem(
        "access-token"
      );

      Swal.fire({

        icon: "success",

        title: "Logged Out Successfully",

        showConfirmButton: false,

        timer: 1500,

      });

    })
    .catch((error) => {

      console.log(error);

      Swal.fire({

        icon: "error",

        title: "Logout Failed",

      });

    });

};

const handleChangePassword =
async () => {

  if(
    passwordData.newPassword !==
    passwordData.confirmPassword
  ){

    return Swal.fire({

      icon: "error",

      title:
        "Passwords do not match",

    });
  }

  try {

    await changePassword(

      passwordData.currentPassword,

      passwordData.newPassword

    );

    Swal.fire({

      icon: "success",

      title:
        "Password Updated",

    });

    setShowPasswordModal(false);

  }
  catch(error){

    console.log(error);

    Swal.fire({

      icon: "error",

      title:
        "Wrong Current Password",

    });
  }
};

  return (

   <>
   <div
  className="mx-auto

    px-4
    sm:px-6
    lg:px-8

    space-y-6
    sm:space-y-8
    lg:space-y-10"
>
  <div
    className="
      bg-base-100
      rounded-3xl
      shadow-xl

      p-4
      sm:p-6
      lg:p-8
    "
  >
    {/* Heading */}

    <h2
      className="
        text-2xl
        sm:text-3xl
        font-bold
        mb-6
        sm:mb-8
      "
    >
      Settings
    </h2>

    {/* Account Info */}

    <div
      className="
        border-b
        border-base-300
        pb-5
        sm:pb-6
        mb-5
        sm:mb-6
      "
    >
      <h3
        className="
          text-lg
          sm:text-xl
          font-semibold
          mb-3
          sm:mb-4
        "
      >
        Account
      </h3>

      <p
        className="
          text-sm
          sm:text-base
          break-all
        "
      >
        <span className="font-bold">
          Email:
        </span>{" "}
        {user?.email}
      </p>
    </div>

    {/* Theme Toggle */}

    <div
      className="
        flex
        flex-col
        sm:flex-row

        sm:items-center
        justify-between

        gap-4

        border-b
        border-base-300

        pb-5
        sm:pb-6

        mb-5
        sm:mb-6
      "
    >
      <div>
        <h3
          className="
            font-semibold
            text-base
            sm:text-lg
          "
        >
          Dark Mode
        </h3>

        <p
          className="
            text-xs
            sm:text-sm
            text-base-content/60
          "
        >
          Switch between light and dark theme
        </p>
      </div>

      <input
        type="checkbox"
        className="
          toggle
          toggle-primary
          toggle-md
          sm:toggle-lg
        "
        checked={
          theme === "shopsphere-dark"
        }
        onChange={
          handleThemeToggle
        }
      />
    </div>

    {/* Notifications */}

    <div
      className="
        flex
        flex-col
        sm:flex-row

        sm:items-center
        justify-between

        gap-4

        border-b
        border-base-300

        pb-5
        sm:pb-6

        mb-5
        sm:mb-6
      "
    >
      <div>
        <h3
          className="
            font-semibold
            text-base
            sm:text-lg
          "
        >
          Notifications
        </h3>

        <p
          className="
            text-xs
            sm:text-sm
            text-base-content/60
          "
        >
          Receive updates and offers
        </p>
      </div>

      <input
        type="checkbox"
        className="
          toggle
          toggle-success
          toggle-md
          sm:toggle-lg
        "
        defaultChecked
      />
    </div>

    {/* Password */}

    <div
      className="
        flex
        flex-col
        sm:flex-row

        sm:items-center
        justify-between

        gap-4

        border-b
        border-base-300

        pb-5
        sm:pb-6

        mb-5
        sm:mb-6
      "
    >
      <div>
        <h3
          className="
            font-semibold
            text-base
            sm:text-lg
          "
        >
          Password
        </h3>

        <p
          className="
            text-xs
            sm:text-sm
            text-base-content/60
          "
        >
          Update your account password
        </p>
      </div>

      <button
        onClick={() => {
          if (isGoogleUser) {
            Swal.fire({
              icon: "info",
              title: "Google Account",
              text: "Password is managed by Google.",
            });

            return;
          }

          setShowPasswordModal(true);
        }}
        className="
          btn
          btn-outline
          btn-primary

          w-full
          sm:w-auto
        "
      >
        Change Password
      </button>
    </div>

    {/* Danger Zone */}

    <div>
      <h3
        className="
          text-red-500
          font-semibold
          text-base
          sm:text-lg
          mb-4
        "
      >
        Danger Zone
      </h3>

      <button
        onClick={handleLogout}
        className="
          btn
          btn-error
          rounded-2xl

          w-full
          sm:w-auto
        "
      >
        Logout
      </button>
    </div>
  </div>
</div>

    {
  showPasswordModal && (

    <dialog className="modal modal-open">
      <div
        className="
          modal-box

          w-[95%]
          sm:w-full

          max-w-2xl

          p-0

          rounded-3xl
          overflow-hidden

          max-h-[95vh]
        "
      >
        {/* Header */}

        <div
          className="
            bg-gradient-to-r
            from-primary
            to-secondary

            p-5
            sm:p-6
            lg:p-8

            text-white

            relative
          "
        >
          <button
            onClick={() =>
              setShowPasswordModal(false)
            }
            className="
              btn
              btn-circle
              btn-sm

              absolute
              right-3
              top-3

              sm:right-5
              sm:top-5
            "
          >
            ✕
          </button>

          <h2
            className="
              text-xl
              sm:text-2xl
              lg:text-3xl

              font-bold
            "
          >
            Change Password
          </h2>

          <p
            className="
              opacity-80
              mt-2

              text-sm
              sm:text-base
            "
          >
            Update your account password
          </p>
        </div>

        {/* Body */}

        <div
          className="
            p-4
            sm:p-6
            lg:p-8

            overflow-y-auto
          "
        >
          <div className="space-y-5">
            {/* Current Password */}

            <div>
              <label
                className="
                  font-semibold
                  text-sm
                  sm:text-base
                "
              >
                Current Password
              </label>

              <input
                type="password"
                placeholder="Current Password"
                value={
                  passwordData.currentPassword
                }
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    currentPassword:
                      e.target.value,
                  })
                }
                className="
                  input
                  input-bordered
                  w-full
                  mt-2
                  rounded-2xl
                "
              />
            </div>

            {/* New Password */}

            <div>
              <label
                className="
                  font-semibold
                  text-sm
                  sm:text-base
                "
              >
                New Password
              </label>

              <input
                type="password"
                placeholder="New Password"
                value={
                  passwordData.newPassword
                }
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    newPassword:
                      e.target.value,
                  })
                }
                className="
                  input
                  input-bordered
                  w-full
                  mt-2
                  rounded-2xl
                "
              />
            </div>

            {/* Confirm Password */}

            <div>
              <label
                className="
                  font-semibold
                  text-sm
                  sm:text-base
                "
              >
                Confirm Password
              </label>

              <input
                type="password"
                placeholder="Confirm Password"
                value={
                  passwordData.confirmPassword
                }
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    confirmPassword:
                      e.target.value,
                  })
                }
                className="
                  input
                  input-bordered
                  w-full
                  mt-2
                  rounded-2xl
                "
              />
            </div>

            {/* Forgot Password */}

            <div>
              <button
                onClick={() =>
                  forgotPassword(
                    user.email
                  ).then(() => {
                    Swal.fire({
                      icon: "success",
                      title:
                        "Reset Email Sent",
                      text:
                        "Check your inbox",
                    });
                  })
                }
                className="
                  text-primary
                  hover:underline

                  text-sm
                  sm:text-base
                "
              >
                Forgot Password?
              </button>
            </div>
          </div>

          {/* Footer */}

          <div
            className="
              flex

              flex-col-reverse
              sm:flex-row

              sm:justify-end

              gap-3
              sm:gap-4

              mt-8

              border-t
              border-base-300

              pt-5
              sm:pt-6
            "
          >
            <button
              onClick={() =>
                setShowPasswordModal(false)
              }
              className="
                btn
                btn-outline

                rounded-2xl

                w-full
                sm:w-auto
              "
            >
              Cancel
            </button>

            <button
              onClick={
                handleChangePassword
              }
              className="
                btn
                btn-primary

                rounded-2xl

                w-full
                sm:w-auto
              "
            >
              Update Password
            </button>
          </div>
        </div>
      </div>
    </dialog>


  )
}
</>

  );

};

export default Settings;