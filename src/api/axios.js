import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "/api/",
    timeout: 1000 * 60 * 5, // 5 min timeout
    transformResponse: (data) => JSON.parse(data),
})

export default axiosInstance;
