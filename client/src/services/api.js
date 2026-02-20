import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api', // Apontando para nosso backend
});

// Adicionar um interceptador de requisição para adicionar o token JWT aos cabeçalhos
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Adicionar um interceptador de resposta para lidar com erros 401 (token expirado/inválido)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Limpar armazenamento e redirecionar para login se não autorizado
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;
