import { NavLink, Outlet } from "react-router";
import useUser from "../hooks/useUser";
import Container from "../coponents/Container/Container";

import LoadingDash from "../coponents/LoadingPage/LoadingDash";
import { Suspense } from "react";
import logoimg from "../assets/home/slogo (2).png";

const navLinkClass = ({ isActive }) =>
  `
      flex
      items-center
      gap-3
      rounded-2xl
      px-4
      py-3
      transition-all
      duration-300
      ${
        isActive
          ? "bg-primary text-primary-content font-semibold shadow-lg"
  : "text-base-content/70 font-medium hover:bg-base-200 hover:text-primary"
      }
    `;

const DashboardLayout = () => {
  const [userData, isLoading] = useUser();
  if (isLoading) {
  return <LoadingDash />;
}

  return (
    <div className="drawer md:drawer-open bg-base-200 text-base-content min-h-screen">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
    <nav className="navbar sticky top-0 z-50 w-full bg-base-200/80 backdrop-blur-xl border-b border-base-300 px-4 md:px-6">

  <div className="flex items-center gap-4">

    <label
      htmlFor="my-drawer-4"
      aria-label="open sidebar"
      className="btn btn-square btn-ghost md:hidden"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        strokeLinejoin="round"
        strokeLinecap="round"
        strokeWidth="2"
        fill="none"
        stroke="currentColor"
        className="size-5"
      >
        <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
        <path d="M9 4v16"></path>
        <path d="M14 10l2 2l-2 2"></path>
      </svg>
    </label>

    <NavLink
      to="/"
      className="
        md:hidden
        text-lg
        font-black
        bg-primary
        bg-clip-text
        text-transparent
        flex
        items-center
        
      "
    >
      <img src={logoimg} alt="Logo" className="h-10 w-auto md:h-14 object-contain" />
      <span>ShopSphere</span>
    </NavLink>

    <div className="hidden md:block text-lg md:text-xl font-bold bg-primary bg-clip-text text-transparent">
      Dashboard
    </div>

    

  </div>
</nav>
        {/* Page content here */}

        <Container>
          <Suspense fallback={<LoadingDash></LoadingDash>}>
            <Outlet />
          </Suspense>
        </Container>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className=" flex min-h-full flex-col items-start bg-base-100 border-r border-base-300 backdrop-blur-xl is-drawer-close:w-14 is-drawer-open:w-72 transition-all duration-300 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full grow p-4 space-y-2">
            <li className="hidden md:block  ">
              <NavLink to="/" className={navLinkClass}>
                {/* Home icon */}
                <img src={logoimg} alt="Logo" className="h-8 w-auto  object-contain" />
                <span className="text-xl font-bold bg-primary bg-clip-text text-transparent">
                  ShopSphere
                </span>
              </NavLink>
            </li>

            {userData && userData?.role === "user" && (
              <>
                {/* Home item */}

                <li className="mt-15 md:mt-0">
                  <NavLink
                    to="/dashboard/overview"
                    className={navLinkClass}
                    data-tip="Homepage"
                  >
                    <span className="is-drawer-close:hidden">📊 Overview</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/my-orders"
                    className={navLinkClass}
                    data-tip="my orders"
                  >
                    {/* Add Lesson icon */}
                    <span className="is-drawer-close:hidden">📦 My Orders</span>
                  </NavLink>
                </li>

                {/* List item */}
                <li>
                  <NavLink
                    to="/dashboard/wishlist"
                    className={navLinkClass}
                    data-tip="My Lessons"
                  >
                    
                    <span className="is-drawer-close:hidden">❤️ Wishlist</span>
                  </NavLink>
                </li>

                {/* favorite */}
                <li>
                  <NavLink
                    to="/dashboard/my-reviews"
                    className={navLinkClass}
                    data-tip="Favorites"
                  >
                    <span className="is-drawer-close:hidden">⭐ My Reviews</span>
                  </NavLink>
                </li>

                {/* profile */}
                <li>
                  <NavLink
                    to="/dashboard/profile"
                    className={navLinkClass}
                    data-tip="Profile"
                  >
                    <span className="is-drawer-close:hidden">👤 Profile</span>
                  </NavLink>
                </li>
                 <li>
                  <NavLink
                    to="/dashboard/settings"
                    className={navLinkClass}
                    data-tip="Favorites"
                  >
                    <span className="is-drawer-close:hidden">⚙️ Settings</span>
                  </NavLink>
                </li>
              </>
            )}

            {userData && userData?.role === "admin" && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/admin-overview"
                    className={navLinkClass}
                    data-tip="Homepage"
                  >
                    <span className="is-drawer-close:hidden">📊 Admin Overview</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/admin/manage-users"
                    className={navLinkClass}
                    data-tip="Manage Users"
                  >
                  
                    <span className="is-drawer-close:hidden">
                      👥 Manage Users
                    </span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/admin/add-product"
                    className={navLinkClass}
                    data-tip="Manage Users"
                  >
                  
                    <span className="is-drawer-close:hidden">
                      ➕ Add Product
                    </span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/admin/manage-products"
                    className={navLinkClass}
                    data-tip="Manage Lessons"
                  >
                   
                    <span className="is-drawer-close:hidden">
                      🛍 Manage Products
                    </span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/admin/manage-categories"
                    className={navLinkClass}
                    data-tip="Reported Lessons"
                  >
                    
                    <span className="is-drawer-close:hidden">
                      📂 Manage Categories
                    </span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/admin/manage-orders"
                    className={navLinkClass}
                    data-tip="Add Lesson"
                  >
                    <span className="is-drawer-close:hidden">📦 Manage Orders</span>
                  </NavLink>
                </li>

                {/* List item */}
                <li>
                  <NavLink
                    to="/dashboard/admin/manage-reviews"
                    className={navLinkClass}
                    data-tip="My Lessons"
                  >
                  
                    <span className="is-drawer-close:hidden">⭐ Manage Reviews</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/admin/profile"
                    className={navLinkClass}
                    data-tip="Profile"
                  >
                    <span className="is-drawer-close:hidden">👤 Admin Profile</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/settings"
                    className={navLinkClass}
                    data-tip="Favorites"
                  >
                    <span className="is-drawer-close:hidden">⚙️ Settings</span>
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
