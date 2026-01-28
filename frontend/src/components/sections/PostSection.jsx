import PostCard from "../cards/PostCard.jsx";
import "./PostSection.css";

const PostSection = ({ posts }) => {
    console.log(posts)
    return (
        <section className="post-section">
            {posts.map((post) => {
                console.log(post)
                return (
                    <PostCard key={post.id} post={post} />
                )
            })}
        </section>
    )
}

export default PostSection;
