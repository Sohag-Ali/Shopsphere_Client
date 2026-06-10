import { useEffect, useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import ProfileHeader from "./ProfileHeader";
import ProfileStats from "./ProfileStats";
import RecentOrders from "./RecentOrders";
import ProfileForm from "./ProfileForm";


const Profile = () => {

  const { user } = useAuth();

  const axiosSecure =
    useAxiosSecure();

  const [profile,
    setProfile] =
    useState({});

  const [stats,
    setStats] =
    useState({});

  useEffect(() => {

    if(user?.email){

      axiosSecure
        .get(
          `/users/profile/${user.email}`
        )
        .then((res)=>{
          setProfile(
            res.data
          );
        });

      axiosSecure
        .get(
          `/profile-stats/${user.email}`
        )
        .then((res)=>{
          setStats(
            res.data
          );
        });

    }

  },[
    user,
    axiosSecure
  ]);

  return (

    <div
      className="
      max-w-7xl
      mx-auto
      space-y-8
    "
    >

      <ProfileHeader
        profile={profile}
      />

      <ProfileStats
        profile={profile}
        stats={stats}
      />

      <ProfileForm
        profile={profile}
        setProfile={setProfile}
      />

      <RecentOrders
        orders={
          stats.recentOrders
        }
      />

    </div>

  );
};

export default Profile;