import PostCard from "../cards/PostCard.jsx";
import "./PostSection.css";

const PostSection = ({ posts, currentUser }) => {
  console.log(posts);
  return (
    <section className="post-section">
      {posts.map((post) => {
        console.log(post);
        return <PostCard key={post.id} post={post} currentUser={currentUser} />;
      })}
    </section>
  );
};

export default PostSection;
