import PostCard from "../../cards/PostCard/PostCard.jsx";
import "./PostSection.css";

const PostSection = ({ posts, currentUser, navigate, setIsFilterVisible }) => {
  return (
    <section className="post-section">
      {posts.map((post) => {
        return (
          <PostCard
            key={post.id}
            post={post}
            currentUser={currentUser}
            navigate={navigate}
            setIsFilterVisible={setIsFilterVisible}
          />
        );
      })}
    </section>
  );
};

export default PostSection;
