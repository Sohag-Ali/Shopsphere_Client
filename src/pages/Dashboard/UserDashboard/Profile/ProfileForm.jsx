import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const ProfileForm = ({
  profile,
  setProfile,
}) => {

  const { user } = useAuth();

  const axiosSecure =
    useAxiosSecure();

  const handleUpdate = async (e) => {

    e.preventDefault();

    const form =
      e.target;

    const updatedData = {

      name:
        form.name.value,

      phone:
        form.phone.value,

      address:
        form.address.value,

      city:
        form.city.value,

      postalCode:
        form.postalCode.value,

      photoURL:
        form.photoURL.value,

    };

    try {

      const res =
        await axiosSecure.patch(
          `/users/profile/${user.email}`,
          updatedData
        );

      if (
        res.data.modifiedCount > 0
      ) {

        setProfile({
          ...profile,
          ...updatedData,
        });

        alert(
          "Profile Updated Successfully"
        );

      }

    } catch (error) {

      console.log(error);

    }

  };

  return (

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
          text-2xl
          font-bold
          mb-6
        "
      >
        Edit Profile
      </h2>

      <form
        onSubmit={handleUpdate}
      >

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-5
          "
        >

          <div>

            <label
              className="
                label
              "
            >
              Full Name
            </label>

            <input
              type="text"
              name="name"
              defaultValue={
                profile?.name
              }
              className="
                input
                input-bordered
                w-full
              "
            />

          </div>

          <div>

            <label
              className="
                label
              "
            >
              Phone Number
            </label>

            <input
              type="text"
              name="phone"
              defaultValue={
                profile?.phone
              }
              placeholder="+8801XXXXXXXXX"
              className="
                input
                input-bordered
                w-full
              "
            />

          </div>

          <div>

            <label
              className="
                label
              "
            >
              City
            </label>

            <input
              type="text"
              name="city"
              defaultValue={
                profile?.city
              }
              className="
                input
                input-bordered
                w-full
              "
            />

          </div>

          <div>

            <label
              className="
                label
              "
            >
              Postal Code
            </label>

            <input
              type="text"
              name="postalCode"
              defaultValue={
                profile?.postalCode
              }
              className="
                input
                input-bordered
                w-full
              "
            />

          </div>

          <div
            className="
              md:col-span-2
            "
          >

            <label
              className="
                label
              "
            >
              Profile Image URL
            </label>

            <input
              type="text"
              name="photoURL"
              defaultValue={
                profile?.photoURL
              }
              className="
                input
                input-bordered
                w-full
              "
            />

          </div>

          <div
            className="
              md:col-span-2
            "
          >

            <label
              className="
                label
              "
            >
              Address
            </label>

            <textarea
              name="address"
              defaultValue={
                profile?.address
              }
              className="
                textarea
                textarea-bordered
                w-full
                h-28
              "
            />

          </div>

        </div>

        <div
          className="
            mt-8
          "
        >

          <button
            type="submit"
            className="
              btn
              btn-primary
              w-full
              md:w-auto
            "
          >
            Update Profile
          </button>

        </div>

      </form>

    </div>

  );

};

export default ProfileForm;