import { useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useUser from "../../../hooks/useUser";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";


const UpdateLesson = () => {
   const { id } = useParams();

   const axiosSecure = useAxiosSecure();

   const [userData] = useUser();

   const {
      register,
      handleSubmit,
      reset
   } = useForm();

   // fetch single lesson
   const { data: lesson = {} } = useQuery({

      queryKey: ['lesson', id],

      queryFn: async() => {

         const res = await axiosSecure.get(
            `/lessons/${id}`
         );

         reset(res.data);

         return res.data;
      }
   });

   // update lesson
   const onSubmit = async(data) => {

      try {

         const updatedLesson = {

            title: data.title,

            description: data.description,

            category: data.category,

            emotionalTone: data.emotionalTone,

            image: data.image,

            privacy: data.privacy,

            accessLevel: data.accessLevel,
         };

         const res = await axiosSecure.patch(
            `/lessons/${id}`,
            updatedLesson
         );

         if(res.data.modifiedCount > 0){

            alert(
               "Lesson updated successfully!"
            );
         }

      } catch(error){

         console.log(error);

         toast.error("Failed to update lesson");
      }
   };

   return (

      <div className="max-w-4xl mx-auto p-6">

         <div className="bg-base-100 shadow-xl rounded-2xl p-8">

            <h1 className="text-4xl font-bold mb-6">
               Update Lesson ✏️
            </h1>

            <form
             onSubmit={handleSubmit(onSubmit)}
             className="space-y-6"
            >

               {/* title */}
               <input
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Lesson Title"
                  {...register("title")}
               />

               {/* description */}
               <textarea
                  className="textarea textarea-bordered w-full h-40"
                  placeholder="Description"
                  {...register("description")}
               ></textarea>

               {/* category */}
               <select
                  className="select select-bordered w-full"
                  {...register("category")}
               >

                  <option value="Personal Growth">
                     Personal Growth
                  </option>

                  <option value="Career">
                     Career
                  </option>

                  <option value="Relationships">
                     Relationships
                  </option>

                  <option value="Mindset">
                     Mindset
                  </option>

               </select>

               {/* emotional tone */}
               <select
                  className="select select-bordered w-full"
                  {...register("emotionalTone")}
               >

                  <option value="Motivational">
                     Motivational
                  </option>

                  <option value="Sad">
                     Sad
                  </option>

                  <option value="Realization">
                     Realization
                  </option>

                  <option value="Gratitude">
                     Gratitude
                  </option>

               </select>

               {/* image */}
               <input
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Image URL"
                  {...register("image")}
               />

               {/* privacy */}
               <select
                  className="select select-bordered w-full"
                  {...register("privacy")}
               >

                  <option value="Public">
                     Public
                  </option>

                  <option value="Private">
                     Private
                  </option>

               </select>

               {/* access level */}
               <select
                  className="select select-bordered w-full"
                  {...register("accessLevel")}
                  disabled={!userData?.isPremium}
               >

                  <option value="Free">
                     Free
                  </option>

                  {
                     userData?.isPremium && (

                        <option value="Premium">
                           Premium
                        </option>
                     )
                  }

               </select>

               {/* creator info readonly */}
               <input
                  type="text"
                  value={lesson.creatorName || ""}
                  readOnly
                  className="input input-bordered w-full"
               />

               <input
                  type="email"
                  value={lesson.creatorEmail || ""}
                  readOnly
                  className="input input-bordered w-full"
               />

               {/* submit */}
               <button
                  type="submit"
                  className="btn btn-primary w-full"
               >
                  Update Lesson 🚀
               </button>

            </form>

         </div>

      </div>
   );
};

export default UpdateLesson;