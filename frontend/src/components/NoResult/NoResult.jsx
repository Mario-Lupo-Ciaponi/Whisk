import { useTranslation } from "react-i18next";
import NoResultImage from "../../assets/no-result-image.svg";
import "./NoResult.css";

const NoResult = ({ type }) => {
  const { t } = useTranslation();

  const notFoundTypes = {
    post: {
      title: t("noResult.post.title"),
      description: t("noResult.post.description"),
    },
    user: {
      title: t("noResult.user.title"),
      description: t("noResult.user.description"),
    },
    notifications: {
      title: t("noResult.notifications.title"),
      description: t("noResult.notifications.description"),
    },
  };

  return (
    <div className="empty-state">
      <img className="illustration" src={NoResultImage} alt="no result image" />

      <header className="text-wrapper">
        <h2 className="empty-title">{notFoundTypes[type].title}</h2>
        <p className="empty-description">{notFoundTypes[type].description}</p>
      </header>
    </div>
  );
};

export default NoResult;
