import PostCard from "../../cards/PostCard/PostCard.jsx";
import "./PostSection.css";

const PostSection = ({ posts, currentUser, navigate }) => {
  console.log(posts);
  return (
    <section className="post-section">
      {posts.map((post) => {
        return (
          <PostCard
            key={post.id}
            post={post}
            currentUser={currentUser}
            navigate={navigate}
          />
        );
      })}
    </section>
  );
};

export default PostSection;
