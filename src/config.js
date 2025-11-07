const API_BASE_URL = import.meta.env.PROD
  ? import.meta.env.VITE_API_LIVE     // Render backend
  : import.meta.env.VITE_API_LOCAL;   // Local backend

export default API_BASE_URL;
