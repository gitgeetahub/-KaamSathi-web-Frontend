import axios from "axios";

const configuredApiBase =
  import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || "";
const normalizedApiBase = configuredApiBase
  .trim()
  .replace(/\/+$/, "")
  .replace(/\/api$/i, "");
const apiBaseUrl = normalizedApiBase
  ? `${normalizedApiBase}/api`
  : import.meta.env.DEV
    ? "/api"
    : "https://kaamsathi-api-backend.onrender.com/api";

const api = axios.create({
baseURL: apiBaseUrl,
headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
const token = localStorage.getItem("kaamsathi_token");
if (token) {
config.headers.Authorization = `Bearer ${token}`;
}
return config;
});

export default api;