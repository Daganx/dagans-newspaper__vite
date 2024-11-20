import axiosInstance from "./axiosInstance";

export const getArticles = async () => {
  try {
    const { data } = await axiosInstance.get("/articles"); 
    return data;
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw error;
  }
};

export const createArticle = async (article) => {
  try {
    const { data } = await axiosInstance.post("/articles", article); 
    return data;
  } catch (error) {
    console.error("Error creating article", error);
    throw error;
  }
};

export const updateArticle = async (id, article) => {
  try {
    const { data } = await axiosInstance.put(`/articles/${id}`, article); 
    return data;
  } catch (error) {
    console.error("Error updating article", error);
    throw error;
  }
};

export const deleteArticle = async (id) => {
  try {
    await axiosInstance.delete(`/articles/${id}`); 
    // Code pour mettre à jour l'UI après suppression
  } catch (error) {
    console.error("Error deleting article", error);
  }
};
