import { Link } from "react-router-dom";
import "./latestArticlesBanner.css";

export default function LatestArticlesBanner() {
  return (
    <section className="latest-articles-banner">
      <h2>Derniers Articles</h2>
      <Link to="/all-articles">
        <h3>Voir tout</h3>
      </Link>
    </section>
  );
}
