import BannerLogo from "../../assets/images/banner/ReactWithDaganBanner.png";
import "./banner.css";

export default function Banner() {
  return (
    <section className="banner">
      <img src={BannerLogo}></img>
      <h2>
        Vous retrouverez ici des Guides, News et Projets
        <br /> sur JS et ses Frameworks.
      </h2>
      <h3>
        J&apos;ai crée ce site afin de vous proposez des exemples concret
        <br />
        de l&apos;utilisation de frameworks & bibliothèques autour de JS.
      </h3>
    </section>
  );
}
