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
      className="
        max-w-4xl
        mx-auto
      "
    >

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
            text-3xl
            font-bold
            mb-8
          "
        >
          Settings
        </h2>

        {/* Account Info */}

        <div
          className="
            border-b
            pb-6
            mb-6
          "
        >

          <h3
            className="
              text-xl
              font-semibold
              mb-4
            "
          >
            Account
          </h3>

          <p>
            <span className="font-bold">
              Email:
            </span>

            {" "}
            {user?.email}
          </p>

        </div>

        {/* Theme Toggle */}

        <div
          className="
            flex
            justify-between
            items-center
            border-b
            pb-6
            mb-6
          "
        >

          <div>

            <h3
              className="
                font-semibold
                text-lg
              "
            >
              Dark Mode
            </h3>

            <p
              className="
                text-sm
                text-gray-500
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
              toggle-lg
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
            justify-between
            items-center
            border-b
            pb-6
            mb-6
          "
        >

          <div>

            <h3
              className="
                font-semibold
                text-lg
              "
            >
              Notifications
            </h3>

            <p
              className="
                text-sm
                text-gray-500
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
              toggle-lg
            "
            defaultChecked
          />

        </div>

        {/* Password */}

        <div
          className="
            flex
            justify-between
            items-center
            border-b
            pb-6
            mb-6
          "
        >

          <div>

            <h3
              className="
                font-semibold
                text-lg
              "
            >
              Password
            </h3>

            <p
              className="
                text-sm
                text-gray-500
              "
            >
              Update your account password
            </p>

          </div>

          <button
  onClick={() => {

    if(isGoogleUser){

      Swal.fire({

        icon: "info",

        title:
          "Google Account",

        text:
          "Password is managed by Google.",

      });

      return;
    }

    setShowPasswordModal(true);

  }}
  className="
    btn
    btn-outline
    btn-primary
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
              text-lg
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
          max-w-2xl
          p-0
          rounded-[32px]
          overflow-hidden
        "
      >

        {/* Header */}

        <div
          className="
            bg-gradient-to-r
            from-primary
            to-secondary
            p-8
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
              right-5
              top-5
            "
          >
            ✕
          </button>

          <h2
            className="
              text-3xl
              font-bold
            "
          >
            Change Password
          </h2>

          <p className="opacity-80 mt-2">
            Update your account password
          </p>

        </div>

        {/* Body */}

        <div className="p-8">

          <div className="space-y-5">

            <div>

              <label className="font-semibold">
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

            <div>

              <label className="font-semibold">
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

            <div>

              <label className="font-semibold">
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

            <div>

              <button
  onClick={() =>
    forgotPassword(
      user.email
    )
      .then(() => {

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
              justify-end
              gap-4
              mt-8
              border-t
              pt-6
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