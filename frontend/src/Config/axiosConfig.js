import axios from "axios";

//create an axios instance
const api = axios.create({
    baseURL: process.env.API_GATEWAY_URL || "http://localhost:5000",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401){
            // Handle unauthorized access
            try{
                //call refresh token endpoint
                const response = await api.post("/auth/refresh");
                //update access token
                api.defaults.headers.common["Authorization"] = `Bearer ${response.data.accessToken}`;
                //retry original request
                return api.request(error.config);
            }catch (err){
                console.error("Refresh token failed", err);
                window.location.href = "/login"; // Redirect to login page
            }
        }
        return Promise.reject(error);
    }
);

export default api;
