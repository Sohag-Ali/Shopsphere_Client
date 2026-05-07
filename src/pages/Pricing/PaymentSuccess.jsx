import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useEffect } from "react";
import {  useQueryClient } from "@tanstack/react-query";


const PaymentSuccess = () => {

  const { user } = useAuth();

   const axiosSecure = useAxiosSecure();

   const navigate = useNavigate();
     const queryClient = useQueryClient();

   useEffect(() => {

      const updatePremiumUser = async() => {

         const res = await axiosSecure.patch(
            `/users/premium/${user.email}`
         );

         console.log(res.data);
           await queryClient.invalidateQueries(['user']);

         navigate('/');
      };

      if(user?.email){
         updatePremiumUser();
      }

   }, [user, axiosSecure, navigate, queryClient]);

    return (
       <div className="min-h-screen flex items-center justify-center">

      <div className="text-center">

        <h1 className="text-5xl font-bold text-green-500">
          Payment Successful 🎉
        </h1>

        <p className="mt-4">
          You are now a Premium Member.
        </p>

      </div>

    </div>
  );
};


export default PaymentSuccess;