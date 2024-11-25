import { useEffect, useState } from "react";
import { getPublicArticles } from "../../../services/publicArticleService";
import { Link } from "react-router-dom";
import "./newsArticles.css";

export default function NewsArticles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await getPublicArticles();
        const newsArticles = data.filter(
          (article) => article.category === "News"
        );
        setArticles(newsArticles);
        setLoading(false);
        // eslint-disable-next-line no-unused-vars
      } catch (err) {
        setError("Impossible de charger les articles 'News'");
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  if (loading)
    return <div className="loading">Chargement des articles News...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <section className="news-articles-container">
      {articles.map((article) => (
        <article key={article._id} className="news-article-card">
          <Link to={`/article/${article._id}`} className="news-article-link">
            {article.images && article.images.length > 0 && (
              <img
                src={article.images[0]}
                alt={article.title}
                className="news-article-image"
              />
            )}
            <div className="news-article-content">
              <div className="news-article-category">
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
