import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const getPublicArticles = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/articles/public`);
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération des articles:", error);
    throw error;
  }
};

export const getPublicArticle = async (id) => {
  try {
    const { data } = await axios.get(`${API_URL}/articles/public/${id}`);
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération de l'article:", error);
    throw error;
  }
}; 