const ProfileHeader = ({
  profile
}) => {

  return (

    <div
      className="
      bg-base-100
      rounded-3xl
      shadow-xl
      p-8
    "
    >

      <div
        className="
        flex
        flex-col
        md:flex-row
        items-center
        gap-8
      "
      >

        <img
          src={profile.photo}
          alt=""
          className="
            w-32
            h-32
            rounded-full
            object-cover
            ring
            ring-primary
          "
        />

        <div>

          <h2
            className="
              text-4xl
              font-bold
            "
          >
            {profile.name}
          </h2>

          <p>
            {profile.email}
          </p>

          <div
            className="
            flex
            gap-3
            mt-3
          "
          >

            <div className="badge badge-primary">
              {profile.role}
            </div>

            

          </div>

        </div>

      </div>

    </div>

  );
};

export default ProfileHeader;