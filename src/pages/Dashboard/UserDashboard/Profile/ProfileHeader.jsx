const ProfileHeader = ({ profile }) => {
  return (
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
          md:flex-row

          items-center
          md:items-start

          text-center
          md:text-left

          gap-5
          sm:gap-6
          lg:gap-8
        "
      >
        {/* Profile Image */}

        <div className="flex-shrink-0">
          <img
            src={
              profile?.photo ||
              profile?.photoURL ||
              "https://i.ibb.co/4pDNDk1/avatar.png"
            }
            alt={profile?.name}
            className="
              w-24
              h-24

              sm:w-28
              sm:h-28

              lg:w-32
              lg:h-32

              rounded-full
              object-cover

              ring
              ring-primary
              ring-offset-2
            "
          />
        </div>

        {/* Profile Info */}

        <div className="flex-1 min-w-0">
          <h2
            className="
              text-2xl
              sm:text-3xl
              lg:text-4xl

              font-bold

              break-words
            "
          >
            {profile?.name || "User"}
          </h2>

          <p
            className="
              text-sm
              sm:text-base

              text-base-content/70

              mt-2

              break-all
            "
          >
            {profile?.email ||
              "No email found"}
          </p>

          <div
            className="
              flex
              flex-wrap

              justify-center
              md:justify-start

              gap-2
              sm:gap-3

              mt-4
            "
          >
            <div
              className="
                badge
                badge-primary

                badge-sm
                sm:badge-md
              "
            >
              {profile?.role || "User"}
            </div>

            {profile?.city && (
              <div
                className="
                  badge
                  badge-outline

                  badge-sm
                  sm:badge-md
                "
              >
                📍 {profile.city}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;