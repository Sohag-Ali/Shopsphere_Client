import { useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { FaEdit } from "react-icons/fa";
import { HiX } from "react-icons/hi";
import { HiUser, HiLink } from "react-icons/hi2";
import Swal from "sweetalert2";

const ProfileForm = ({ profile, setProfile }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({});

  const handleChange = (field) => (e) =>
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosSecure.patch(
        `/users/profile/${user.email}`,
        formData
      );
      if (res.data.modifiedCount > 0) {
        setProfile({ ...profile, ...formData });
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

  const infoItems = [
    { label: "Name", value: profile?.name },
    { label: "Email", value: profile?.email || user?.email },
    { label: "Phone", value: profile?.phone || "N/A" },
    { label: "City", value: profile?.city || "N/A" },
    { label: "Address", value: profile?.address || "N/A" },
    { label: "Postal Code", value: profile?.postalCode || "N/A" },
  ];

  return (
    <>
      {/* Personal Information Card */}

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
      Personal Information
    </h2>

    <button
      onClick={() => {
        setFormData({
          name: profile?.name || "",
          phone: profile?.phone || "",
          city: profile?.city || "",
          postalCode:
            profile?.postalCode || "",
          address:
            profile?.address || "",
          photoURL:
            profile?.photoURL || "",
        });

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

  {/* Info Grid */}

  <div
    className="
      grid
      grid-cols-1
      sm:grid-cols-2
      gap-4
      sm:gap-5
    "
  >
    {infoItems.map((item) => (
      <div
        key={item.label}
        className="
          p-3
          rounded-xl
          bg-base-200/40
        "
      >
        <p
          className="
            text-base-content/60
            text-xs
            sm:text-sm
          "
        >
          {item.label}
        </p>

        <h3
          className="
            font-semibold
            mt-1
            text-sm
            sm:text-base
            break-words
          "
        >
          {item.value}
        </h3>
      </div>
    ))}
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

            text-base-content
            text-xl
            font-semibold

            overflow-hidden
          "
        >
          {formData.photoURL || formData.photo ? (
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

        <div className="min-w-0 flex-1">
          <h2
            className="
              text-base
              sm:text-lg
              font-semibold
              text-base-content
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
            {infoItems[1].value}
          </p>
        </div>

        <span
          className="
            text-xs
            px-3
            py-1
            rounded-full
            bg-base-100/30
            whitespace-nowrap
          "
        >
          Administrator
        </span>

        <button
          onClick={() =>
            setIsModalOpen(false)
          }
          className="
            w-8
            h-8
            rounded-full

            flex
            items-center
            justify-center

            bg-base-100/20
          "
        >
          <HiX size={16} />
        </button>
      </div>

      {/* Form */}

      <form
        onSubmit={handleUpdateProfile}
        className="
          px-4
          sm:px-7

          pt-5
          sm:pt-6

          overflow-y-auto
          flex-1
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
                src={formData.photoURL}
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
              min-w-0
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

        {/* Personal Information */}

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
                    h-10
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
            btn-sm
            rounded-xl

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
            btn-sm
            rounded-xl

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

export default ProfileForm;