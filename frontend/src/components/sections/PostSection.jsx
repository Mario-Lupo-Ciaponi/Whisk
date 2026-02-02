import PostCard from "../cards/PostCard.jsx";
import "./PostSection.css";

const PostSection = ({ posts, currentUser, navigate }) => {
  console.log(posts);
  return (
    <section className="post-section">
      {posts.map((post) => {
        console.log(post);
        return <PostCard key={post.id} post={post} currentUser={currentUser} navigate={navigate} />;
      })}
    </section>
  );
};

export default PostSection;
