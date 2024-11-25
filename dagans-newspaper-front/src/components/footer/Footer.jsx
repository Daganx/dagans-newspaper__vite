import "./footer.css";

export default function Footer() {
  return (
    <div className="footer">
      <p>
        Developed By
        <br /> Dagan Letot
      </p>
      <ul>
        <li>
          <a
            href="https://www.linkedin.com/in/letotdagan/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover-underline hover-underline--green"
          >
            LINKEDIN
          </a>
        </li>
        <li>
          <a
            href="https://www.github.com/daganx"
            target="_blank"
            rel="noopener noreferrer"
            className="hover-underline hover-underline--red"
          >
            GITHUB
          </a>
        </li>
      </ul>
      <p>
        2024. DL<br></br>
        <a>Back to Top ↑</a>
      </p>
    </div>
  );
}
