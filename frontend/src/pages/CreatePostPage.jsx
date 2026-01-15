import PostCreateForm from "../components/forms/PostCreateForm.jsx";

function CreatePostPage({ navigate, errors, setErrors }) {
    return (
        <>
            <PostCreateForm navigate={navigate} errors={errors} setErrors={setErrors} />
        </>
    )
}

export default CreatePostPage;
