import PostForm from "../components/forms/PostForm.jsx";

function CreatePostPage({ navigate, errors, setErrors }) {
    return (
        <>
            <PostForm navigate={navigate}  errors={errors} setErrors={setErrors} />
        </>
    )
}

export default CreatePostPage;
