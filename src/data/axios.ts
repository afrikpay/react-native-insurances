import axios from 'axios';

// Create axios instance with custom config
let api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'https://e0b6-2c0f-2a80-983-910-ff5b-3d41-e31d-2f08.ngrok-free.app/api',
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
            config.headers['Authorization'] = `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3NDkxMTg0NjIsImV4cCI6MTc0OTIwNDg2Miwicm9sZXMiOlsiUk9MRV9PV05FUiJdLCJ1c2VybmFtZSI6InN1cGVyS0o3IiwicGFzc3dvcmQiOiI3dTcwbzYiLCJwaW4iOiIiLCJ0ZXJtaW5hbElkZW50aWZpZXIiOiJtb2JpbGUiLCJ0ZXJtaW5hbFR5cGUiOiJtb2JpbGUiLCJ0ZXJtaW5hbFVzZXJBZ2VudCI6Ik1vemlsbGEvNS4wIChYMTE7IExpbnV4IHg4Nl82NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzEzNi4wLjAuMCBTYWZhcmkvNTM3LjM2IiwiaXBBZGRyZXNzIjoiMTI3LjAuMC4xIn0.Ulw9UhpQVn9wkyT1TpXS6lmfP31OHyPiS_wl-pxLJkTJGU68R0Hqc8nZTuW_zhx_6TEIu_wIYl0ahzP0AmEELjnvJNm_q2-aAFYkXTfrNlb2BXGWDRvV2tuqnoeFVwO2iIUQ0EHlMLAr1JsjwMghD_oAOHyqd_hmv6reTPbyss9tRO0m2rFHLPxiOWWQ4kdVIqamDn3rFGBrkES95a83TWdGfxHNivOdclXRWH5Jm93YxZUF0Nj0VwEmLE7fKP72HhyznLUohzGpvU6xgugwbs-dr7PNzoMHxcrnaXypN7UNbkO6TjK894aY79t_9uoiq2EOIBOovoU_iu_YqelT2Q`;
        }
        // console.log(JSON.stringify(config, null, 2));
        return config;
    } catch (error) {
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