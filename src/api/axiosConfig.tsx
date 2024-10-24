import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;
// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: apiUrl,  // Your base URL
  timeout: 5000,  // Optional timeout for requests
});

// Request interceptor to add JWT token to all requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');  // Retrieve the token from localStorage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;  // Add token to headers
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;