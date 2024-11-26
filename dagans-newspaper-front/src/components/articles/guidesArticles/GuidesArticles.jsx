// Affichage des articles "GUIDES" sur la page d'accueil

import { useState, useEffect } from "react";
import { getPublicArticles } from "../../../services/publicArticleService";
import { Link } from "react-router-dom";
import "./guidesArticles.css";

export default function GuidesArticles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await getPublicArticles();
        const guidesArticles = data.filter(
          (article) => article.category === "Guides"
        );
        setArticles(guidesArticles);
        setLoading(false);
        // eslint-disable-next-line no-unused-vars
      } catch (err) {
        setError("Impossible de charger les articles 'Guides'");
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading)
    return <div className="loading">Chargement des articles Guides...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <section className="guides-articles-container">
      {articles.map((article) => (
        <article key={article._id} className="guides-article-card">
          <Link to={`/article/${article._id}`} className="guides-article-link">
            {article.images && article.images.length > 0 && (
              <img
                src={article.images[0]}
                alt={article.title}
                className="guides-article-image"
              />
            )}
            <div className="guides-article-content">
              <div className="guides-article-category">
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
