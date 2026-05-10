import {  useEffect } from "react";


const useTitle = (title) => {
    useEffect(() => {
        document.title = `${title} | Life Spark`;
    }, [title]);
};

export default useTitle;