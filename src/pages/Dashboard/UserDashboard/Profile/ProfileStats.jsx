const ProfileStats = ({
  profile,
  stats,
}) => {
  const fields = [
    profile?.name,
    profile?.phone,
    profile?.address,
    profile?.city,
    profile?.postalCode,
    profile?.photoURL,
  ];

  const completed =
    fields.filter(Boolean).length;

  const completion = Math.round(
    (completed / fields.length) * 100
  );

  const statCards = [
    {
      title: "Orders",
      value: stats?.totalOrders || 0,
    },
    {
      title: "Wishlist",
      value: stats?.totalWishlist || 0,
    },
    {
      title: "Reviews",
      value: stats?.totalReviews || 0,
    },
    {
      title: "Profile",
      value: `${completion}%`,
    },
  ];

  return (
    <>
      {/* Stats Grid */}

      <div
        className="
          grid
          grid-cols-2
          lg:grid-cols-4
          gap-3
          sm:gap-4
          lg:gap-5
        "
      >
        {statCards.map((item) => (
          <div
            key={item.title}
            className="
              bg-base-100
              rounded-2xl
              shadow-lg

              p-4
              sm:p-5
              lg:p-6

              hover:shadow-xl
              transition-all
              duration-300
            "
          >
            <div
              className="
                text-xs
                sm:text-sm
                text-base-content/60
              "
            >
              {item.title}
            </div>

            <div
              className="
                text-2xl
                sm:text-3xl
                lg:text-4xl

                font-bold

                mt-2

                break-words
              "
            >
              {item.value}
            </div>
          </div>
        ))}
      </div>

      {/* Profile Completion */}

      <div
        className="
          bg-base-100
          rounded-2xl
          shadow-lg

          p-4
          sm:p-6

          mt-5
          sm:mt-6
        "
      >
        <div
          className="
            flex
            flex-col
            sm:flex-row

            sm:items-center
            justify-between

            gap-2

            mb-4
          "
        >
          <h3
            className="
              font-bold
              text-base
              sm:text-lg
            "
          >
            Profile Completion
          </h3>

          <span
            className="
              badge
              badge-primary
              badge-sm
              sm:badge-md
            "
          >
            {completion}% Complete
          </span>
        </div>

        <progress
          value={completion}
          max="100"
          className="
            progress
            progress-primary
            w-full
            h-3
          "
        />

        <div
          className="
            flex
            justify-between

            text-xs
            sm:text-sm

            text-base-content/60

            mt-2
          "
        >
          <span>0%</span>
          <span>100%</span>
        </div>
      </div>
    </>
  );
};

export default ProfileStats;