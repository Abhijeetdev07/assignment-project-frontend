import axios from 'axios';

// Base URL for the DummyJSON API
// We use an environment variable for flexibility, but fallback to the hardcoded URL for this exercise.
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://dummyjson.com';

/**
 * Axios instance configured for the application.
 * This instance should be used for all API requests to ensure consistent configuration
 * (base URL, timeouts, headers).
 */
const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000, // 10 seconds timeout is reasonable for most requests
});

/**
 * Request Interceptor
 * 
 * This is where we can comfortably attach authentication tokens to every request.
 * For now, we'll just leave a placeholder or simple logging.
 */
api.interceptors.request.use(
    (config) => {
        // TODO: Attach Bearer token from Zustand/LocalStorage here when auth is implemented.
        // const token = localStorage.getItem('token');
        // if (token) {
        //   config.headers.Authorization = `Bearer ${token}`;
        // }
        return config;
    },
    (error) => {
        // Handle request errors (e.g., network issues before sending)
        return Promise.reject(error);
    }
);

/**
 * Response Interceptor
 * 
 * Global error handling happens here. If we get a 401 (Unauthorized),
 * we might want to redirect to login or clear the session.
 */
api.interceptors.response.use(
    (response) => {
        // Any status code within the range of 2xx triggers this function
        return response;
    },
    (error) => {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('API Error:', error.response.data);

            // Example: Handle 401 Unauthorized globally
            if (error.response.status === 401) {
                // Redirect to login or clear auth state
                // window.location.href = '/login'; 
            }
        } else if (error.request) {
            // The request was made but no response was received
            console.error('Network Error:', error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error:', error.message);
        }

        return Promise.reject(error);
    }
);

export default api;
