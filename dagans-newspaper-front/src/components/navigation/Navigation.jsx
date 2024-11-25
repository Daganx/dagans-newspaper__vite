import "./navigation.css";
import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <>
      <nav className="navigation">
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
