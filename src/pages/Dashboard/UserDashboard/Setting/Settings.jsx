import { useEffect, useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import Swal from "sweetalert2";

const Settings = () => {

  const { user, logoutUser  } = useAuth();

  const [theme, setTheme] =
    useState(
      localStorage.getItem("theme") ||
      "shopsphere"
    );

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

  return (

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

  );

};

export default Settings;