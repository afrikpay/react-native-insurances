import axios from 'axios';

// Create axios instance with custom config
let api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'https://796f-2c0f-2a80-983-910-c2d-d7ee-ce6a-9e11.ngrok-free.app/api',
    // timeout: 10000, // 10 seconds timeout
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Terminal-Identifier': 'mobile', // Default terminal identifier
    },
});

// Request interceptor
api.interceptors.request.use(async (config) => {
    // const currentUser = Cookies.get('user');
    // const userJson: User | null = currentUser ? JSON.parse(currentUser!) : null
    
    try {
        // Add token to all request except login route
        if (!config.url?.includes("login")){
            config.headers['Authorization'] = `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3NTE4NzYyNjksImV4cCI6MTc1MTk2MjY2OSwicm9sZXMiOlsiUk9MRV9PV05FUiJdLCJ1c2VybmFtZSI6InN1cGVyS0o3IiwicGFzc3dvcmQiOiI3dTcwbzYiLCJwaW4iOiIiLCJ0ZXJtaW5hbElkZW50aWZpZXIiOiJtb2JpbGUiLCJ0ZXJtaW5hbFR5cGUiOiJtb2JpbGUiLCJ0ZXJtaW5hbFVzZXJBZ2VudCI6Ik1vemlsbGEvNS4wIChYMTE7IExpbnV4IHg4Nl82NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzEzOC4wLjAuMCBTYWZhcmkvNTM3LjM2IiwiaXBBZGRyZXNzIjoiMTI3LjAuMC4xIn0.dtfh4-npfOwwWnyP7HDXGqQ8frhk5KEsRrHgtci1502yCEPOsq067UN5NXzbgzrAYM8E8a_-kX8Hm0T_3vTgUMLdWXUogAPPiiRlklnZDQt28lRP-IOx8_wpnY-ft8Z70JqXS3JdsFgaFe0BVH9yr61k8bm_9hD3XzGCKJo0OkI5XTrJ1SQqpkvMwavoM1jp_qbZg7FyrK1_MvAg9c_FCghNqcHkifbSpK62ubL6OGN-od9QVsG8iZUuAb0VhKCU57rwAIpOTdWy73KFzhBNHGFQyQgUC9wia-bUV3yn8MCGyIuHSDmURIQmcDlovYnkCbXcASRp5gGVjk0CV_QoKg`;
        }
        // console.log(JSON.stringify(config, null, 2));
        return config;
    }
    catch (error) {
        return Promise.reject(error);
    }
});

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
);

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
};

export default api;