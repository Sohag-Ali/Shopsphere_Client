const ProfileStats = ({
  profile,
  stats
}) => {

  const fields = [

    profile?.name,
    profile?.phone,
    profile?.address,
    profile?.city,
    profile?.postalCode,
    profile?.photoURL

  ];

  const completed =
    fields.filter(Boolean)
    .length;

  const completion =
    Math.round(
      completed /
      fields.length
      * 100
    );

  return (

    <>

      <div
        className="
        grid
        md:grid-cols-2
        lg:grid-cols-4
        gap-5
      "
      >

        <div className="stat bg-base-100 rounded-2xl shadow">
          <div className="stat-title">
            Orders
          </div>

          <div className="stat-value">
            {stats.totalOrders || 0}
          </div>
        </div>

        <div className="stat bg-base-100 rounded-2xl shadow">
          <div className="stat-title">
            Wishlist
          </div>

          <div className="stat-value">
            {stats.totalWishlist || 0}
          </div>
        </div>

        <div className="stat bg-base-100 rounded-2xl shadow">
          <div className="stat-title">
            Reviews
          </div>

          <div className="stat-value">
            {stats.totalReviews || 0}
          </div>
        </div>

        <div className="stat bg-base-100 rounded-2xl shadow">
          <div className="stat-title">
            Profile
          </div>

          <div className="stat-value">
            {completion}%
          </div>
        </div>

      </div>

      <div
        className="
        bg-base-100
        rounded-2xl
        p-6
        shadow
        mt-6
      "
      >

        <h3 className="font-bold mb-3">
          Profile Completion
        </h3>

        <progress
          value={completion}
          max="100"
          className="
          progress
          progress-primary
          w-full
        "
        />

      </div>

    </>

  );
};

export default ProfileStats;