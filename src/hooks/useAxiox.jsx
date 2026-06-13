import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://shopsphere-server-2.onrender.com',
    // headers: {
    //     'Content-Type': 'application/json',
    // },
});

const useAxiox = () => {
    return axiosInstance;
};

export default useAxiox;