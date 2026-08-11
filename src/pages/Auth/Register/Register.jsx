import { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import Swal from "sweetalert2";
import registerBanner from "../../../assets/registerBanner.png";
import logoImg from "../../../assets/home/slogo.png";
import { Eye, EyeOff, User, Image as ImageIcon, Mail, Lock, UserPlus, Gift, Truck, ShieldCheck, Crown } from "lucide-react";
import useAxiox from "../../../hooks/useAxiox";

const Register = () => {
  const [show, setShow] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { registerUser, updateUserProfile } = useAuth();

  const location = useLocation();
  const from = location.state?.from || "/";
  const navigate = useNavigate();
  const axiosInstance = useAxiox();

  // Handle registration
  const handleRegister = async (data) => {
    console.log(data);

    registerUser(data.email, data.password, data.name, data.photoUrl)
      .then(async (result) => {
        const user = result.user;
        // firebase token
        const token = await user.getIdToken();

        localStorage.setItem("access-token", token);
        console.log(user);

        // Update user profile with name and photo URL
        await updateUserProfile(data.name, data.photoUrl)
          .then(async () => {
            console.log("Profile updated successfully");
            const userInfo = {
              name: data.name,
              email: data.email,
              photo: data.photoUrl,
            };
            await axiosInstance
              .post("/users", userInfo)
              .then((res) => {
                console.log("User info saved to database:", res.data);
              })
              .catch((error) => {
                console.error("Error saving user info to database:", error);
              });

            navigate(from, { replace: true });
            window.location.reload();
          })
          .catch((error) => {
            console.error("Error updating profile:", error);
          });

        Swal.fire({
          title: "Welcome to ShopSphere! ✨",
          text: "Your account has been created successfully.",
          icon: "success",
          background: "#1F2937",
          color: "#fff",
          backdrop: `rgba(0, 0, 0, 0.5) blur(8px)`,
          showConfirmButton: true,
          confirmButtonText: "Continue Shopping",
          confirmButtonColor: "#C9B59C",
          customClass: {
            popup:
              "rounded-3xl border border-[#C9B59C]/20 backdrop-blur-xl shadow-2xl",
            title: "!text-white font-bold",
            htmlContainer: "!text-gray-300",
            confirmButton: "px-6 py-3 rounded-xl !text-neutral font-semibold",
          },
        });
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          title: "Registration Failed",
          text: error.message,
          icon: "error",
          background: "#1F2937",
          color: "#fff",
          backdrop: `rgba(0, 0, 0, 0.5) blur(8px)`,
          showConfirmButton: true,
          confirmButtonText: "Try Again",
          confirmButtonColor: "#C9B59C",
          customClass: {
            popup:
              "rounded-3xl border border-white/10 backdrop-blur-xl shadow-2xl",
            title: "!text-white",
            htmlContainer: "!text-gray-300",
            confirmButton: "px-6 py-3 rounded-xl !text-neutral font-semibold",
          },
        });
      });
  };

  return (
    <div className="min-h-screen bg-[#121214] text-white flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#C9B59C]/15 blur-[130px] pointer-events-none animate-glow-pulse"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[550px] h-[550px] rounded-full bg-[#C9B59C]/10 blur-[150px] pointer-events-none animate-glow-pulse"></div>

      {/* Main Glass Container with Entrance Animation */}
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 overflow-hidden rounded-3xl bg-[#1A1A1E]/85 backdrop-blur-2xl border border-[#C9B59C]/30 shadow-[0_25px_70px_rgba(0,0,0,0.75)] relative z-10 animate-fade-up">
        
        {/* LEFT SIDE - FORM */}
        <div className="lg:col-span-7 p-8 md:p-12 flex flex-col justify-center">
          
          {/* Brand Logo & Heading */}
          <div className="mb-6">
            <Link to="/" className="inline-flex items-center gap-3 mb-4 group">
              <div className="p-1.5 rounded-2xl bg-[#C9B59C]/10 border border-[#C9B59C]/30 transition-transform duration-300 group-hover:scale-105">
                <img
                  src={logoImg}
                  alt="ShopSphere Logo"
                  className="h-9 w-auto object-contain"
                />
              </div>
              <span className="text-2xl font-bold tracking-tight text-[#C9B59C]">
                ShopSphere
              </span>
            </Link>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Create Account
            </h1>
            <p className="text-gray-400 mt-1.5 text-sm md:text-base">
              Join ShopSphere to enjoy exclusive member rewards and fast checkout.
            </p>
          </div>

          {/* FORM */}
          <form className="space-y-4" onSubmit={handleSubmit(handleRegister)}>
            {/* NAME */}
            <div>
              <label className="block mb-1.5 text-xs font-semibold uppercase tracking-wider text-gray-300">
                Full Name
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#C9B59C] transition-colors duration-300">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  placeholder="John Doe"
                  className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 outline-none focus:border-[#C9B59C] focus:ring-2 focus:ring-[#C9B59C]/25 transition-all duration-300 backdrop-blur-md text-sm"
                />
              </div>
              {errors.name && (
                <p className="text-red-400 text-xs mt-1 font-medium">
                  Name is required
                </p>
              )}
            </div>

            {/* PHOTO URL */}
            <div>
              <label className="block mb-1.5 text-xs font-semibold uppercase tracking-wider text-gray-300">
                Profile Photo URL <span className="text-gray-500 text-[10px] uppercase font-normal">(Optional)</span>
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#C9B59C] transition-colors duration-300">
                  <ImageIcon size={18} />
                </div>
                <input
                  type="text"
                  {...register("photoUrl")}
                  placeholder="https://example.com/avatar.jpg"
                  className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 outline-none focus:border-[#C9B59C] focus:ring-2 focus:ring-[#C9B59C]/25 transition-all duration-300 backdrop-blur-md text-sm"
                />
              </div>
            </div>

            {/* EMAIL */}
            <div>
              <label className="block mb-1.5 text-xs font-semibold uppercase tracking-wider text-gray-300">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#C9B59C] transition-colors duration-300">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  placeholder="name@example.com"
                  className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 outline-none focus:border-[#C9B59C] focus:ring-2 focus:ring-[#C9B59C]/25 transition-all duration-300 backdrop-blur-md text-sm"
                />
              </div>
              {errors.email?.type === "required" && (
                <p className="text-red-400 text-xs mt-1 font-medium">Email is required</p>
              )}
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block mb-1.5 text-xs font-semibold uppercase tracking-wider text-gray-300">
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#C9B59C] transition-colors duration-300">
                  <Lock size={18} />
                </div>
                <input
                  type={show ? "text" : "password"}
                  {...register("password", {
                    required: true,
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).+$/,
                      message:
                        "Must include uppercase & lowercase letters and a number",
                    },
                  })}
                  placeholder="Create a strong password"
                  className="w-full pl-11 pr-12 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 outline-none focus:border-[#C9B59C] focus:ring-2 focus:ring-[#C9B59C]/25 transition-all duration-300 backdrop-blur-md text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-white transition"
                >
                  {show ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>

              {errors.password && (
                <p className="text-red-400 text-xs mt-1 font-medium">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-[#C9B59C] hover:bg-[#b8a287] text-[#121214] font-bold text-base shadow-[0_10px_30px_rgba(201,181,156,0.3)] hover:shadow-[0_15px_35px_rgba(201,181,156,0.45)] hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer mt-3"
            >
              <UserPlus size={18} />
              <span>Create Account</span>
            </button>
          </form>

          {/* SOCIAL LOGIN */}
          <div className="mt-5">
            <SocialLogin />
          </div>

          {/* LOGIN LINK */}
          <p className="text-center mt-5 text-gray-400 text-sm">
            Already have an account?{" "}
            <Link
              state={location.state}
              to="/login"
              className="text-[#C9B59C] hover:text-[#d6c4ad] font-bold transition hover:underline ml-1"
            >
              Sign In
            </Link>
          </p>
        </div>

        {/* RIGHT SIDE - HIGH END VISUAL HERO */}
        <div className="hidden lg:col-span-5 lg:flex relative items-center justify-center overflow-hidden border-l border-white/10 min-h-[600px]">
          {/* IMAGE */}
          <img
            src={registerBanner}
            alt="ShopSphere VIP Membership Visual"
            className="absolute inset-0 w-full h-full object-cover scale-105 filter brightness-[0.75] transition-transform duration-700 hover:scale-110"
          />

          {/* OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#121214] via-[#121214]/60 to-transparent"></div>
          <div className="absolute inset-0 bg-[#C9B59C]/10 mix-blend-overlay"></div>

          {/* CONTENT */}
          <div className="relative z-10 text-white p-8 text-center flex flex-col items-center">
            {/* Animated Floating Crown Badge */}
            <div className="w-14 h-14 rounded-2xl bg-[#C9B59C]/25 border border-[#C9B59C]/50 backdrop-blur-md flex items-center justify-center mb-6 text-[#C9B59C] shadow-[0_10px_25px_rgba(201,181,156,0.3)] animate-float">
              <Crown size={28} />
            </div>

            <h2 className="text-3xl font-extrabold leading-tight text-white mb-3 tracking-tight">
              Join the ShopSphere <br /> VIP Club
            </h2>

            <p className="text-sm text-gray-300 leading-relaxed max-w-xs mb-8">
              Become a member to unlock personalized luxury recommendations, priority support, and rewards.
            </p>

            {/* BADGES */}
            <div className="space-y-3 w-full max-w-xs">
              <div className="flex items-center gap-3 bg-black/40 backdrop-blur-xl px-4 py-3 rounded-2xl border border-white/15 text-xs text-gray-200 shadow-lg hover:border-[#C9B59C]/40 transition-all duration-300">
                <Gift size={18} className="text-[#C9B59C] flex-shrink-0" />
                <span className="font-medium">Member-Only Coupons & Gifts</span>
              </div>

              <div className="flex items-center gap-3 bg-black/40 backdrop-blur-xl px-4 py-3 rounded-2xl border border-white/15 text-xs text-gray-200 shadow-lg hover:border-[#C9B59C]/40 transition-all duration-300">
                <Truck size={18} className="text-[#C9B59C] flex-shrink-0" />
                <span className="font-medium">Real-Time Order & Parcel Tracking</span>
              </div>

              <div className="flex items-center gap-3 bg-black/40 backdrop-blur-xl px-4 py-3 rounded-2xl border border-white/15 text-xs text-gray-200 shadow-lg hover:border-[#C9B59C]/40 transition-all duration-300">
                <ShieldCheck size={18} className="text-[#C9B59C] flex-shrink-0" />
                <span className="font-medium">Encrypted & Fast Checkout</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Register;


