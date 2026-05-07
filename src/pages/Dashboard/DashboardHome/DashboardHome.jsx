import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {  Bookmark, BookOpen, PlusCircle } from "lucide-react";
import { Link } from "react-router";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";


const DashboardHome = () => {
   const { user } = useAuth();

   const axiosSecure = useAxiosSecure();

   // fetch stats
   const { data: stats = {} } = useQuery({

      queryKey: [
         'dashboard-stats',
         user?.email
      ],

      enabled: !!user?.email,

      queryFn: async() => {

         const res =
         await axiosSecure.get(

            `/dashboard-stats/${user.email}`
         );

         return res.data;
      }
   });

   // fake chart data
   const chartData = [

      {
         month: "Jan",
         lessons: 2
      },

      {
         month: "Feb",
         lessons: 5
      },

      {
         month: "Mar",
         lessons: 3
      },

      {
         month: "Apr",
         lessons: 7
      },

      {
         month: "May",
         lessons: 4
      }
   ];

   return (

      <div className="p-6 md:p-10">

         {/* heading */}
         <div className="mb-10">

            <h1 className="text-4xl font-black">

               Dashboard Overview

            </h1>

            <p className="text-gray-500 mt-3">

               Welcome back,
               {" "}
               {user?.displayName}

            </p>

         </div>

         {/* stats cards */}
         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {/* total lessons */}
            <div className="bg-base-100 rounded-[30px] shadow-xl p-8">

               <div className="flex justify-between items-center">

                  <div>

                     <p className="text-gray-500">

                        Total Lessons

                     </p>

                     <h2 className="text-5xl font-black mt-4">

                        {
                           stats.totalLessons || 0
                        }

                     </h2>

                  </div>

                  <div className="bg-primary/10 p-5 rounded-full">

                     <BookOpen
                        className="text-primary"
                        size={40}
                     />

                  </div>

               </div>

            </div>

            {/* favorites */}
            <div className="bg-base-100 rounded-[30px] shadow-xl p-8">

               <div className="flex justify-between items-center">

                  <div>

                     <p className="text-gray-500">

                        Saved Lessons

                     </p>

                     <h2 className="text-5xl font-black mt-4">

                        {
                           stats.totalFavorites || 0
                        }

                     </h2>

                  </div>

                  <div className="bg-warning/10 p-5 rounded-full">

                     <Bookmark
                        className="text-warning"
                        size={40}
                     />

                  </div>

               </div>

            </div>

            {/* shortcuts */}
            <div className="bg-base-100 rounded-[30px] shadow-xl p-8">

               <h2 className="text-2xl font-black mb-6">

                  Quick Actions

               </h2>

               <div className="space-y-4">

                  <Link
                     to="/dashboard/add-lesson"
                     className="btn btn-primary w-full rounded-full"
                  >

                     <PlusCircle size={20} />

                     Add Lesson

                  </Link>

                  <Link
                     to="/dashboard/my-lessons"
                     className="btn btn-outline w-full rounded-full"
                  >

                     My Lessons

                  </Link>

               </div>

            </div>

         </div>

         {/* recent lessons */}
         <div className="bg-base-100 rounded-[30px] shadow-xl p-8 mt-12">

            <h2 className="text-3xl font-black mb-8">

               Recently Added Lessons

            </h2>

            <div className="space-y-5">

               {
                  stats.recentLessons?.map(lesson => (

                     <div
                        key={lesson._id}
                        className="flex items-center justify-between border-b border-base-300 pb-4"
                     >

                        <div>

                           <h3 className="font-bold text-lg">

                              {lesson.title}

                           </h3>

                           <p className="text-gray-500 text-sm">

                              {lesson.category}

                           </p>

                        </div>

                        <Link
                           to={`/lesson-details/${lesson._id}`}
                           className="btn btn-sm btn-primary rounded-full"
                        >
                           View
                        </Link>

                     </div>
                  ))
               }

            </div>

         </div>

         {/* analytics chart */}
         <div className="bg-base-100 rounded-[30px] shadow-xl p-8 mt-12">

            <h2 className="text-3xl font-black mb-8">

               Monthly Contributions

            </h2>

            <div className="h-[350px]">

               <ResponsiveContainer
                  width="100%"
                  height="100%"
               >

                  <BarChart data={chartData}>

                     <XAxis dataKey="month" />

                     <YAxis />

                     <Tooltip />

                     <Bar
                        dataKey="lessons"
                        radius={[10, 10, 0, 0]}
                     />

                  </BarChart>

               </ResponsiveContainer>

            </div>

         </div>

      </div>
   );
};

export default DashboardHome;