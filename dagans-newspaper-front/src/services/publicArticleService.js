// Fichier de service pour les articles côté ADMIN //
import axiosInstance from "./axiosInstance";

export const getPublicArticles = async () => {
  try {
    const { data } = await axiosInstance.get("/articles/public");
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération des articles:", error);
    throw error;
  }
};

export const getPublicArticle = async (id) => {
  try {
    const { data } = await axiosInstance.get(`/articles/public/${id}`);
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération de l'article:", error);
    throw error;
  }
};
