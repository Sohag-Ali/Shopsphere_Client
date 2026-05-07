import { Bookmark, Eye, Heart } from "lucide-react";


const EngagementSection = ({ lesson }) => {
     // random views
   const views =
   Math.floor(Math.random() * 10000);

   return (

      <section className="mt-12">

         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* likes */}
            <div className="bg-base-100 rounded-[25px] shadow-xl p-8 border border-base-300 hover:scale-105 duration-300">

               <div className="flex items-center justify-between">

                  <div>

                     <p className="text-gray-500 font-semibold">

                        Total Likes

                     </p>

                     <h2 className="text-5xl font-black mt-3 text-error">

                        {lesson.likesCount || 0}

                     </h2>

                     <p className="mt-2 text-gray-500">

                        ❤️ People liked this lesson

                     </p>

                  </div>

                  <div className="bg-error/10 p-5 rounded-full">

                     <Heart
                        className="text-error"
                        size={40}
                     />

                  </div>

               </div>

            </div>

            {/* favorites */}
            <div className="bg-base-100 rounded-[25px] shadow-xl p-8 border border-base-300 hover:scale-105 duration-300">

               <div className="flex items-center justify-between">

                  <div>

                     <p className="text-gray-500 font-semibold">

                        Favorites

                     </p>

                     <h2 className="text-5xl font-black mt-3 text-warning">

                        {lesson.favoritesCount || 0}

                     </h2>

                     <p className="mt-2 text-gray-500">

                        🔖 Saved by users

                     </p>

                  </div>

                  <div className="bg-warning/10 p-5 rounded-full">

                     <Bookmark
                        className="text-warning"
                        size={40}
                     />

                  </div>

               </div>

            </div>

            {/* views */}
            <div className="bg-base-100 rounded-[25px] shadow-xl p-8 border border-base-300 hover:scale-105 duration-300">

               <div className="flex items-center justify-between">

                  <div>

                     <p className="text-gray-500 font-semibold">

                        Views

                     </p>

                     <h2 className="text-5xl font-black mt-3 text-info">

                        {views}

                     </h2>

                     <p className="mt-2 text-gray-500">

                        👀 Total lesson views

                     </p>

                  </div>

                  <div className="bg-info/10 p-5 rounded-full">

                     <Eye
                        className="text-info"
                        size={40}
                     />

                  </div>

               </div>

            </div>

         </div>

      </section>
   );
};


export default EngagementSection;