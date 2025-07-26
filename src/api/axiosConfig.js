import axios from 'axios';

const API_URL = import.meta.env.DEV
  ? 'http://localhost:8084' // URL para desenvolvimento local
  : 'https://backend-feira-de-trocas.onrender.com'; // URL para produção

const apiClient = axios.create({
  baseURL: API_URL,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
