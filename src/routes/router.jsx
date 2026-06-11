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
import AddProduct from "../pages/Dashboard/Admin/AddProduct/AddProduct";
import ManageProducts from "../pages/Dashboard/Admin/ManageProducts/ManageProducts";
import ManageReviews from "../pages/Dashboard/Admin/ManageReviews/ManageReviews";
import ManageOrders from "../pages/Dashboard/Admin/ManageOrders/ManageOrders";
import ManageCategories from "../pages/Dashboard/Admin/ManageCategories/ManageCategories";
import UpdateProduct from "../pages/Dashboard/Admin/ManageProducts/UpdateProduct";
import Categories from "../pages/Categories/Categories";
import Cart from "../pages/Cart/Cart";
import PaymentSuccess from "../coponents/Payment/PaymentSucces";
import PaymentCancel from "../coponents/Payment/PaymentCancel";
import Settings from "../pages/Dashboard/UserDashboard/Setting/Settings";
import Blogs from "../pages/Blogs/Blogs";
import Contract from "../pages/Contract/Contract";


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
        path: "/categories",
        element:<Categories></Categories>
      },
      {
        path: "/cart",
        element:<Cart></Cart>
      },
      {
        path: "payment-success",
        Component: PaymentSuccess,
      },
      {
        path: "payment-cancel",
        Component: PaymentCancel,
      },
      {
        path: "/blog",
        Component: Blogs,
      },
      {
        path: "/contact",
        Component: Contract,
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
        path: "/dashboard/settings",
        element: <Settings></Settings>,
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
        path: "/dashboard/admin/manage-users",
        element: (
          <AdminRoute>
            <ManageUsers></ManageUsers>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/admin/add-product",
        element: (
          <AdminRoute>
            <AddProduct></AddProduct>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/admin/manage-products",
        element: (
          <AdminRoute>
            <ManageProducts></ManageProducts>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/update-product/:id",
        element: (
          <AdminRoute>
            <UpdateProduct></UpdateProduct>
          </AdminRoute>
        ),
      },
      
      {
        path: "/dashboard/admin/manage-reviews",
        element: (
          <AdminRoute>
            <ManageReviews></ManageReviews>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/admin/manage-orders",
        element: (
          <AdminRoute>
            <ManageOrders></ManageOrders>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/admin/manage-categories",
        element: (
          <AdminRoute>
            <ManageCategories></ManageCategories>
          </AdminRoute>
        ),
      },

      {
        path: "profile",
        element: <Profile></Profile>,
      },
      {
        path: "/dashboard/admin/profile",
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
