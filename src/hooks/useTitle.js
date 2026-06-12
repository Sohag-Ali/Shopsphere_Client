import {  useEffect } from "react";


const useTitle = (title) => {
    useEffect(() => {
        document.title = `${title} | ShopSphere`;
    }, [title]);
};

export default useTitle;