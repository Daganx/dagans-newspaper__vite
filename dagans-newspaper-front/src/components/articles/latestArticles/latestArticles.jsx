import { useState, useEffect } from "react";
import { getPublicArticles } from "../../../services/publicArticleService";
import { Link } from "react-router-dom";
import "./latestArticles.css";

// Affichage des 6 derniers articles sur la page index
export default function ArticlesList() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await getPublicArticles();
        setArticles(data);
        setLoading(false);
        // eslint-disable-next-line no-unused-vars
      } catch (err) {
        setError("Impossible de charger les articles");
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) return <div className="loading">Chargement des articles...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <section className="articles-container">
      {articles.slice(0, 6).map((article) => (
        <article key={article._id} className="article-card">
          <Link to={`/article/${article._id}`} className="article-link">
            <figure className="article-images">
              {article.images && article.images.length > 0 && (
                <img
                  src={article.images[0]}
                  alt={article.title}
                  className="main-image"
                />
              )}
            </figure>
            <div className="article-content">
              <div className="article-category">
                <p>{article.category}</p>
              </div>
              <h2>{article.title}</h2>
              <p>{article.content.substring(0, 200)}...</p>
              <div className="article-footer">
                <span className="article-date">
                  {new Date(article.createdAt).toLocaleDateString("fr-FR")}
                </span>
              </div>
            </div>
          </Link>
        </article>
      ))}
    </section>
  );
}
