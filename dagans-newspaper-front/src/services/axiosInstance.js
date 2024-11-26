import axios from "axios";

// Créer une instance d'Axios avec la configuration de base
const axiosInstance = axios.create({
  baseURL: "http://localhost:5001/api", // URL de base du backend
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercepteur pour ajouter le token à chaque requête
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Récupérer le token du localStorage
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // Ajouter le token dans l'en-tête
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
