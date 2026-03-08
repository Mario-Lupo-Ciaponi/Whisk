import { useTranslation } from "react-i18next";
import PostCreateForm from "../../components/forms/PostCreateForm/PostCreateForm.jsx";
import "./CreatePostPage.css";

const CreatePostPage = ({ currentUser, navigate, errors, setErrors }) => {
  const { t } = useTranslation();
  return (
    <div className="form-wrapper">
      <title>{t("createPostPage.title")}</title>
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
  );
};

export default CreatePostPage;
