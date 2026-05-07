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
      isLoading
   } = useQuery({

      queryKey: ['my-lessons', user?.email],

      enabled: !!user?.email,

      queryFn: async() => {

         const res = await axiosSecure.get(
            `/lessons?email=${user.email}`
         );

         return res.data;
      }
   });

   // delete lesson
   const handleDelete = async(id) => {

      const proceed = window.confirm(
         "Are you sure you want to delete this lesson?"
      );

      if(proceed){

         try {

            const res = await axiosSecure.delete(
               `/lessons/${id}`
            );

            if(res.data.deletedCount > 0){

               toast.success("Lesson deleted successfully!");

               refetch();
            }

         } catch(error){

            console.log(error);

            toast.error("Failed to delete lesson");
         }
      }
   };

   // toggle privacy
   const handlePrivacyChange = async(id, currentPrivacy) => {

      const newPrivacy =
      currentPrivacy === "Public"
      ?
      "Private"
      :
      "Public";

      try {

         const res = await axiosSecure.patch(
            `/lessons/privacy/${id}`,
            {
               privacy: newPrivacy
            }
         );

         if(res.data.modifiedCount > 0){

            toast.success(
               `Lesson changed to ${newPrivacy}`
            );

            refetch();
         }

      } catch(error){

         console.log(error);
      }
   };

   // toggle access level
   const handleAccessLevelChange = async(id, currentAccess) => {

      if(!userData?.isPremium){

         return toast.error(
            "Upgrade to Premium first!"
         );
      }

      const newAccess =
      currentAccess === "Free"
      ?
      "Premium"
      :
      "Free";

      try {

         const res = await axiosSecure.patch(
            `/lessons/access/${id}`,
            {
               accessLevel: newAccess
            }
         );

         if(res.data.modifiedCount > 0){

            toast.success(
               `Access changed to ${newAccess}`
            );

            refetch();
         }

      } catch(error){

         console.log(error);
         toast.error("Failed to update access level");
      }
   };

   if(isLoading){

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

            <h1 className="text-4xl font-bold">
               My Lessons 📚
            </h1>

            <p className="text-gray-500 mt-2">
               Manage all your created lessons.
            </p>

         </div>

         {/* table */}
         <div className="overflow-x-auto bg-base-100 shadow-xl rounded-2xl">

            <table className="table">

               <thead className="bg-base-200">

                  <tr>

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

                  {
                     lessons.map((lesson, index) => (

                        <tr key={lesson._id}>

                           <td>
                              {index + 1}
                           </td>

                           <td className="font-semibold">
                              {lesson.title}
                           </td>

                           <td>
                              {lesson.category}
                           </td>

                           <td>

                              <button
                               onClick={() =>
                               handlePrivacyChange(
                                  lesson._id,
                                  lesson.privacy
                               )}
                               className="btn btn-xs btn-outline"
                              >
                                 {lesson.privacy}
                              </button>

                           </td>

                           <td>

                              <button
                               onClick={() =>
                               handleAccessLevelChange(
                                  lesson._id,
                                  lesson.accessLevel
                               )}
                               className="btn btn-xs btn-outline"
                              >
                                 {lesson.accessLevel}
                              </button>

                           </td>

                           <td>
                              {
                                 new Date(
                                    lesson.createdAt
                                 ).toLocaleDateString()
                              }
                           </td>

                           <td>
                              {lesson.reactionsCount || 0}
                           </td>

                           <td>
                              {lesson.favoritesCount || 0}
                           </td>

                           <td className="space-x-2">

                              {/* details */}
                              <Link
                               to={`/lesson-details/${lesson._id}`}
                               className="btn btn-info btn-xs"
                              >
                                 Details
                              </Link>

                              {/* update */}
                              <Link
                               to={`/dashboard/update-lesson/${lesson._id}`}
                               className="btn btn-warning btn-xs"
                              >
                                 Update
                              </Link>

                              {/* delete */}
                              <button
                               onClick={() =>
                               handleDelete(lesson._id)
                               }
                               className="btn btn-error btn-xs"
                              >
                                 Delete
                              </button>

                           </td>

                        </tr>
                     ))
                  }

               </tbody>

            </table>

         </div>

      </div>
   );
};

export default MyLessons;