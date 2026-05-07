

const LessonBanner = ({ lesson }) => {
   return (

      <div className="bg-base-100 shadow-xl rounded-2xl overflow-hidden">

         {/* featured image */}
         <figure>

            <img
               src={lesson.image}
               alt={lesson.title}
               className="w-full h-[450px] object-cover"
            />

         </figure>

         {/* content */}
         <div className="p-8">

            {/* lesson title */}
            <h1 className="text-5xl font-bold leading-tight">

               {lesson.title}

            </h1>

            {/* category + emotional tone */}
            <div className="flex flex-wrap gap-3 mt-6">

               <div className="badge badge-primary badge-lg">

                  {lesson.category}

               </div>

               <div className="badge badge-secondary badge-lg">

                  {lesson.emotionalTone}

               </div>

               <div className={`badge badge-lg ${
                  lesson.accessLevel === "Premium"
                  ?
                  "badge-warning"
                  :
                  "badge-success"
               }`}>

                  {lesson.accessLevel}

               </div>

            </div>

            {/* description */}
            <div className="mt-8">

               <h2 className="text-2xl font-bold mb-4">

                  Full Story / Insight

               </h2>

               <p className="text-lg leading-9 text-gray-700">

                  {lesson.description}

               </p>

            </div>

         </div>

      </div>
   );
};
export default LessonBanner;