// Fichier pour afficher tout les articles via la route /all-articles

import { useState, useEffect } from "react";
import { getPublicArticles } from "../../../services/publicArticleService";
import { Link } from "react-router-dom";
import "./allArticles.css";

export default function AllArticles() {
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
    <section className="all-articles-container">
      {articles.map((article) => (
        <article key={article._id} className="all-articles-article-card">
          <Link
            to={`/article/${article._id}`}
            className="all-articles-article-link"
          >
            {article.images && article.images.length > 0 && (
              <img
                src={article.images[0]}
                alt={article.title}
                className="all-articles-article-image"
              />
            )}
            <p className="all-articles-article-category">{article.category}</p>
            <h2>{article.title}</h2>
            <p>{article.content.substring(0, 100)}...</p>
            <p className="article-date">
              Publié le{" "}
              {new Date(article.createdAt).toLocaleDateString("fr-FR")}
            </p>
          </Link>
        </article>
      ))}
    </section>
  );
}
