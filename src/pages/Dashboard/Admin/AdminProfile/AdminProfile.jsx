import { useEffect, useState } from "react";
import { Link } from "react-router";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import { FaEdit } from "react-icons/fa";
import { HiX } from "react-icons/hi";
import { HiLink, HiUser } from "react-icons/hi2";
import Swal from "sweetalert2";
import useTitle from "../../../../hooks/useTitle";

const AdminProfile = () => {
    useTitle("Admin Profile");
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [profile, setProfile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/admin/profile/${user.email}`)
        .then((res) => setProfile(res.data))
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    }
  }, [user, axiosSecure]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosSecure.patch(
        `/users/profile/${profile.user.email}`,
        formData
      );
      if (res.data.modifiedCount) {
        setProfile({
          ...profile,
          user: { ...profile.user, ...formData },
        });
        setIsModalOpen(false);
        Swal.fire({
          icon: "success",
          title: "Profile updated",
          text: "Your profile has been updated successfully.",
          confirmButtonColor: "#8B5CF6",
        });
      } else {
        Swal.fire({
          icon: "info",
          title: "No changes",
          text: "No changes were made to your profile.",
          confirmButtonColor: "#8B5CF6",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (field) => (e) =>
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  if (loading || !profile?.user) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  const { user: u } = profile;
  const avatarSrc = u.photo || u.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png";

  return (
    <>
      <div className="mx-auto

    px-4
    sm:px-6
    lg:px-8

    space-y-6
    sm:space-y-8
    lg:space-y-10">
        {/* Header */}
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
  <div
    className="
      flex
      flex-col
      lg:flex-row

      items-center
      lg:items-start

      text-center
      lg:text-left

      gap-5
      sm:gap-6
      lg:gap-8
    "
  >
    {/* Avatar */}

    <img
      src={avatarSrc}
      alt={u.name}
      className="
        w-24
        h-24

        sm:w-28
        sm:h-28

        lg:w-32
        lg:h-32

        rounded-full
        border-4
        border-primary

        object-cover

        flex-shrink-0
      "
    />

    {/* User Info */}

    <div className="flex-1 min-w-0">
      <h1
        className="
          text-2xl
          sm:text-3xl
          lg:text-4xl

          font-bold

          break-words
        "
      >
        {u.name}
      </h1>

      <p
        className="
          text-sm
          sm:text-base

          text-base-content/60

          mt-2

          break-all
        "
      >
        {u.email}
      </p>

      <div
        className="
          mt-4

          flex
          justify-center
          lg:justify-start
        "
      >
        <span
          className="
            badge
            badge-primary

            badge-md
            sm:badge-lg
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

    grid-cols-2
    lg:grid-cols-3
    xl:grid-cols-5

    gap-3
    sm:gap-4
    lg:gap-6
  "
>
  {[
    {
      label: "Products",
      value: profile.totalProducts,
      color: "text-primary",
    },
    {
      label: "Users",
      value: profile.totalUsers,
      color: "text-success",
    },
    {
      label: "Orders",
      value: profile.totalOrders,
      color: "text-warning",
    },
    {
      label: "Reviews",
      value: profile.totalReviews,
      color: "text-info",
    },
    {
      label: "Revenue",
      value: `৳${profile.totalRevenue?.toLocaleString()}`,
      color: "text-error",
    },
  ].map((stat) => (
    <div
      key={stat.label}
      className="
        bg-base-100
        rounded-3xl
        shadow-xl

        p-4
        sm:p-5
        lg:p-6

        hover:shadow-2xl
        transition-all
        duration-300
      "
    >
      <p
        className="
          text-xs
          sm:text-sm

          text-base-content/60

          truncate
        "
      >
        {stat.label}
      </p>

      <h2
        className={`
          ${stat.color}

          text-xl
          sm:text-2xl
          lg:text-3xl
          xl:text-4xl

          font-bold

          mt-2

          break-words
        `}
      >
        {stat.value}
      </h2>
    </div>
  ))}
</div>

        {/* Account Info */}
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
  {/* Header */}

  <div
    className="
      flex
      flex-col
      sm:flex-row

      sm:items-center
      justify-between

      gap-4

      mb-6
    "
  >
    <h2
      className="
        text-xl
        sm:text-2xl
        font-bold
      "
    >
      Account Information
    </h2>

    <button
      onClick={() => {
        setFormData(u);
        setIsModalOpen(true);
      }}
      className="
        btn
        btn-primary
        btn-sm

        w-full
        sm:w-auto
      "
    >
      <FaEdit />
      Edit
    </button>
  </div>

  {/* Information Grid */}

  <div
    className="
      grid
      grid-cols-1
      sm:grid-cols-2

      gap-4
      sm:gap-5
    "
  >
    {[
      {
        label: "Name",
        value: u.name,
      },
      {
        label: "Email",
        value: u.email,
      },
      {
        label: "Phone",
        value: u.phone || "N/A",
      },
      {
        label: "City",
        value: u.city || "N/A",
      },
      {
        label: "Address",
        value: u.address || "N/A",
      },
      {
        label: "Postal Code",
        value:
          u.postalCode || "N/A",
      },
      {
        label: "Role",
        value: u.role,
      },
    ].map((item) => (
      <div
        key={item.label}
        className="
          p-3
          sm:p-4

          rounded-2xl

          bg-base-200/40
        "
      >
        <p
          className="
            text-xs
            sm:text-sm

            text-base-content/60
          "
        >
          {item.label}
        </p>

        <h3
          className="
            font-semibold

            text-sm
            sm:text-base

            mt-1

            break-words
          "
        >
          {item.value}
        </h3>
      </div>
    ))}

    {/* Status */}

    <div
      className="
        p-3
        sm:p-4

        rounded-2xl

        bg-base-200/40
      "
    >
      <p
        className="
          text-xs
          sm:text-sm

          text-base-content/60
        "
      >
        Status
      </p>

      <div className="mt-2">
        <span
          className="
            badge
            badge-success

            badge-sm
            sm:badge-md
          "
        >
          {u.status}
        </span>
      </div>
    </div>
  </div>
</div>

        {/* Quick Actions */}
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
  {/* Header */}

  <h2
    className="
      text-xl
      sm:text-2xl
      font-bold

      mb-5
      sm:mb-6
    "
  >
    Quick Actions
  </h2>

  {/* Action Buttons */}

  <div
    className="
      grid

      grid-cols-1
      sm:grid-cols-2
      xl:grid-cols-4

      gap-3
      sm:gap-4
    "
  >
    <Link
      to="/dashboard/admin/add-product"
      className="
        btn
        btn-primary

        w-full

        min-h-[52px]

        rounded-2xl
      "
    >
      Add Product
    </Link>

    <Link
      to="/dashboard/admin/manage-products"
      className="
        btn
        btn-outline

        w-full

        min-h-[52px]

        rounded-2xl
      "
    >
      Manage Products
    </Link>

    <Link
      to="/dashboard/admin/manage-users"
      className="
        btn
        btn-outline

        w-full

        min-h-[52px]

        rounded-2xl
      "
    >
      Manage Users
    </Link>

    <Link
      to="/dashboard/admin/manage-orders"
      className="
        btn
        btn-outline

        w-full

        min-h-[52px]

        rounded-2xl
      "
    >
      Manage Orders
    </Link>
  </div>
</div>
      </div>

      {/* Modal */}
      {isModalOpen && (
     <div
  className="
    fixed
    inset-0
    z-50

    flex
    items-center
    justify-center

    p-2
    sm:p-4

    bg-black/50
    backdrop-blur-sm
  "
>
  <div
    className="
      bg-base-100

      w-full
      max-w-xl

      rounded-2xl
      overflow-hidden

      shadow-2xl

      max-h-[95vh]
      flex
      flex-col
    "
  >
    {/* Modal Header */}

    <div
      className="
        relative

        flex
        flex-wrap
        items-center

        gap-3

        px-4
        sm:px-7

        py-4
        sm:py-6

        bg-accent
      "
    >
      <div
        className="
          flex-shrink-0

          w-12
          h-12

          sm:w-14
          sm:h-14

          rounded-full

          flex
          items-center
          justify-center

          overflow-hidden

          bg-primary
        "
      >
        {formData.photoURL ||
        formData.photo ? (
          <img
            src={
              formData.photoURL ||
              formData.photo
            }
            alt=""
            className="
              w-full
              h-full
              object-cover
            "
            onError={(e) => {
              e.target.style.display =
                "none";
            }}
          />
        ) : (
          <HiUser size={24} />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <h2
          className="
            text-base
            sm:text-lg

            font-semibold

            leading-tight
          "
        >
          Edit Profile
        </h2>

        <p
          className="
            text-xs
            sm:text-sm

            mt-1

            truncate
          "
        >
          {u.email}
        </p>
      </div>

      <span
        className="
          badge
          badge-primary

          badge-sm
          sm:badge-md
        "
      >
        Administrator
      </span>

      <button
        onClick={() =>
          setIsModalOpen(false)
        }
        className="
          btn
          btn-circle
          btn-xs
          sm:btn-sm
        "
      >
        <HiX size={14} />
      </button>
    </div>

    {/* Form */}

    <form
      onSubmit={handleUpdateProfile}
      className="
        flex-1
        overflow-y-auto

        px-4
        sm:px-7

        pt-5
        sm:pt-6
      "
    >
      {/* Profile Image */}

      <p
        className="
          text-xs
          font-semibold
          uppercase
          tracking-widest

          text-base-content/40

          mb-3
        "
      >
        Profile Image
      </p>

      <div
        className="
          flex
          items-center

          gap-3

          rounded-xl

          px-3
          sm:px-4

          py-3

          mb-6

          bg-base-200
        "
      >
        <div
          className="
            w-9
            h-9

            rounded-full

            flex-shrink-0

            overflow-hidden

            flex
            items-center
            justify-center

            bg-primary
          "
        >
          {formData.photoURL ? (
            <img
              src={
                formData.photoURL
              }
              alt=""
              className="
                w-full
                h-full
                object-cover
              "
            />
          ) : (
            <HiUser size={16} />
          )}
        </div>

        <input
          type="text"
          placeholder="Paste image URL..."
          value={
            formData.photoURL || ""
          }
          onChange={handleChange(
            "photoURL"
          )}
          className="
            flex-1

            bg-transparent

            border-none
            outline-none

            text-sm
          "
        />

        <HiLink
          size={16}
          className="
            text-base-content/30
            flex-shrink-0
          "
        />
      </div>

      {/* Personal Info */}

      <p
        className="
          text-xs
          font-semibold
          uppercase
          tracking-widest

          text-base-content/40

          mb-3
        "
      >
        Personal Information
      </p>

      <div
        className="
          grid

          grid-cols-1
          sm:grid-cols-2

          gap-4

          mb-4
        "
      >
        {[
          {
            label: "Full name",
            field: "name",
          },
          {
            label: "Phone number",
            field: "phone",
          },
          {
            label: "City",
            field: "city",
          },
          {
            label: "Postal code",
            field: "postalCode",
          },
        ].map(
          ({
            label,
            field,
          }) => (
            <div key={field}>
              <label
                className="
                  block

                  text-xs

                  font-medium

                  text-base-content/50

                  mb-1.5
                "
              >
                {label}
              </label>

              <input
                type="text"
                value={
                  formData[field] ||
                  ""
                }
                onChange={handleChange(
                  field
                )}
                className="
                  input
                  input-bordered

                  w-full

                  rounded-xl

                  text-sm
                "
              />
            </div>
          )
        )}
      </div>

      {/* Address */}

      <div className="mb-6">
        <label
          className="
            block

            text-xs

            font-medium

            text-base-content/50

            mb-1.5
          "
        >
          Address
        </label>

        <textarea
          value={
            formData.address || ""
          }
          onChange={handleChange(
            "address"
          )}
          rows={3}
          className="
            textarea
            textarea-bordered

            w-full

            rounded-xl

            text-sm

            resize-none
          "
        />
      </div>
    </form>

    {/* Footer */}

    <div
      className="
        flex

        flex-col-reverse
        sm:flex-row

        sm:justify-end

        gap-3

        px-4
        sm:px-7

        py-4

        border-t
        border-base-300
      "
    >
      <button
        type="button"
        onClick={() =>
          setIsModalOpen(false)
        }
        className="
          btn
          btn-ghost

          w-full
          sm:w-auto
        "
      >
        Cancel
      </button>

      <button
        type="submit"
        onClick={
          handleUpdateProfile
        }
        className="
          btn
          btn-primary

          w-full
          sm:w-auto
        "
      >
        Save Changes
      </button>
    </div>
  </div>
</div>
      )}
    </>
  );
};

export default AdminProfile;