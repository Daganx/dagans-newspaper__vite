import BannerLogo from "../../assets/images/banner/ReactWithDaganBanner.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faLinkedinIn,
  faJsSquare,
} from "@fortawesome/free-brands-svg-icons";
import "./banner.css";

export default function Banner() {
  return (
    <section className="banner">
      <img src={BannerLogo} alt="Logo de ReactWithDagan"></img>
      <div className="banner-socials">
        <a
          href="https://www.github.com/daganx/"
          target="_blank"
          className="hover-underline hover-underline--yellow"
        >
          <FontAwesomeIcon
            icon={faGithub}
            className="hover-underline hover-underline--red"
          />
        </a>
        <a
          href="https://www.linkedin.com/in/letotdagan/"
          target="_blank"
          className="hover-underline hover-underline--blue"
        >
          <FontAwesomeIcon
            icon={faLinkedinIn}
            className="hover-underline hover-underline--red"
          />
        </a>
      </div>
      <h2>
        Vous retrouverez ici des{" "}
        <span className="banner-highlight banner-highlight-guides">Guides</span>
        , <span className="banner-highlight banner-highlight-news">News</span>{" "}
        et{" "}
        <span className="banner-highlight banner-highlight-projets">
          Projets
        </span>
        <br /> sur JS et ses Frameworks.
      </h2>

      <h3>
        Ce site vous propose des exemples{" "}
        <span className="banner-highlighted-word">concrets</span>
        <br />
        de
        <span className="banner-highlighted-word">frameworks</span> &
        bibliothèques <br />
        autour de
        <span>
          <FontAwesomeIcon icon={faJsSquare} />
        </span>
      </h3>
    </section>
  );
}
