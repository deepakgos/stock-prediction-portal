import { config } from "@fortawesome/fontawesome-svg-core";
import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_BASE_API
const axiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
    }
})

// Request interceptor to add the access token to headers
axiosInstance.interceptors.request.use(
    function(config){
        console.log("Before Request Interceptor: ", config);
        const accessToken = localStorage.getItem('accessToken');
        if(accessToken){
            config.headers['Authorization'] = `Bearer ${accessToken}`; // Notice the space after Bearer
        }
        console.log("Modified Request Interceptor: ", config);
        return config;
    },
    function(error){
        return Promise.reject(error);
    })

// Response interceptor to handle 401 errors and refresh the token
axiosInstance.interceptors.response.use(
    function(response){
        return response;
    },
    // This function is called when there is an error response
    async function(error){
        const originalRequest = error.config; // The request that caused the error
        if(error.response.status == 401 && !originalRequest.retry){
            originalRequest.retry = true; // To prevent infinite loops
            // Try to refresh the token
            try{
                const refreshToken = localStorage.getItem('refreshToken');
                const response = await axiosInstance.post('/token/refresh/', {refresh: refreshToken})
                // console.log("New accessToken refreshed: ", response.data);
                localStorage.setItem('accessToken', response.data.access)
                originalRequest.headers['Authorization'] = `Bearer ${response.data.access}`;
                return axiosInstance(originalRequest); // Retry the original request with new token
            }catch(refreshError){
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                window.location.href = '/login'; // Redirect to login page
                return Promise.reject(refreshError);
            }
            
        }
    }
)
export default axiosInstance;