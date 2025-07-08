import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE==='development' ? 'http://localhost:8000/api' : import.meta.env.VITE_API_URL,
    withCredentials: true,
})

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth-token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});