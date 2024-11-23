import "./footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-socials">
        <a
          href="https://www.linkedin.com/in/letotdagan/"
          target="newBlank"
          className="hover-underline hover-underline--blue"
        >
          LINKEDIN
        </a>
        <a
          href="https://github.com/Daganx"
          target="newBlank"
          className="hover-underline hover-underline--yellow"
        >
          GITHUB
        </a>
      </div>
    </footer>
  );
}
