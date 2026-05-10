import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import useUser from "../hooks/useUser";
import Loading from "../coponents/LoadingPage/Loading";


const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();
    const [userData, isLoading] = useUser();
    console.log("PrivateRoute: user =", user, "loading =", loading, "location =", location);
    
    if (loading || isLoading) {
        return <Loading></Loading>
    }
   
    if (!user) {
        return <Navigate state={location.pathname} to="/login" replace />;
    }


     if(userData?.isBanned){

   return <Navigate to="/banned" replace />;
}

if (userData?.role !== "admin") {
    return <Navigate to="/unauthorized" replace />;
}
    return (
        <div>
            {children}
        </div>
    );
};

export default AdminRoute;