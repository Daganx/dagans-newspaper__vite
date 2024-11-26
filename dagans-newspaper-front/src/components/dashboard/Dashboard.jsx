import { useState, useEffect } from "react";
import {
  getArticles,
  deleteArticle,
  createArticle,
  updateArticle,
} from "../../services/articleService";
import "./dashboard.css";

export default function Dashboard() {
  const [articles, setArticles] = useState([]);
  const [newArticle, setNewArticle] = useState({
    title: "",
    content: "",
    images: null,
    category: "",
  });
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
      setNewArticle({ title: "", content: "", images: null, category: "" }); // Réinitialise les champs du formulaire
    } catch (error) {
      console.error("Error creating article", error);
    } finally {
      setLoading(false);
    }
  };

  // Mettre à jour un article
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (
      !editingArticle.title ||
      !editingArticle.content ||
      !editingArticle.category
    ) {
      alert("Le titre, le contenu et la catégorie sont requis");
      return;
    }

    try {
      setLoading(true);
      const result = await updateArticle(editingArticle._id, {
        title: editingArticle.title,
        content: editingArticle.content,
        images: editingArticle.images,
        newImages: editingArticle.newImages,
        category: editingArticle.category,
      });
      setArticles((prev) =>
        prev.map((article) => (article._id === result._id ? result : article))
      );
      setEditingArticle(null);
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);
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

  const handleRemoveImage = (indexToRemove) => {
    setEditingArticle((prev) => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove),
    }));
  };

  return (
    <div>
      <h1 className="dashboard-title">Dashboard</h1>

      {/* Formulaire de création d'article */}
      <h2 className="dashboard-form-title">Create a New Article</h2>
      <form onSubmit={handleCreate} className="dashboard-form">
        <div className="dashboard-form-group">
          <label htmlFor="title" className="dashboard-label">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={newArticle.title}
            onChange={(e) =>
              setNewArticle({ ...newArticle, title: e.target.value })
            }
            placeholder="Enter title"
            className="dashboard-input"
          />
        </div>
        <div className="dashboard-form-group">
          <label htmlFor="content" className="dashboard-label">
            Content
          </label>
          <textarea
            id="content"
            value={newArticle.content}
            onChange={(e) =>
              setNewArticle({ ...newArticle, content: e.target.value })
            }
            placeholder="Enter content"
            className="dashboard-textarea"
          />
        </div>
        <div className="dashboard-form-group">
          <label htmlFor="category" className="dashboard-label">
            Category
          </label>
          <select
            id="category"
            value={newArticle.category}
            onChange={(e) =>
              setNewArticle({ ...newArticle, category: e.target.value })
            }
            required
            className="dashboard-select"
          >
            <option value="">Select a category</option>
            <option value="News">News</option>
            <option value="Guides">Guides</option>
            <option value="Projects">Projects</option>
          </select>
        </div>
        <div className="dashboard-form-group">
          <label htmlFor="images" className="dashboard-label">
            Images
          </label>
          <input
            type="file"
            id="images"
            multiple
            accept="image/*"
            onChange={(e) =>
              setNewArticle({ ...newArticle, images: e.target.files })
            }
            className="dashboard-file-input"
          />
        </div>
        <button type="submit" disabled={loading} className="dashboard-button">
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
            <div>
              <label htmlFor="category">Category</label>
              <select
                id="category"
                value={editingArticle.category}
                onChange={(e) =>
                  setEditingArticle({
                    ...editingArticle,
                    category: e.target.value,
                  })
                }
                required
              >
                <option value="">Select a category</option>
                <option value="News">News</option>
                <option value="Guides">Guides</option>
                <option value="Projects">Projects</option>
              </select>
            </div>
            {/* Affichage des images existantes */}
            <div>
              <h4>Images actuelles :</h4>
              {editingArticle.images &&
                editingArticle.images.map((image, index) => (
                  <div
                    key={index}
                    style={{ display: "inline-block", position: "relative" }}
                  >
                    <img
                      src={image}
                      alt={`${editingArticle.title} - image ${index + 1}`}
                      style={{ maxWidth: "200px", margin: "5px" }}
                    />
                    <button
                      onClick={() => handleRemoveImage(index)}
                      style={{
                        position: "absolute",
                        top: "5px",
                        right: "5px",
                        background: "red",
                        color: "white",
                        border: "none",
                        borderRadius: "50%",
                        width: "25px",
                        height: "25px",
                        cursor: "pointer",
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))}
            </div>

            {/* Input pour ajouter/modifier les images */}
            <div>
              <label htmlFor="updateImages">Modifier les images</label>
              <input
                type="file"
                id="updateImages"
                multiple
                accept="image/*"
                onChange={(e) =>
                  setEditingArticle({
                    ...editingArticle,
                    newImages: e.target.files,
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
      <h2 className="dashboard-articles-title">Existing Articles</h2>
      <div className="dashboard-articles-grid">
        {articles.map((article) => (
          <div key={article._id} className="dashboard-article-card">
            <h3>{article.title}</h3>
            <p>{article.content}</p>
            {article.images &&
              article.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${article.title} - image ${index + 1}`}
                  style={{ maxWidth: "200px", margin: "5px" }}
                />
              ))}
            <button onClick={() => handleDelete(article._id)}>Delete</button>
            <button onClick={() => handleEdit(article)}>Edit</button>
          </div>
        ))}
      </div>

      {/* Bouton de déconnexion */}
      <button className="logout-btn">
        <img
          onClick={handleLogout}
          width="50"
          height="50"
          src="https://img.icons8.com/carbon-copy/100/exit.png"
          alt="exit"
        />
      </button>
    </div>
  );
}
