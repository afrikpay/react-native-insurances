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
            config.headers['Authorization'] = `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3NDkwNDQ0NzcsImV4cCI6MTc0OTEzMDg3Nywicm9sZXMiOlsiUk9MRV9PV05FUiJdLCJ1c2VybmFtZSI6InN1cGVyS0o3IiwicGFzc3dvcmQiOiI3dTcwbzYiLCJwaW4iOiIiLCJ0ZXJtaW5hbElkZW50aWZpZXIiOiJtb2JpbGUiLCJ0ZXJtaW5hbFR5cGUiOiJtb2JpbGUiLCJ0ZXJtaW5hbFVzZXJBZ2VudCI6Ik1vemlsbGEvNS4wIChYMTE7IExpbnV4IHg4Nl82NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzEzNi4wLjAuMCBTYWZhcmkvNTM3LjM2IiwiaXBBZGRyZXNzIjoiMTI3LjAuMC4xIn0.lW0SE3E_ipwM9VVWeUs5Z8wbrBEXGRIf5JzD06CQQNoiexePUR-6IHdZlxiyPSa04aqD6X_E3ZRQ87LK8o_eLSKL5Q4OY3pxEDpxvPFNezxr84ty9VtxJ2s-Asg8EZeY_9Seo1lFPpbZfMh7Hp_Ivqvw6AP0sGboLcV0S7fBy8qfNkCzvZaQfE2-ZwBimuE_m3RPjiZpegENOb33PeLNm6e0U-_QsgVRummDHWm-nUGiaRp41TbMnsLDf3QGRPAkNOPY04SYj9tt0AwtkFefqGewBiz7eItnm2ZeXyilK6BcbCsnmByPKItvMfXOWko-WhrIjhYmYAO_mV9nCjmDew`;
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