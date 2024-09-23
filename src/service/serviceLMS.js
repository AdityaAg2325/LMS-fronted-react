import axios from 'axios'
const BASE_URL = process.env.REACT_APP_API_BASE_URL || `http://localhost:8080`

const app = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true,
});


// Request Interceptor
app.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authtoken');
        if (Boolean(token)) {
            config.headers['Authorization'] = token;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor
app.interceptors.response.use(
    (response) => response,
    (error) => {
        console.log(error);
        
        if (error.response && error.response.status === 401) {
            if (error?.config?.url !== '/api/login' && error?.config?.url !== '/api/current-user') {
                window.location.href = '/';
            }
        }
        return Promise.reject(error);
    }
);

export default app;