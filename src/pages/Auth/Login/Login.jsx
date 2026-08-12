import { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import Swal from "sweetalert2";
import loginBanner from "../../../assets/loginBanner.png";
import logoImg from "../../../assets/home/slogo.png";
import useAxiox from "../../../hooks/useAxiox";
import { Mail, Lock, Eye, EyeOff, ShoppingBag, Sparkles, ShieldCheck, Tag, Star, UserCheck, User } from "lucide-react";
import { motion } from "framer-motion";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { loginUser } = useAuth();
  const location = useLocation();
  const from = location.state?.from || "/";
  const navigate = useNavigate();
  const axiosInstance = useAxiox();

  // Handle Login
  const handleLogin = (data) => {
    console.log("FORM DATA:", data);
    loginUser(data.email, data.password)
      .then(async (result) => {
        const user = result.user;

        // firebase token
        const token = await user.getIdToken();
        localStorage.setItem("access-token", token);

        console.log(user);

        // check banned user
        const res = await axiosInstance.get(`/users/email/${user.email}`);

        // banned check
        if (res.data?.isBanned) {
          return navigate("/banned");
        }

        Swal.fire({
          title: "Welcome Back! ✨",
          text: "Login successful!",
          icon: "success",
          background: "#1F2937",
          color: "#ffffff",
          backdrop: `rgba(0,0,0,0.5) blur(8px)`,
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          customClass: {
            popup:
              "rounded-3xl border border-[#C9B59C]/20 backdrop-blur-xl shadow-2xl",
            title: "!text-white font-bold",
            htmlContainer: "!text-gray-300",
          },
        });
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          title: "Login Failed!",
          text: "Please check your email and password.",
          icon: "error",
          background: "#1F2937",
          color: "#ffffff",
          backdrop: `rgba(0,0,0,0.5) blur(8px)`,
          showConfirmButton: true,
          confirmButtonText: "Try Again",
          confirmButtonColor: "#C9B59C",
          customClass: {
            popup:
              "rounded-3xl border border-white/10 backdrop-blur-xl shadow-2xl",
            title: "!text-white",
            htmlContainer: "!text-gray-300",
            confirmButton: "rounded-xl px-6 py-3 font-semibold !text-neutral",
          },
        });
      });
  };

  // Quick Demo Login Helper
  const handleDemoLogin = (role) => {
    if (role === "admin") {
      const demoEmail = "admin@example.com";
      const demoPassword = "Admin123";
      setValue("email", demoEmail, { shouldValidate: true });
      setValue("password", demoPassword, { shouldValidate: true });
      handleLogin({ email: demoEmail, password: demoPassword });
    } else if (role === "user") {
      const demoEmail = "user@example.com";
      const demoPassword = "User123";
      setValue("email", demoEmail, { shouldValidate: true });
      setValue("password", demoPassword, { shouldValidate: true });
      handleLogin({ email: demoEmail, password: demoPassword });
    }
  };

  return (
    <div className="min-h-screen bg-[#121214] text-white flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Dynamic Animated Ambient Background Glows */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#C9B59C]/15 blur-[130px] pointer-events-none"
      ></motion.div>
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute bottom-[-10%] right-[-10%] w-[550px] h-[550px] rounded-full bg-[#C9B59C]/10 blur-[150px] pointer-events-none"
      ></motion.div>

      {/* Main Glass Card Container with Entrance Animation */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 overflow-hidden rounded-3xl bg-[#1A1A1E]/85 backdrop-blur-2xl border border-[#C9B59C]/30 shadow-[0_25px_70px_rgba(0,0,0,0.75)] relative z-10"
      >
        
        {/* LEFT SIDE - LOGIN FORM */}
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
              Welcome Back
            </h1>
            <p className="text-gray-400 mt-2 text-sm md:text-base">
              Sign in to access your luxury wishlist, orders, and exclusive member perks.
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(handleLogin)}>
            {/* Email */}
            <div>
              <label className="block mb-2 text-xs font-semibold uppercase tracking-wider text-gray-300">
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
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 outline-none focus:border-[#C9B59C] focus:ring-2 focus:ring-[#C9B59C]/25 transition-all duration-300 backdrop-blur-md text-sm"
                />
              </div>
              {errors.email?.type === "required" && (
                <p className="text-red-400 text-xs mt-1.5 font-medium">Email is required</p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-300">
                  Password
                </label>
                <a
                  href="#"
                  className="text-xs text-[#C9B59C] hover:text-[#d6c4ad] font-medium transition hover:underline"
                >
                  Forgot password?
                </a>
              </div>

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#C9B59C] transition-colors duration-300">
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: true,
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  placeholder="Enter your password"
                  className="w-full pl-11 pr-12 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 outline-none focus:border-[#C9B59C] focus:ring-2 focus:ring-[#C9B59C]/25 transition-all duration-300 backdrop-blur-md text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-white transition"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {errors.password?.type === "required" && (
                <p className="text-red-400 text-xs mt-1.5 font-medium">
                  Password is required
                </p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-400 text-xs mt-1.5 font-medium">
                  Password must be at least 6 characters
                </p>
              )}
            </div>

            {/* Login Button with Subtle Hover Glow */}
            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-[#C9B59C] hover:bg-[#b8a287] text-[#121214] font-bold text-base shadow-[0_10px_30px_rgba(201,181,156,0.3)] hover:shadow-[0_15px_35px_rgba(201,181,156,0.45)] hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <ShoppingBag size={18} />
              <span>Sign In</span>
            </button>
          </form>

          {/* Quick Demo Login Buttons */}
          <div className="mt-5 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-300 flex items-center gap-1.5">
                <UserCheck size={15} className="text-[#C9B59C]" />
                Quick Demo Accounts
              </span>
              <span className="text-[11px] text-gray-400">1-Click Auto Login</span>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => handleDemoLogin("admin")}
                className="py-2.5 px-3 rounded-xl bg-white/5 hover:bg-[#C9B59C]/20 border border-white/10 hover:border-[#C9B59C]/40 text-xs font-medium text-gray-200 hover:text-white flex items-center justify-center gap-2 transition-all duration-200 group cursor-pointer"
              >
                <ShieldCheck size={15} className="text-[#C9B59C] group-hover:scale-110 transition-transform" />
                <span>Admin Demo</span>
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin("user")}
                className="py-2.5 px-3 rounded-xl bg-[#C9B59C]/10 hover:bg-[#C9B59C]/20 border border-[#C9B59C]/30 hover:border-[#C9B59C]/50 text-xs font-medium text-gray-200 hover:text-white flex items-center justify-center gap-2 transition-all duration-200 group cursor-pointer"
              >
                <User size={15} className="text-[#C9B59C] group-hover:scale-110 transition-transform" />
                <span>User Demo</span>
              </button>
            </div>
          </div>

          {/* Social Login */}
          <div className="mt-4">
            <SocialLogin />
          </div>

          {/* Register Redirect */}
          <p className="text-center mt-5 text-gray-400 text-sm">
            Don’t have an account?{" "}
            <Link
              state={location.state}
              to="/register"
              className="text-[#C9B59C] hover:text-[#d6c4ad] font-bold transition hover:underline ml-1"
            >
              Create an Account
            </Link>
          </p>
        </div>

        {/* RIGHT SIDE - E-COMMERCE HIGH END VISUAL HERO */}
        <div className="hidden lg:col-span-5 lg:flex relative items-center justify-center overflow-hidden border-l border-white/10 min-h-[580px]">
          {/* Background Generated Luxury Product Banner Image */}
          <img
            src={loginBanner}
            alt="ShopSphere Luxury E-Commerce Visual"
            className="absolute inset-0 w-full h-full object-cover scale-105 filter brightness-[0.75] transition-transform duration-700 hover:scale-110"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#121214] via-[#121214]/60 to-transparent"></div>
          <div className="absolute inset-0 bg-[#C9B59C]/10 mix-blend-overlay"></div>

          {/* Content & Floating Floating Badges */}
          <div className="relative z-10 text-white p-8 text-center flex flex-col items-center">
            {/* Animated Floating Sparkle Badge */}
            <div className="w-14 h-14 rounded-2xl bg-[#C9B59C]/25 border border-[#C9B59C]/50 backdrop-blur-md flex items-center justify-center mb-6 text-[#C9B59C] shadow-[0_10px_25px_rgba(201,181,156,0.3)] animate-float">
              <Sparkles size={28} />
            </div>

            <h2 className="text-3xl font-extrabold leading-tight text-white mb-3 tracking-tight">
              Elevate Your <br /> Shopping Experience
            </h2>

            <p className="text-sm text-gray-300 leading-relaxed max-w-xs mb-8">
              Explore thousands of curated luxury products, trending fashion, and exclusive member discounts.
            </p>

            {/* E-Commerce Floating Badges */}
            <div className="space-y-3 w-full max-w-xs">
              <div className="flex items-center gap-3 bg-black/40 backdrop-blur-xl px-4 py-3 rounded-2xl border border-white/15 text-xs text-gray-200 shadow-lg hover:border-[#C9B59C]/40 transition-all duration-300">
                <ShieldCheck size={18} className="text-[#C9B59C] flex-shrink-0" />
                <span className="font-medium">100% Authentic Guarantee</span>
              </div>
              <div className="flex items-center gap-3 bg-black/40 backdrop-blur-xl px-4 py-3 rounded-2xl border border-white/15 text-xs text-gray-200 shadow-lg hover:border-[#C9B59C]/40 transition-all duration-300">
                <Star size={18} className="text-[#C9B59C] flex-shrink-0" />
                <span className="font-medium">Exclusive Member Perks & Deals</span>
              </div>
              <div className="flex items-center gap-3 bg-black/40 backdrop-blur-xl px-4 py-3 rounded-2xl border border-white/15 text-xs text-gray-200 shadow-lg hover:border-[#C9B59C]/40 transition-all duration-300">
                <Tag size={18} className="text-[#C9B59C] flex-shrink-0" />
                <span className="font-medium">Seasonal Sales & Fast Shipping</span>
              </div>
            </div>
          </div>
        </div>

      </motion.div>
    </div>
  );
};

export default Login;
