import axios from 'axios';

// Create axios instance with custom config
let api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'https://03f0-2c0f-2a80-983-910-f298-39a5-e47a-acd2.ngrok-free.app/api',
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
            config.headers['Authorization'] = `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3NDk1NDEzNjcsImV4cCI6MTc0OTYyNzc2Nywicm9sZXMiOlsiUk9MRV9PV05FUiJdLCJ1c2VybmFtZSI6InN1cGVyS0o3IiwicGFzc3dvcmQiOiI3dTcwbzYiLCJwaW4iOiIiLCJ0ZXJtaW5hbElkZW50aWZpZXIiOiJtb2JpbGUiLCJ0ZXJtaW5hbFR5cGUiOiJtb2JpbGUiLCJ0ZXJtaW5hbFVzZXJBZ2VudCI6Ik1vemlsbGEvNS4wIChYMTE7IExpbnV4IHg4Nl82NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzEzNi4wLjAuMCBTYWZhcmkvNTM3LjM2IiwiaXBBZGRyZXNzIjoiMTI3LjAuMC4xIn0.ERRCjOwR7ImDzydelaNYzqcuB1k_j2KV5RP4ziYZIMDRKMFWohYUERBj9PaDUkvJZoyCcDwIGCVcdQhiacnQuD0tDgK1yzbaX-BB0jUJwTT2iEEyU9zWZG7Q6ZpVyZFpCeWty942iiGRztSrhdpxY86CQkXteDMZ7vW5jdXCHr_IUGyeJnjkFoYlEZ93_DUYNV8e6nqnC42YJxkupJYYHaRxs4Hzsu-VuoSD_nDQVE_jk_XBPbb15dn2X8Q73BO2XKb4o1IMyIq83MUouWwkebBD2EJCfKoIw-sBKGGyhmiFPRdB0C7btOaO5FBoIoiIiJsZR6O5mogSY-zuEDfwaw`;
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