import axios from "axios";

// const axiosPublic=axios.create({
//     baseURL:'https://y-gold-two.vercel.app/'
// })

const axiosPublic=axios.create({
    baseURL:'http://localhost:5000/'
})

const useAxiosPublic = () => {
    return axiosPublic
};

export default useAxiosPublic;