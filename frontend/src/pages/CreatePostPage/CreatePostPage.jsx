import PostCreateForm from "../../components/forms/PostCreateForm/PostCreateForm.jsx";
import "./CreatePostPage.css";

const CreatePostPage = ({ currentUser, navigate, errors, setErrors }) => {
  return (
    <div className="form-wrapper">
      <header className="create-post-header">
        <h1 className="create-post-title">Create Post</h1>
        <p className="create-post-description">
          Share as much detail as possible to help neighbors identify your pet.
          Mention unique markings, the color of their collar, their temperament
          (are they shy or friendly?), and exactly where they were last seen.
          Every detail helps bring them home!
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
