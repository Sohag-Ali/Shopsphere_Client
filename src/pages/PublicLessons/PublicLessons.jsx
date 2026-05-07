import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import useUser from "../../hooks/useUser";
import useAxiosSecure from "../../hooks/useAxiosSecure";


const PublicLessons = () => {
     const axiosSecure = useAxiosSecure();

   const [userData] = useUser();

   const { data: lessons = [] } = useQuery({

      queryKey: ['public-lessons'],

      queryFn: async() => {

         const res = await axiosSecure.get(
            '/public-lessons'
         );

         return res.data;
      }
   });

   return (

      <div className="min-h-screen bg-base-200 p-6">

         {/* heading */}
         <div className="text-center mb-12">

            <h1 className="text-5xl font-bold">
               Public Life Lessons 🌎
            </h1>

            <p className="mt-4 text-gray-500">
               Explore life experiences shared by people.
            </p>

         </div>

         {/* cards */}
         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {
               lessons.map(lesson => {

                  const isPremiumLocked =

                  lesson.accessLevel === 'Premium'
                  &&
                  !userData?.isPremium;

                  return (

                     <div
                      key={lesson._id}
                      className="card bg-base-100 shadow-xl relative overflow-hidden"
                     >

                        {/* premium overlay */}
                        {
                           isPremiumLocked && (

                              <div className="absolute inset-0 backdrop-blur-md bg-black/30 z-20 flex flex-col items-center justify-center text-white">

                                 <Lock size={40} />

                                 <h2 className="font-bold text-xl mt-3">
                                    Premium Lesson
                                 </h2>

                                 <p className="text-sm mt-1">
                                    Upgrade to view
                                 </p>

                                 <Link
                                  to="/pricing"
                                  className="btn btn-warning btn-sm mt-4"
                                 >
                                    Upgrade ⭐
                                 </Link>

                              </div>
                           )
                        }

                        {/* image */}
                        <figure>

                           <img
                              src={lesson.image}
                              alt=""
                              className="h-56 w-full object-cover"
                           />

                        </figure>

                        {/* body */}
                        <div className="card-body">

                           {/* title */}
                           <h2 className="card-title">
                              {lesson.title}
                           </h2>

                           {/* description */}
                           <p>
                              {
                                 lesson.description.slice(0, 100)
                              }
                              ...
                           </p>

                           {/* category + tone */}
                           <div className="flex gap-2 flex-wrap mt-2">

                              <div className="badge badge-primary">
                                 {lesson.category}
                              </div>

                              <div className="badge badge-secondary">
                                 {lesson.emotionalTone}
                              </div>

                           </div>

                           {/* creator */}
                           <div className="flex items-center gap-3 mt-4">

                              <img
                                 src={lesson.creatorPhoto}
                                 alt=""
                                 className="w-10 h-10 rounded-full"
                              />

                              <div>

                                 <h3 className="font-semibold">
                                    {lesson.creatorName}
                                 </h3>

                                 <p className="text-xs text-gray-500">
                                    {
                                       new Date(
                                          lesson.createdAt
                                       ).toLocaleDateString()
                                    }
                                 </p>

                              </div>

                           </div>

                           {/* access level */}
                           <div className="mt-3">

                              <div className={`badge ${
                                 lesson.accessLevel === 'Premium'
                                 ?
                                 'badge-warning'
                                 :
                                 'badge-success'
                              }`}>

                                 {lesson.accessLevel}

                              </div>

                           </div>

                           {/* details button */}
                           <div className="card-actions justify-end mt-4">

                              <Link
                               to={`/lesson-details/${lesson._id}`}
                               className="btn btn-primary btn-sm"
                              >
                                 See Details
                              </Link>

                           </div>

                        </div>

                     </div>
                  );
               })
            }

         </div>

      </div>
   );
};

export default PublicLessons;