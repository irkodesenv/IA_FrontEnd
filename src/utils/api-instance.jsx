import axios from 'axios'
import token_csrf from './token_csrf'

const apiInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_PATH_API,
    headers: {
        'X-CSRFToken': token_csrf,
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
    }
})

let refreshAttempts = 0;

apiInstance.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;
        
        if (error.response.status === 401 && !originalRequest._retry && refreshAttempts < 3) {
            originalRequest._retry = true;
            refreshAttempts++;

            const refreshToken = localStorage.getItem('refresh_token');
            if (!refreshToken) {
                window.location.href = "/login";
                return Promise.reject(error);
            }

            try {
                const response = await axios.post(`${process.env.REACT_APP_BASE_PATH_API}/v1/token/refresh/`, {
                    refresh: refreshToken
                });

                const newAccessToken = response.data.access;
                localStorage.setItem('access_token', newAccessToken);

                apiInstance.defaults.headers['Authorization'] = `Bearer ${newAccessToken}`;
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

                return apiInstance(originalRequest);
            } catch (refreshError) {
                console.error("Erro ao tentar renovar o token", refreshError);
                window.location.href = "/login";
            }
        }

        window.location.href = "/login";
        return Promise.reject(error);
    }
);

export default apiInstance