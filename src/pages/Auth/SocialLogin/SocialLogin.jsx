import { FcGoogle } from "react-icons/fc";
import useAuth from "../../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiox from "../../../hooks/useAxiox";

const SocialLogin = () => {
  const { signInWithGoogle, logoutUser } = useAuth();
  const location = useLocation();
  const from = location.state?.from || "/";
  const navigate = useNavigate();
  const axiosInstance = useAxiox();

  // Handle Google Login
  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then(async (result) => {
        console.log(result);
        const user = result.user;

        // firebase token
        const token = await user.getIdToken();
        localStorage.setItem("access-token", token);

        // check banned user
        const checkUser = await axiosInstance.get(
          `/users/email/${user.email}`
        );

        // banned user
        if (checkUser.data?.isBanned) {
          await logoutUser();
          localStorage.removeItem("access-token");
          Swal.fire({
            icon: "error",
            title: "Account Restricted",
            text: "Your account has been suspended.",
            background: "#1F2937",
            color: "#FFFFFF",
            confirmButtonColor: "#C9B59C",
          });

          return navigate("/banned", { replace: true });
        }
        const userInfo = {
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
        };
        await axiosInstance
          .post("/users", userInfo)
          .then((res) => {
            console.log("User info saved to database:", res.data);
          })
          .catch((error) => {
            console.error("Error saving user info to database:", error);
          });
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
          text: "There was an error logging in with Google.",
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

  return (
    <div>
      <div className="relative flex py-2 items-center">
        <div className="flex-grow border-t border-white/15"></div>
        <span className="flex-shrink mx-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
          Or continue with
        </span>
        <div className="flex-grow border-t border-white/15"></div>
      </div>

      {/* Google Login */}
      <button
        type="button"
        className="mt-3 flex items-center justify-center w-full py-3.5 px-4 rounded-2xl border border-white/20 bg-white/5 hover:bg-white/10 hover:border-[#C9B59C]/50 text-white font-medium text-base gap-3 transition-all duration-300 backdrop-blur-md shadow-sm hover:shadow-[0_4px_20px_rgba(201,181,156,0.15)] hover:scale-[1.01]"
        onClick={handleGoogleLogin}
      >
        <FcGoogle size={22} className="flex-shrink-0" />
        <span>Continue with Google</span>
      </button>
    </div>
  );
};

export default SocialLogin;

