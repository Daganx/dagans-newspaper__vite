import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPublicArticle } from "../../../services/publicArticleService";
import "./articleDetail.css";

export default function ArticleDetail() {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const data = await getPublicArticle(id);
        setArticle(data);
        if (data.images && data.images.length > 0) {
          setSelectedImage(data.images[0]);
        }
        // eslint-disable-next-line no-unused-vars
      } catch (err) {
        setError("Impossible de charger l'article");
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading)
    return <div className="loading">Chargement de l&apos;article...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!article) return <div className="error">Article non trouvé</div>;

  return (
    <div className="article-details">
      <button className="back-button-details" onClick={() => navigate(-1)}>
        ← Retour
      </button>

      <article className="article-content-details">
        <h1>{article.title}</h1>

        <div className="article-date-details">
          Publié le {new Date(article.createdAt).toLocaleDateString("fr-FR")}
        </div>

        {article.images && article.images.length > 0 && (
          <div className="article-image-details">
            <div className="article-image-container">
              <img
                src={selectedImage || article.images[0]}
                alt={article.title}
                className="main-image-details"
              />
            </div>

            {article.images.length > 1 && (
              <div className="article-image-details-thumbnails">
                {article.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${article.title} - image ${index + 1}`}
                    className={`thumbnail ${
                      selectedImage === image ? "selected" : ""
                    }`}
                    onClick={() => setSelectedImage(image)}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        <div className="article-text-details">
          {article.content.split("\n").map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </article>
    </div>
  );
}
