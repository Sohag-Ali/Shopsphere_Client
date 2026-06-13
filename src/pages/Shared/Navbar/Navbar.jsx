import { Link, NavLink } from "react-router";
import useAuth from "../../../hooks/useAuth";
import useUser from "../../../hooks/useUser";
import { HiUser } from "react-icons/hi2";
import { CgLogOut } from "react-icons/cg";
import { FaShoppingCart } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import logoimg from "../../../assets/home/slogo.png";




const navLinkClass = ({ isActive }) =>
  `
      pb-1 border-b-2 transition-all duration-300 ${
        isActive
          ? "text-primary font-bold border-primary "
          : "text-base-content border-transparent hover:text-primary hover:border-primary"
      }
    `;

    
const Navbar = () => {
  const { user, logoutUser } = useAuth();
  const [userData] = useUser();

  const axiosSecure = useAxiosSecure();



const { data: cartItems = [] } = useQuery({
  queryKey: ["cart", user?.email],
  enabled: !!user?.email,
  staleTime: 0,
  gcTime: 0,
  refetchOnMount: true,
  refetchOnWindowFocus: true,

  queryFn: async () => {
    const res = await axiosSecure.get(
      `/cart/${user.email}`
    );

    return res.data;
  },
});

  // Handle Logout
  const handleLogout = () => {
    logoutUser()
      .then(() => {
        // remove token
        localStorage.removeItem("access-token");

        console.log("User logged out successfully");
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  };

  const links = (
    <>
      <li>
        <NavLink to="/" className={navLinkClass}>
          Home
        </NavLink>
      </li>

      <li>
        <NavLink to="/shop" className={navLinkClass}>
          Shop
        </NavLink>
      </li>

      <li>
        <NavLink to="/categories" className={navLinkClass}>
          Categories
        </NavLink>
      </li>

      <li>
        <NavLink to="/blog" className={navLinkClass}>
          Blog
        </NavLink>
      </li>

      <li>
        <NavLink to="/contact" className={navLinkClass}>
          Contact
        </NavLink>
      </li>

      {user && (
        <li>
          <NavLink to="/dashboard" className={navLinkClass}>
            Dashboard
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100 text-base-content shadow-sm ">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <Link className="flex items-center text-lg md:text-2xl font-bold  text-primary  bg-clip-text text-transparent">
          <img
            className="hidden md:block h-10 w-auto md:h-14 object-contain"
            src={logoimg}
            alt="Logo"
          />
          <span>ShopSphere</span>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal items-center gap-5 px-1">
          {links}
        </ul>
      </div>
      <div className="navbar-end">
        {/* IF USER LOGGED IN */}

        {user && (
          <Link
            to="/cart"
            className="
        btn
        btn-ghost
        btn-circle
        mr-2
        relative
      "
          >
            <FaShoppingCart className="text-xl" />

            <span
              className="
          absolute
          -top-1
          -right-1
          badge
          badge-error
          text-xs
          rounded-full
          h-5
          w-5
          flex
          items-center
          justify-center
        "
            >
                {cartItems.length}
            </span>
          </Link>
        )}
        {user ? (
          <div className="dropdown dropdown-end">
            {/* Avatar */}
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full ring-2 ring-primary hover:ring-violet-400 transition">
                <img
                  src={
                    user?.photoURL
                      ? user.photoURL
                      : "https://i.ibb.co/4pDNDk1/avatar.png"
                  }
                  alt="user"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Dropdown */}
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-4 z-[999] p-3 shadow-[0_20px_60px_rgba(0,0,0,0.35)] bg-base-100 backdrop-blur-xl border border-base-300 rounded-2xl w-60 text-base-content"
            >
              <li className="mb-2 border-b border-white/10 pb-3">
                <div className="flex flex-col">
                  <span className="font-semibold text-[16px] text-primary">
                    {user.displayName || "User"}
                  </span>
                </div>
              </li>

              <li>
                <Link
                  to={
                    userData?.role === "admin"
                      ? "/dashboard/admin/profile"
                      : "/dashboard/profile"
                  }
                  className="hover:bg-white/10 rounded-xl transition-all duration-300"
                >
                  <HiUser /> My Profile
                </Link>
              </li>

              <li>
                <Link to="/dashboard/my-orders" className="rounded-xl">
                  📦 My Orders
                </Link>
              </li>

              <li>
                <Link to="/dashboard/wishlist" className="rounded-xl">
                  ❤️ Wishlist
                </Link>
              </li>

              <li>
                <Link to="/dashboard/settings" className="rounded-xl">
                  ⚙️ Settings
                </Link>
              </li>

              <li>
                <Link to="/dashboard" className="rounded-xl">
                  📊 Dashboard
                </Link>
              </li>

              <li className="mt-2 border-t border-white/10 pt-2">
                <button
                  onClick={handleLogout}
                  className="text-red-400 hover:bg-red-500/10 rounded-xl transition-all duration-300"
                >
                  <CgLogOut /> Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          /* IF NOT LOGGED IN */
          <div className="flex gap-2">
            <Link
              to="/login"
              className="btn btn-outline px-5 py-2 rounded-xl btn-primary text-base-content hover:bg-white/10 transition backdrop-blur-md"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="btn btn-primary px-5 py-2 rounded-xl  text-base-content hover:scale-[1.03] transition-all duration-300 shadow-[0_10px_30px_rgba(124,58,237,0.35)]"
            >
              Signup
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
