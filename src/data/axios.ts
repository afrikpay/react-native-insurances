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
})

// Request interceptor
api.interceptors.request.use(async (config) => {
    // const currentUser = Cookies.get('user');
    // const userJson: User | null = currentUser ? JSON.parse(currentUser!) : null
    
    try {
        // Add token to all request except login route
        if (!config.url?.includes("login")){
            config.headers['Authorization'] = `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3NTE5ODI3NTEsImV4cCI6MTc1MjA2OTE1MSwicm9sZXMiOlsiUk9MRV9PV05FUiJdLCJ1c2VybmFtZSI6InN1cGVyS0o3IiwicGFzc3dvcmQiOiI3dTcwbzYiLCJwaW4iOiIiLCJ0ZXJtaW5hbElkZW50aWZpZXIiOiJtb2JpbGUiLCJ0ZXJtaW5hbFR5cGUiOiJtb2JpbGUiLCJ0ZXJtaW5hbFVzZXJBZ2VudCI6Ik1vemlsbGEvNS4wIChYMTE7IExpbnV4IHg4Nl82NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzEzOC4wLjAuMCBTYWZhcmkvNTM3LjM2IiwiaXBBZGRyZXNzIjoiMTI3LjAuMC4xIn0.Czps5Z-BvrpsjN5fHx4c4m9qb_MUgypLESya6Shm2Uo8b3ZWhXcMjkfEUTBzVrsJGky98QQZsnPq1A1kdKBvCRU_2VGQegROc8Goi00I0HAYtwQGKSW3yskU7W2JO0A06hglSrLPmzxt_cUZ9tF7siJ57v4buY_lDIIDbyh0vZ20UD846lDpy6yn6zttqeUj5l3t_v3MTcsSAzQPAS4MqqF_IBSWLG-RhoPg1XdSyrb4cZap4XJLE-jGsmIoFWRIKnMcwFUW7qT0z11NzeecNG6RR3coen-pLdM8CRZleDuzxOMwvEULZQ5YB8x46GX0psgmdAZhY60jzntiJzUfrQ`;
        }
        // console.log(JSON.stringify(config, null, 2));
        return config;
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