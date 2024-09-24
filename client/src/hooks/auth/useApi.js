import axios from 'axios';

const useApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});


export default useApi