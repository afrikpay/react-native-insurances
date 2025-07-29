import axios from 'axios';
import Auth from '../utils/Auth';

// Create axios instance with custom config
let api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'https://bc5682893e04.ngrok-free.app/api',
    // timeout: 10000, // 10 seconds timeout
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Terminal-Identifier': 'mobile', // Default terminal identifier
    },
})

// Request interceptor
api.interceptors.request.use(async (config) => {
    // const currentUser = Cookies.get('user')
    // const userJson: User | null = currentUser ? JSON.parse(currentUser!) : null
    
    try {
        // Add token to all request except login route
        if (!config.url?.includes("login")){
            config.headers['Authorization'] = `Bearer ${await Auth.getToken()}`;
        }
        return config
    }
    catch (error) {
        return Promise.reject(error);
    }
})

// Response interceptor
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        // Handle specific error cases
        if (error.response?.status === 403) {
            console.error('Invalid token or access denied');
        }
        return Promise.reject(error);
    }
)

// API methods
export const apiClient = {
    get: <T>(url: string, headers?: Record<string, string>) =>
        api.get<T>(url, { headers }).then((res) => res.data),

    post: <T>(url: string, data: any, headers?: Record<string, string>) =>
        api.post<T>(url, data, { headers }).then((res) => res.data),

    put: <T>(url: string, data: any, headers?: Record<string, string>) =>
        api.put<T>(url, data, { headers }).then((res) => res.data),

    delete: <T>(url: string, headers?: Record<string, string>) =>
        api.delete<T>(url, { headers }).then((res) => res.data),
}

export default api;