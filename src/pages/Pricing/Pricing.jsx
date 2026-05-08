import { CheckCircle, Crown,  XCircle } from "lucide-react";
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
    <div className="min-h-screen bg-[#0F172A]  py-20 px-4 relative overflow-hidden">
      
      {/* background blur */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-500/10 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-72 h-72 bg-indigo-500/10 blur-3xl rounded-full"></div>

      <div className="bg-[#0F172A]">
        
        {/* heading */}
        <div className="text-center max-w-3xl mx-auto mb-20">

          <span className="text-primary uppercase tracking-[4px] font-semibold">
            Pricing Plans
          </span>

          <h1 className="text-4xl md:text-6xl font-black text-white mt-5 leading-tight">
            Upgrade Your Learning Experience 
          </h1>

          <p className="mt-6 text-lg text-gray-400 leading-8">
            Unlock premium features, create unlimited lessons,
            and enjoy a more powerful LifeSpark experience.
          </p>

        </div>

        {/* pricing cards */}
        <div className="grid lg:grid-cols-2 gap-10 max-w-6xl mx-auto">

          {/* FREE PLAN */}
          <div
            className="
              relative
              overflow-hidden
              rounded-[32px]
              border
              border-white/10
              bg-white/5
              backdrop-blur-xl
              p-10
              hover:-translate-y-2
              hover:border-primary/30
              hover:shadow-purple-500/20
              hover:shadow-2xl
              transition-all
              duration-500
            "
          >

            {/* glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>

            <div className="relative z-10">

              <div className="flex items-center gap-3">

                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center">

                  <Crown className="text-white" />

                </div>

                <div>

                  <h2 className="text-3xl font-black text-white">
                    Free Plan
                  </h2>

                  <p className="text-gray-400 mt-1">
                    Perfect for beginners
                  </p>

                </div>

              </div>

              {/* price */}
              <div className="mt-10">

                <h1 className="text-6xl font-black text-white">
                  ৳0
                </h1>

                <p className="text-gray-400 mt-2">
                  Forever free access
                </p>

              </div>

              {/* divider */}
              <div className="h-[1px] bg-white/10 my-10"></div>

              {/* features */}
              <div className="space-y-5">

                <div className="flex items-center gap-4">
                  <CheckCircle className="text-green-400" />
                  <span className="text-gray-300">
                    Access Public Lessons
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <CheckCircle className="text-green-400" />
                  <span className="text-gray-300">
                    Create Limited Lessons
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <CheckCircle className="text-green-400" />
                  <span className="text-gray-300">
                    Basic Dashboard Access
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <XCircle className="text-red-400" />
                  <span className="text-gray-500">
                    Premium Lesson Creation
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <XCircle className="text-red-400" />
                  <span className="text-gray-500">
                    Priority Lesson Listing
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <XCircle className="text-red-400" />
                  <span className="text-gray-500">
                    Ad-Free Experience
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <XCircle className="text-red-400" />
                  <span className="text-gray-500">
                    Premium Badge
                  </span>
                </div>

              </div>

              {/* button */}
              <button
                className="
                  btn
                  w-full
                  mt-12
                  rounded-full
                  border
                  border-white/10
                  bg-white/5
                  hover:bg-white/10
                  text-white
                "
              >
                Current Plan
              </button>

            </div>
          </div>

          {/* PREMIUM PLAN */}
          <div
            className="
              relative
              overflow-hidden
              rounded-[32px]
              border
              border-primary/30
              bg-gradient-to-br
              from-indigo-500/10
              to-purple-600/10
              backdrop-blur-xl
              p-10
              hover:-translate-y-2
              hover:shadow-purple-500/30
              hover:shadow-2xl
              transition-all
              duration-500
            "
          >

            {/* popular badge */}
            <div
              className="
                absolute
                top-6
                right-6
                px-5
                py-2
                rounded-full
                bg-gradient-to-r
                from-indigo-500
                to-purple-600
                text-white
                text-sm
                font-semibold
                shadow-lg
              "
            >
              Most Popular ✨
            </div>

            {/* glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-purple-500/5"></div>

            <div className="relative z-10">

              {/* title */}
              <div className="flex items-center gap-4">

                <div
                  className="
                    w-14
                    h-14
                    rounded-2xl
                    bg-gradient-to-br
                    from-yellow-400
                    to-orange-500
                    flex
                    items-center
                    justify-center
                    shadow-lg
                  "
                >

                  <Crown className="text-black" />

                </div>

                <div>

                  <h2 className="text-3xl font-black text-white">
                    Premium Plan
                  </h2>

                  <p className="text-gray-300 mt-1">
                    Lifetime premium access
                  </p>

                </div>

              </div>

              {/* price */}
              <div className="mt-10">

                <h1 className="text-6xl font-black text-white">
                  ৳1500
                </h1>

                <p className="text-primary mt-2">
                  One-time payment only
                </p>

              </div>

              {/* divider */}
              <div className="h-[1px] bg-white/10 my-10"></div>

              {/* features */}
              <div className="space-y-5">

                <div className="flex items-center gap-4">
                  <CheckCircle className="text-green-400" />
                  <span className="text-gray-200">
                    Unlimited Lesson Creation
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <CheckCircle className="text-green-400" />
                  <span className="text-gray-200">
                    Create Premium Lessons
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <CheckCircle className="text-green-400" />
                  <span className="text-gray-200">
                    Priority Lesson Listing
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <CheckCircle className="text-green-400" />
                  <span className="text-gray-200">
                    Ad-Free Experience
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <CheckCircle className="text-green-400" />
                  <span className="text-gray-200">
                    Premium Badge
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <CheckCircle className="text-green-400" />
                  <span className="text-gray-200">
                    Premium Dashboard Features
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <CheckCircle className="text-green-400" />
                  <span className="text-gray-200">
                    Lifetime Access
                  </span>
                </div>

              </div>

              {/* button */}
              <button
                onClick={handleUpgrade}
                className="
                  btn
                  border-0
                  bg-gradient-to-r
                  from-indigo-500
                  to-purple-600
                  hover:from-purple-600
                  hover:to-indigo-500
                  text-white
                  w-full
                  rounded-full
                  mt-12
                  text-lg
                  shadow-xl
                  shadow-purple-500/20
                "
              >
                Upgrade to Premium ⭐
              </button>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Pricing;