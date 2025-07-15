import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8084', 
});

export default api;
