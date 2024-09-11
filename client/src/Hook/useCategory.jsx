import { useEffect, useState } from "react";
import axiosPublic from "./useAxiosPublic";

const useCategory = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    console.log(categories)

    const fetchCategory = async () => {
        try {
            const res = await axiosPublic.get("/category");
            setCategories(res.data); 
        } catch (error) {
            console.error("Error fetching categories:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategory();
    }, []);

    return [categories, loading];
};

export default useCategory;
