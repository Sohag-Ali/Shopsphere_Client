
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useUser from "../../../hooks/useUser";
import { toast } from "react-toastify";


const AddLesson = () => {

    const { user } = useAuth();

   const axiosSecure = useAxiosSecure();

   const [userData] = useUser();

   const {
      register,
      handleSubmit,
      reset
   } = useForm();

   const onSubmit = async(data) => {

      try {

         const lessonData = {

            title: data.title,

            description: data.description,

            category: data.category,

            emotionalTone: data.emotionalTone,

            image: data.image,

            privacy: data.privacy,

            accessLevel: data.accessLevel,

            creatorName: user?.displayName,

            creatorEmail: user?.email,

            createdAt: new Date(),
         };

         const res = await axiosSecure.post(
            '/lessons',
            lessonData
         );

         console.log(res.data);

         if(res.data.insertedId){

            toast.success("Lesson added successfully!");

            reset();
         }

      } catch(error){

         console.log(error);

         toast.error("Failed to add lesson");
      }
   };

   return (

      <div className="max-w-4xl mx-auto p-6">

         <div className="bg-base-100 shadow-xl rounded-2xl p-8">

            <h1 className="text-4xl font-bold mb-2">
               Add New Lesson ✨
            </h1>

            <p className="text-gray-500 mb-8">
               Share your life experiences and inspire others.
            </p>

            <form
             onSubmit={handleSubmit(onSubmit)}
             className="space-y-6"
            >

               {/* lesson title */}
               <div>

                  <label className="label">
                     <span className="label-text font-semibold">
                        Lesson Title
                     </span>
                  </label>

                  <input
                     type="text"
                     placeholder="Enter lesson title"
                     className="input input-bordered w-full"
                     {...register("title", { required: true })}
                  />

               </div>

               {/* description */}
               <div>

                  <label className="label">
                     <span className="label-text font-semibold">
                        Full Description / Story
                     </span>
                  </label>

                  <textarea
                     placeholder="Write your lesson story..."
                     className="textarea textarea-bordered w-full h-40"
                     {...register("description", { required: true })}
                  ></textarea>

               </div>

               {/* category */}
               <div>

                  <label className="label">
                     <span className="label-text font-semibold">
                        Category
                     </span>
                  </label>

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

                     <option value="Mistakes Learned">
                        Mistakes Learned
                     </option>

                  </select>

               </div>

               {/* emotional tone */}
               <div>

                  <label className="label">
                     <span className="label-text font-semibold">
                        Emotional Tone
                     </span>
                  </label>

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

               </div>

               {/* image */}
               <div>

                  <label className="label">
                     <span className="label-text font-semibold">
                        Image URL (Optional)
                     </span>
                  </label>

                  <input
                     type="text"
                     placeholder="Paste image URL"
                     className="input input-bordered w-full"
                     {...register("image")}
                  />

               </div>

               {/* privacy */}
               <div>

                  <label className="label">
                     <span className="label-text font-semibold">
                        Privacy
                     </span>
                  </label>

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

               </div>

               {/* access level */}
               <div>

                  <label className="label">
                     <span className="label-text font-semibold">
                        Access Level
                     </span>
                  </label>

                  <select
                     className="select select-bordered w-full"
                     {...register("accessLevel")}
                     disabled={!userData?.isPremium}
                     title={
                        !userData?.isPremium
                        ?
                        "Upgrade to Premium to create paid lessons"
                        :
                        ""
                     }
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

                  {
                     !userData?.isPremium && (

                        <p className="text-sm text-red-500 mt-2">
                           Upgrade to Premium to create paid lessons.
                        </p>
                     )
                  }

               </div>

               {/* submit button */}
               <button
                  type="submit"
                  className="btn btn-primary w-full"
               >
                  Add Lesson 🚀
               </button>

            </form>

         </div>

      </div>
   );
};

export default AddLesson;