import "./navigation.css";

export default function Navigation() {
  return (
    <>
      <nav className="navigation">
        <ul>
          <a href="/">
            <li className="hover-underline hover-underline--red">NEWS</li>
          </a>
          <a href="/">
            <li className="hover-underline hover-underline--green">GUIDES</li>
          </a>
          <a href="/">
            <li className="hover-underline hover-underline--yellow">PROJETS</li>
          </a>
        </ul>
      </nav>
    </>
  );
}
