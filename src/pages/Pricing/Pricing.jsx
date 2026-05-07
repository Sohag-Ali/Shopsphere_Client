import { CheckCircle, Crown, XCircle } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";


const Pricing = () => {
    const{user} = useAuth();
    const axiosSecure = useAxiosSecure();


    const handleUpgrade = async () => {
        try {
            console.log("button clicked");
            const res = await axiosSecure.post(
                "/create-checkout-session",
                {
                    email: user?.email
                }
            );

            // redirect stripe checkout
            window.location.replace(res.data.url);

        } catch (error) {
            console.log(error);
        }
    };


    return (
        <div className="min-h-screen bg-base-200 py-16 px-4">

             {/* heading */}
         <div className="text-center mb-12">

            <h1 className="text-5xl font-bold">
               Upgrade Your Plan 🚀
            </h1>

            <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
               Unlock premium features and take your learning
               experience to the next level with LifeSpark Premium.
            </p>

         </div>


             {/* pricing cards */}
         <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">

            {/* free plan */}
            <div className="card bg-base-100 shadow-xl border">

               <div className="card-body">

                  <h2 className="text-3xl font-bold">
                     Free Plan
                  </h2>

                  <p className="text-gray-500">
                     Perfect for beginners
                  </p>

                  <h1 className="text-5xl font-bold mt-4">
                     ৳0
                  </h1>

                  <div className="divider"></div>

                  <div className="space-y-4">

                     <div className="flex items-center gap-3">
                        <CheckCircle className="text-green-500" />
                        <span>Access Public Lessons</span>
                     </div>

                     <div className="flex items-center gap-3">
                        <CheckCircle className="text-green-500" />
                        <span>Create Limited Lessons</span>
                     </div>

                     <div className="flex items-center gap-3">
                        <CheckCircle className="text-green-500" />
                        <span>Basic Dashboard Access</span>
                     </div>

                     <div className="flex items-center gap-3">
                        <XCircle className="text-red-500" />
                        <span>Premium Lesson Creation</span>
                     </div>

                     <div className="flex items-center gap-3">
                        <XCircle className="text-red-500" />
                        <span>Priority Lesson Listing</span>
                     </div>

                     <div className="flex items-center gap-3">
                        <XCircle className="text-red-500" />
                        <span>Ad-Free Experience</span>
                     </div>

                     <div className="flex items-center gap-3">
                        <XCircle className="text-red-500" />
                        <span>Premium Badge</span>
                     </div>

                  </div>

               </div>

            </div>

            {/* premium plan */}
            <div className="card bg-base-100 shadow-2xl border-2 border-primary relative">

               {/* badge */}
               <div className="absolute -top-4 right-4 badge badge-primary badge-lg p-4">
                  Most Popular
               </div>

               <div className="card-body">

                  <div className="flex items-center gap-2">

                     <Crown className="text-yellow-500" />

                     <h2 className="text-3xl font-bold">
                        Premium Plan
                     </h2>

                  </div>

                  <p className="text-gray-500">
                     Lifetime premium access
                  </p>

                  <h1 className="text-5xl font-bold mt-4">
                     ৳1500
                  </h1>

                  <p className="text-sm text-gray-400">
                     One-time payment
                  </p>

                  <div className="divider"></div>

                  <div className="space-y-4">

                     <div className="flex items-center gap-3">
                        <CheckCircle className="text-green-500" />
                        <span>Unlimited Lesson Creation</span>
                     </div>

                     <div className="flex items-center gap-3">
                        <CheckCircle className="text-green-500" />
                        <span>Create Premium Lessons</span>
                     </div>

                     <div className="flex items-center gap-3">
                        <CheckCircle className="text-green-500" />
                        <span>Priority Lesson Listing</span>
                     </div>

                     <div className="flex items-center gap-3">
                        <CheckCircle className="text-green-500" />
                        <span>Ad-Free Experience</span>
                     </div>

                     <div className="flex items-center gap-3">
                        <CheckCircle className="text-green-500" />
                        <span>Premium Badge</span>
                     </div>

                     <div className="flex items-center gap-3">
                        <CheckCircle className="text-green-500" />
                        <span>Premium Dashboard Features</span>
                     </div>

                     <div className="flex items-center gap-3">
                        <CheckCircle className="text-green-500" />
                        <span>Lifetime Access</span>
                     </div>

                  </div>

                  {/* payment button */}
                  <button
                     onClick={handleUpgrade}
                     className="btn btn-primary mt-8"
                  >
                     Upgrade to Premium ⭐
                  </button>

               </div>

            </div>

         </div>

         
{/* 
      <button
              onClick={handleUpgrade}
              className="btn btn-primary mt-8"
            >
              Upgrade to Premium ⭐
            </button> */}

    </div>
  );
};
export default Pricing;