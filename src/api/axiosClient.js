import axios from 'axios';

// Cambia esta URL por la URL de tu app en DigitalOcean o localhost
const API_BASE_URL = import.meta.env.VITE_API_URL;

export const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


// Interceptor para adjuntar automáticamente el Token de DRF en las cabeceras
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('pacademy_token');
  if (token && config.headers) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});
