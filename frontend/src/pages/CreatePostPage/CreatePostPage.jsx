import { useTranslation } from "react-i18next";
import { useLocation } from "react-router";
import { Helmet } from "react-helmet-async";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";
import PostCreateForm from "../../components/forms/PostCreateForm/PostCreateForm.jsx";
import "./CreatePostPage.css";

const CreatePostPage = ({
  currentUser,
  navigate,
  errors,
  setErrors,
  baseUrl,
}) => {
  const { t } = useTranslation();
  const location = useLocation();

  const pageTitle = t("createPostPage.title");
  const pageUrl = `${baseUrl}${location.pathname}`;

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta property="og:title" content={pageTitle} />
        <meta property="og:url" content={pageUrl} />
      </Helmet>
      <main className="create-post-page">
        <section className="create-post-page__card">
          <header className="create-post-page__header">
            <div className="create-post-page__header-icon" aria-hidden="true">
              <FontAwesomeIcon icon={faPaw} />
            </div>
            <div className="create-post-page__header-text">
              <h1 className="create-post-page__title">
                {t("createPostPage.title")}
              </h1>
              <p className="create-post-page__description">
                {t("createPostPage.description")}
              </p>
            </div>
          </header>

          <PostCreateForm
            currentUser={currentUser}
            navigate={navigate}
            errors={errors}
            setErrors={setErrors}
          />
        </section>
      </main>
    </>
  );
};

export default CreatePostPage;
