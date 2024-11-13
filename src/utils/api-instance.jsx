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
let inactivityTimeout;

// Função para deslogar o usuário e remover os eventos
const logoutUser = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    window.location.href = "/login";
    clearTimeout(inactivityTimeout);
    removeInactivityListeners();
};

// Função para resetar o temporizador de inatividade apenas se o usuário estiver logado
const resetInactivityTimeout = () => {
    if (!localStorage.getItem('access_token')) return;
    clearTimeout(inactivityTimeout);
    inactivityTimeout = setTimeout(logoutUser, 10 * 60 * 3000); // 30 minutos
};

// Função para remover os listeners de inatividade
const removeInactivityListeners = () => {
    window.removeEventListener('mousemove', resetInactivityTimeout);
    window.removeEventListener('mousedown', resetInactivityTimeout);
    window.removeEventListener('keypress', resetInactivityTimeout);
    window.removeEventListener('scroll', resetInactivityTimeout);
    window.removeEventListener('touchstart', resetInactivityTimeout);
};

// Configurar eventos para monitorar a atividade do usuário
const initializeInactivityListeners = () => {
    window.addEventListener('mousemove', resetInactivityTimeout);
    window.addEventListener('mousedown', resetInactivityTimeout);
    window.addEventListener('keypress', resetInactivityTimeout);
    window.addEventListener('scroll', resetInactivityTimeout);
    window.addEventListener('touchstart', resetInactivityTimeout);
};

// Inicializar o temporizador e os eventos de inatividade somente se o usuário estiver logado
if (localStorage.getItem('access_token')) {
    initializeInactivityListeners();
    resetInactivityTimeout();
}

apiInstance.interceptors.response.use(
    response => {
        resetInactivityTimeout(); // Resetar o timer a cada resposta
        return response;
    },
    async error => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry && refreshAttempts < 3) {
            originalRequest._retry = true;
            refreshAttempts++;

            const refreshToken = localStorage.getItem('refresh_token');
            if (!refreshToken) {
                logoutUser();
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
                logoutUser();
            }
        }

        logoutUser();
        return Promise.reject(error);
    }
);

export default apiInstance;
