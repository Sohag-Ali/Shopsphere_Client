import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useUser from "../../../hooks/useUser";
import { toast } from "react-toastify";
import { Link } from "react-router";

const MyLessons = () => {
  const { user } = useAuth();

  const axiosSecure = useAxiosSecure();

  const [userData] = useUser();

  const {
    data: lessons = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["my-lessons", user?.email],

    enabled: !!user?.email,

    queryFn: async () => {
      const res = await axiosSecure.get(`/lessons?email=${user.email}`);

      return res.data;
    },
  });

  // delete lesson
  const handleDelete = async (id) => {
    const proceed = window.confirm(
      "Are you sure you want to delete this lesson?",
    );

    if (proceed) {
      try {
        const res = await axiosSecure.delete(`/lessons/${id}`);

        if (res.data.deletedCount > 0) {
          toast.success("Lesson deleted successfully!");

          refetch();
        }
      } catch (error) {
        console.log(error);

        toast.error("Failed to delete lesson");
      }
    }
  };

  // toggle privacy
  const handlePrivacyChange = async (id, currentPrivacy) => {
    const newPrivacy = currentPrivacy === "Public" ? "Private" : "Public";

    try {
      const res = await axiosSecure.patch(`/lessons/privacy/${id}`, {
        privacy: newPrivacy,
      });

      if (res.data.modifiedCount > 0) {
        toast.success(`Lesson changed to ${newPrivacy}`);

        refetch();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // toggle access level
  const handleAccessLevelChange = async (id, currentAccess) => {
    if (!userData?.isPremium) {
      return toast.error("Upgrade to Premium first!");
    }

    const newAccess = currentAccess === "Free" ? "Premium" : "Free";

    try {
      const res = await axiosSecure.patch(`/lessons/access/${id}`, {
        accessLevel: newAccess,
      });

      if (res.data.modifiedCount > 0) {
        toast.success(`Access changed to ${newAccess}`);

        refetch();
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update access level");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* heading */}
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-black text-white">
          My Lessons 📚
        </h1>

        <p className="text-gray-400 text-lg mt-3">
          Manage all your created lessons.
        </p>
      </div>

      {/* table */}
      <div className="overflow-x-auto bg-[#111827] border border-white/10 shadow-2xl rounded-[28px] backdrop-blur-xl">
        <table className="table text-[#CBD5E1] text-center">
          <thead className="bg-white/5  ">
            <tr className="border-b border-white/10">
              <th>#</th>

              <th>Title</th>

              <th>Category</th>

              <th>Privacy</th>

              <th>Access</th>

              <th>Created</th>

              <th>Reactions</th>

              <th>Favorites</th>

              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {lessons.map((lesson, index) => (
              <tr
                key={lesson._id}
                className=" border-b border-white/5 hover:bg-[#1A2335] transition-all duration-300 hover:scale-[1.002]"
              >
                <td className="">{index + 1}</td>

                <td className=" ">{lesson.title}</td>

                <td className="">{lesson.category}</td>

                <td>
                  <button
                    onClick={() =>
                      handlePrivacyChange(lesson._id, lesson.privacy)
                    }
                    className={` px-4 py-2 rounded-xl text-xs font-semibold border transition-all duration-300
                                  ${
                                    lesson.privacy === "Public"
                                      ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/20 hover:bg-emerald-500 hover:text-white"
                                      : "bg-rose-500/10 text-rose-300 border-rose-500/20 hover:bg-rose-500 hover:text-white"
                                  }                              
                        `}
                  >
                    {lesson.privacy}
                  </button>
                </td>

                <td className="">
                  <button
                    onClick={() =>
                      handleAccessLevelChange(lesson._id, lesson.accessLevel)
                    }
                    className={` px-4 py-2 rounded-xl text-xs font-semibold border transition-all duration-30 ${
                      lesson.accessLevel === "Premium"
                        ? "bg-amber-500/10 text-amber-300 border-amber-500/20 hover:bg-amber-500 hover:text-black"
                        : "bg-cyan-500/10 text-cyan-300 border-cyan-500/20 hover:bg-cyan-500 hover:text-white"
                    }                                       
                                          `}
                  >
                    {lesson.accessLevel}
                  </button>
                </td>

                <td className="text-indigo-200">
                  {new Date(lesson.createdAt).toLocaleDateString()}
                </td>

                <td>{lesson.reactionsCount || 0}</td>

                <td>{lesson.favoritesCount || 0}</td>

                <td className="space-x-2">
                  {/* details */}
                  <Link
                    to={`/lesson-details/${lesson._id}`}
                    className="px-4 py-2 rounded-xl bg-cyan-500/20 text-cyan-300 text-xs font-semibold hover:bg-cyan-500 hover:text-white transition-all duration-300"
                  >
                    Details
                  </Link>

                  {/* update */}
                  <Link
                    to={`/dashboard/update-lesson/${lesson._id}`}
                    className="px-4 py-2 rounded-xl bg-warning/20 text-warning text-xs font-semibold hover:bg-warning hover:text-black transition-all duration-300"
                  >
                    Update
                  </Link>

                  {/* delete */}
                  <button
                    onClick={() => handleDelete(lesson._id)}
                    className=" px-4 py-2 rounded-xl bg-red-500/20 text-red-400 text-xs font-semibold hover:bg-red-500 hover:text-white transition-all duration-300"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyLessons;
