import axios from 'axios';

// Configuración central de Axios para el consumo de FakeStore API
const api = axios.create({
  baseURL: 'https://fakestoreapi.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor opcional para manejar errores globales de la API
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Error en la petición a FakeStore API:', error);
    return Promise.reject(error);
  }
);

export default api;
