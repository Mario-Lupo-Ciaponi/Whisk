import PostForm from "../components/forms/PostForm.jsx";

function CreatePostPage({ navigate }) {
    return (
        <>
            <PostForm navigate={navigate}  />
        </>
    )
}

export default CreatePostPage;
