import { useTranslation } from "react-i18next";
import { useLocation } from "react-router";
import { Helmet } from "react-helmet-async";
import PostCreateForm from "../../components/forms/PostCreateForm/PostCreateForm.jsx";
import "./CreatePostPage.css";

const CreatePostPage = ({ currentUser, navigate, errors, setErrors, baseUrl }) => {
  const { t } = useTranslation();
  const location = useLocation();

  const pageTitle = t("createPostPage.title");
  const pageUrl = `${baseUrl}/${location.pathname}`;

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta property="og:title" content={pageTitle} />
        <meta property="og:url" content={pageUrl}/>
      </Helmet>
      <div className="form-wrapper">
        <header className="create-post-header">
          <h1 className="create-post-title">{t("createPostPage.title")}</h1>
          <p className="create-post-description">
            {t("createPostPage.description")}
          </p>
        </header>
        <PostCreateForm
          currentUser={currentUser}
          navigate={navigate}
          errors={errors}
          setErrors={setErrors}
        />
      </div>
    </>
  );
};

export default CreatePostPage;
