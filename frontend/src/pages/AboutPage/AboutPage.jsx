import { useTranslation } from "react-i18next";
import { useLocation } from "react-router";
import { Helmet } from "react-helmet-async";
import MapImage from "../../assets/map-image.png";
import PawPet from "../../assets/paw-pet.jpg";
import HuggingPet from "../../assets/hugging-pet.jpg";
import "./AboutPage.css";

const AboutPage = ({ baseUrl }) => {
  const { t } = useTranslation();
  const location = useLocation();

  const pageTitle = t("about.pageTitle");
  const pageUrl = `${baseUrl}/${location}`;

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta property="og:title" content={pageTitle} />
        <meta property="og:url" content={pageUrl} />
      </Helmet>

      <section className="about-section">
        <div className="about-project">
          <article className="about-card">
            <div className="text-wrapper">
              <h2 className="title">{t("about.platformTitle")}</h2>

              <p className="description">{t("about.platformDescription")}</p>
            </div>
            <div className="image-container">
              <img className="card-image" src={MapImage} alt="map image" />
            </div>
          </article>

          <article className="about-card">
            <div className="text-wrapper">
              <h2 className="title">{t("about.whoTitle")}</h2>

              <p className="description">
                {t("about.whoIntro")}
                <ul className="about-list">
                  <li className="item">{t("about.who1")}</li>
                  <li className="item">{t("about.who2")}</li>
                  <li className="item">{t("about.who3")}</li>
                </ul>
                {t("about.whoEnding")}
              </p>
            </div>
            <div className="image-container left">
              <img className="card-image" src={PawPet} alt="map image" />
            </div>
          </article>

          <article className="about-card">
            <div className="text-wrapper">
              <h2 className="title">{t("about.whyTitle")}</h2>

              <p className="description">{t("about.whyDescription")}</p>
            </div>
            <div className="image-container">
              <img className="card-image" src={HuggingPet} alt="map image" />
            </div>
          </article>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
