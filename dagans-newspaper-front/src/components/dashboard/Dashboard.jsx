import { useState, useEffect } from "react";
import {
  getArticles,
  deleteArticle,
  createArticle,
  updateArticle,
} from "../../services/articleService";

const Dashboard = () => {
  const [articles, setArticles] = useState([]);
  const [newArticle, setNewArticle] = useState({ title: "", content: "" });
  const [editingArticle, setEditingArticle] = useState(null);
  const [loading, setLoading] = useState(false);

  // Récupération des articles au chargement de la page
  useEffect(() => {
    const fetchArticles = async () => {
      const data = await getArticles();
      setArticles(data);
    };
    fetchArticles();
  }, []);

  // Créer un article
  const handleCreate = async (e) => {
    e.preventDefault();

    if (!newArticle.title || !newArticle.content) {
      alert("Both title and content are required.");
      return;
    }

    try {
      setLoading(true);
      const createdArticle = await createArticle(newArticle); // Appel de la fonction createArticle
      setArticles((prev) => [createdArticle, ...prev]); // Ajoute le nouvel article au début de la liste
      setNewArticle({ title: "", content: "" }); // Réinitialise les champs du formulaire
    } catch (error) {
      console.error("Error creating article", error);
    } finally {
      setLoading(false);
    }
  };

  // Mettre à jour un article
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editingArticle.title || !editingArticle.content) {
      alert("Both title and content are required.");
      return;
    }

    try {
      setLoading(true);
      const updatedArticle = await updateArticle(
        editingArticle._id,
        editingArticle
      );
      setArticles((prev) =>
        prev.map((article) =>
          article._id === updatedArticle._id ? updatedArticle : article
        )
      );
      setEditingArticle(null); // Fermer le formulaire de mise à jour
    } catch (error) {
      console.error("Error updating article", error);
    } finally {
      setLoading(false);
    }
  };

  // Supprimer un article
  const handleDelete = async (id) => {
    await deleteArticle(id);
    setArticles((prev) => prev.filter((article) => article._id !== id));
  };

  // Déconnexion de l'utilisateur
  const handleLogout = () => {
    localStorage.removeItem("token"); // Supprimer le token du localStorage
    window.location.href = "/login"; // Rediriger vers la page de login
  };

  // Sélectionner l'article à mettre à jour
  const handleEdit = (article) => {
    setEditingArticle(article);
  };

  return (
    <div>
      <h1>Dashboard</h1>

      {/* Formulaire de création d'article */}
      <h2>Create a New Article</h2>
      <form onSubmit={handleCreate}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={newArticle.title}
            onChange={(e) =>
              setNewArticle({ ...newArticle, title: e.target.value })
            }
            placeholder="Enter title"
          />
        </div>
        <div>
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={newArticle.content}
            onChange={(e) =>
              setNewArticle({ ...newArticle, content: e.target.value })
            }
            placeholder="Enter content"
          />
        </div>
        <div>
          <label htmlFor="image">Image</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={(e) =>
              setNewArticle({ ...newArticle, image: e.target.files[0] })
            }
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Article"}
        </button>
      </form>

      {/* Formulaire de mise à jour d'article (si un article est en cours d'édition) */}
      {editingArticle && (
        <div>
          <h2>Update Article</h2>
          <form onSubmit={handleUpdate}>
            <div>
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                value={editingArticle.title}
                onChange={(e) =>
                  setEditingArticle({
                    ...editingArticle,
                    title: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label htmlFor="content">Content</label>
              <textarea
                id="content"
                value={editingArticle.content}
                onChange={(e) =>
                  setEditingArticle({
                    ...editingArticle,
                    content: e.target.value,
                  })
                }
              />
            </div>
            <button type="submit" disabled={loading}>
              {loading ? "Updating..." : "Update Article"}
            </button>
          </form>
        </div>
      )}

      {/* Affichage des articles existants */}
      <h2>Existing Articles</h2>
      {articles.map((article) => (
        <div key={article._id}>
          <h3>{article.title}</h3>
          <p>{article.content}</p>
          {article.image && (
            <img
              src={article.image}
              alt={article.title}
              style={{ maxWidth: "100%" }}
            />
          )}
          <button onClick={() => handleDelete(article._id)}>Delete</button>
          <button onClick={() => handleEdit(article)}>Edit</button>
        </div>
      ))}

      {/* Bouton de déconnexion */}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
