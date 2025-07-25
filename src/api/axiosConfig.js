import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://backend-feira-de-trocas.onrender.com',
});

export default apiClient;