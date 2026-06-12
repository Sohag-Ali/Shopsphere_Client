import { useEffect, useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import ProfileHeader from "./ProfileHeader";
import ProfileStats from "./ProfileStats";
import RecentOrders from "./RecentOrders";
import ProfileForm from "./ProfileForm";
import useTitle from "../../../../hooks/useTitle";

const Profile = () => {
    useTitle("Profile");
  const { user } = useAuth();

  const axiosSecure = useAxiosSecure();

  const [profile, setProfile] =
    useState({});

  const [stats, setStats] =
    useState({});

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    if (user?.email) {
      Promise.all([
        axiosSecure.get(
          `/users/profile/${user.email}`
        ),
        axiosSecure.get(
          `/profile-stats/${user.email}`
        ),
      ])
        .then(([profileRes, statsRes]) => {
          setProfile(
            profileRes.data
          );

          setStats(
            statsRes.data
          );
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [user, axiosSecure]);

  if (loading) {
    return (
      <div
        className="
          flex
          justify-center
          items-center
          min-h-[50vh]
        "
      >
        <span
          className="
            loading
            loading-spinner
            loading-lg
          "
        ></span>
      </div>
    );
  }

  return (
    <div
      className="mx-auto

    px-4
    sm:px-6
    lg:px-8

    space-y-6
    sm:space-y-8
    lg:space-y-10"
    >
      {/* Profile Header */}

      <ProfileHeader
        profile={profile}
      />

      {/* Profile Stats */}

      <ProfileStats
        profile={profile}
        stats={stats}
      />

      {/* Profile Form */}

      <ProfileForm
        profile={profile}
        setProfile={setProfile}
      />

      {/* Recent Orders */}

      <RecentOrders
        orders={
          stats?.recentOrders || []
        }
      />
    </div>
  );
};

export default Profile;