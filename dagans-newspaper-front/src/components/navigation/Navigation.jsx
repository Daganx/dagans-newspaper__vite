import { Link, useLocation } from "react-router-dom";
import "./navigation.css";

export default function Navigation() {
  const location = useLocation();

  return (
    <>
      <nav className="navigation">
        {location.pathname !== "/" && (
          <Link to="/" className="accueil-btn">
            <img
              width="50"
              height="50"
              src="https://img.icons8.com/comic/100/home.png"
              alt="bouton page index"
            />
          </Link>
        )}
        <ul>
          <Link to="/articles/news">
            <li className="hover-underline hover-underline--red">NEWS</li>
          </Link>
          <Link to="/articles/guides">
            <li className="hover-underline hover-underline--green">GUIDES</li>
          </Link>
          <Link to="/articles/projects">
            <li className="hover-underline hover-underline--yellow">PROJETS</li>
          </Link>
        </ul>
      </nav>
    </>
  );
}
