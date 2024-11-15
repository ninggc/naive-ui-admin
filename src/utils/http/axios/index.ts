import axios from 'axios';

// Create an instance of axios
const axiosInstance = axios.create({
    // baseURL: 'http://192.168.71.71:8000', // Base URL for the API
    baseURL: 'http://localhost:8000', // Base URL for the API
    timeout: 60 * 1000 , // Request timeout
});

// Request interceptor
axiosInstance.interceptors.request.use(
    config => {
        // Add any custom headers or tokens here
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        // Handle request error here
        return Promise.reject(error);
    }
);

// Response interceptor
axiosInstance.interceptors.response.use(
    response => {
        // Handle response data here
        const responseData = response.data;
        if (responseData.code === 200) {
            return responseData.data;
        } else {
            return Promise.reject(new Error(responseData.message || 'Error'));
        }
    },
    error => {
        // Handle response error here
        if (error.response) {
            // Server responded with a status other than 200 range
            console.error('Response error:', error.response);
        } else if (error.request) {
            // Request was made but no response received
            console.error('Request error:', error.request);
        } else {
            // Something happened in setting up the request
            console.error('Error:', error.message);
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;