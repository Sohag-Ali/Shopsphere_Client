import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Link } from "react-router";
import { Trash2 } from "lucide-react";


const Favorites = () => {
   const { user } = useAuth();

   const axiosSecure = useAxiosSecure();

   // filters
   const [category, setCategory] =
   useState("");

   const [tone, setTone] =
   useState("");

   // fetch favorites
   const {
      data: favorites = [],
      refetch
   } = useQuery({

      queryKey: [
         'favorites',
         user?.email,
         category,
         tone
      ],

      enabled: !!user?.email,

      queryFn: async() => {

         const res =
         await axiosSecure.get(

            `/favorites/${user.email}?category=${category}&emotionalTone=${tone}`

         );

         return res.data;
      }
   });

   // remove favorite
   const handleRemove = async(id) => {

      const confirmDelete =
      window.confirm(

         "Remove from favorites?"
      );

      if(!confirmDelete) return;

      try {

         await axiosSecure.delete(

            `/favorites/${id}/${user.email}`
         );

         toast.success(
            "Removed from favorites"
         );

         refetch();

      } catch(error){

         console.log(error);
         toast.error("Failed to remove from favorites");
      }
   };

   return (

      <div className="p-6 md:p-10">

         {/* heading */}
         <div className="mb-10">

            <h1 className="text-4xl font-black">

               My Favorite Lessons

            </h1>

            <p className="text-gray-500 mt-3">

               Your saved life lessons

            </p>

         </div>

         {/* filters */}
         <div className="flex flex-wrap gap-4 mb-8">

            {/* category */}
            <select
               value={category}
               onChange={(e) =>
                  setCategory(e.target.value)
               }
               className="select select-bordered"
            >

               <option value="">
                  All Categories
               </option>

               <option>
                  Personal Growth
               </option>

               <option>
                  Career
               </option>

               <option>
                  Relationships
               </option>

               <option>
                  Mindset
               </option>

            </select>

            {/* tone */}
            <select
               value={tone}
               onChange={(e) =>
                  setTone(e.target.value)
               }
               className="select select-bordered"
            >

               <option value="">
                  All Emotional Tones
               </option>

               <option>
                  Motivational
               </option>

               <option>
                  Sad
               </option>

               <option>
                  Gratitude
               </option>

               <option>
                  Realization
               </option>

            </select>

         </div>

         {/* no favorites */}
         {
            favorites.length === 0
            ?
            (
               <div className="bg-base-100 rounded-[30px] shadow-xl p-14 text-center">

                  <h2 className="text-3xl font-black">

                     No Favorite Lessons Found

                  </h2>

               </div>
            )
            :
            (
               <div className="overflow-x-auto bg-base-100 rounded-[30px] shadow-xl">

                  <table className="table">

                     <thead>

                        <tr>

                           <th>Lesson</th>

                           <th>Category</th>

                           <th>Tone</th>

                           <th>Access</th>

                           <th>Actions</th>

                        </tr>

                     </thead>

                     <tbody>

                        {
                           favorites.map(lesson => (

                              <tr key={lesson._id}>

                                 {/* lesson */}
                                 <td>

                                    <div className="flex items-center gap-4">

                                       <img
                                          src={lesson.image}
                                          className="w-16 h-16 rounded-xl object-cover"
                                       />

                                       <div>

                                          <h2 className="font-bold">

                                             {lesson.title}

                                          </h2>

                                          <p className="text-sm text-gray-500">

                                             {
                                                lesson.description.slice(0, 50)
                                             }
                                             ...

                                          </p>

                                       </div>

                                    </div>

                                 </td>

                                 {/* category */}
                                 <td>

                                    <div className="badge badge-primary">

                                       {lesson.category}

                                    </div>

                                 </td>

                                 {/* tone */}
                                 <td>

                                    <div className="badge badge-secondary">

                                       {lesson.emotionalTone}

                                    </div>

                                 </td>

                                 {/* access */}
                                 <td>

                                    <div
                                       className={`badge ${
                                          lesson.accessLevel === "Premium"
                                          ?
                                          "badge-warning"
                                          :
                                          "badge-success"
                                       }`}
                                    >

                                       {lesson.accessLevel}

                                    </div>

                                 </td>

                                 {/* actions */}
                                 <td>

                                    <div className="flex gap-3">

                                       {/* details */}
                                       <Link
                                          to={`/lesson-details/${lesson._id}`}
                                          className="btn btn-primary btn-sm rounded-full"
                                       >
                                          Details
                                       </Link>

                                       {/* remove */}
                                       <button
                                          onClick={() =>
                                             handleRemove(
                                                lesson._id
                                             )
                                          }
                                          className="btn btn-error btn-sm rounded-full"
                                       >

                                          <Trash2 size={18} />

                                       </button>

                                    </div>

                                 </td>

                              </tr>
                           ))
                        }

                     </tbody>

                  </table>

               </div>
            )
         }

      </div>
   );
};

export default Favorites;