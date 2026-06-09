import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";

import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";



import Profile from "../pages/Dashboard/UserDashboard/Profile/Profile";



import DashboardRedirect from "../pages/Dashboard/DashboardRedirect/DashboardRedirect";

import ManageUsers from "../pages/Dashboard/Admin/ManageUsers/ManageUsers";
import ManageLessons from "../pages/Dashboard/Admin/ManageLessons/ManageLessons";
import ReportedLessons from "../pages/Dashboard/Admin/ReportedLessons/ReportedLessons";
import AdminProfile from "../pages/Dashboard/Admin/AdminProfile/AdminProfile";
// import CommentSection from "../pages/DetailsPage/CommentSection";
import BannedPage from "../coponents/BannedPage/BannedPage";
import AdminRoute from "./AdminRoute";
import NotFound from "../coponents/error/NotFound";
import Unauthorized from "../coponents/error/Unauthorized";
import ProductDetails from "../pages/DetailsPage/ProductDetails";
import Shop from "../pages/Shop/Shop";
import MyOrders from "../pages/Dashboard/UserDashboard/MyOrders/MyOrders";
import Overview from "../pages/Dashboard/UserDashboard/Overview/Overview";
import Wishlist from "../pages/Dashboard/UserDashboard/Wishlist/Wishlist";
import MyReviews from "../pages/Dashboard/UserDashboard/MyReviews/MyReviews";
import AdminOverview from "../pages/Dashboard/Admin/AdminOverview/AdminOverview";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/shop",
        Component: Shop,
      },
      {
        path: "/product/:id",
        element:<ProductDetails></ProductDetails>
      },
      
      {
        path: "/banned",
        Component: BannedPage,
      },
    ],
  },

  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },

  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardRedirect></DashboardRedirect>,
      },
      {
        path: "/dashboard/overview",
        element: <Overview></Overview>
      },
      {
        path: "/dashboard/my-orders",
        element: <MyOrders></MyOrders>,
      },
      {
        path: "/dashboard/wishlist",
        element: <Wishlist></Wishlist>,
      },
      {
        path: "/dashboard/my-reviews",
        element: <MyReviews></MyReviews>,
      },
      
      
      {
        path: "/dashboard/admin-overview",
        element: (
          <AdminRoute>
            <AdminOverview></AdminOverview>
          </AdminRoute>
        ),
      },
      {
        path: "admin/manage-users",
        element: (
          <AdminRoute>
            <ManageUsers></ManageUsers>
          </AdminRoute>
        ),
      },
      {
        path: "admin/manage-lessons",
        element: (
          <AdminRoute>
            <ManageLessons></ManageLessons>
          </AdminRoute>
        ),
      },
      {
        path: "admin/reported-lessons",
        element: (
          <AdminRoute>
            <ReportedLessons></ReportedLessons>
          </AdminRoute>
        ),
      },
      
      {
        path: "profile",
        element: <Profile></Profile>,
      },
      {
        path: "admin/admin-profile",
        element: (
          <AdminRoute>
            <AdminProfile></AdminProfile>
          </AdminRoute>
        ),
      },
    ],
  },

  {
    path: "*",

    element: <NotFound></NotFound>,
  },
  {
        path: "unauthorized",
        element: <Unauthorized></Unauthorized>
      },
]);
