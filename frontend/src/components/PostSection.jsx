import  { useState } from "react";
import PostCard from "./PostCard.jsx";
import "./PostSection.css";

function PostSection() {
    const [ posts, setPosts ] = useState([
        {
          title: "Lost Kitten",
          description: "Tiny gray kitten with white paws, last seen near Maple Street. Very shy but responds to 'Mittens'.",
          username: "cat_enthusiast",
          city: "Vratsa",
          id: crypto.randomUUID(),
        },
        {
          title: "Lost Golden Retriever",
          description: "Buddy, a friendly golden retriever, went missing near Central Park. He has a red collar with a name tag.",
          username: "animal_rescue_team",
          city: "Sofia",
          id: crypto.randomUUID(),
        },
        {
          title: "Missing Parrot",
          description: "A colorful African Grey parrot named Kiwi escaped from my balcony in downtown. Answers to 'Kiwi'.",
          username: "parrot_lover",
          city: "Varna",
          id: crypto.randomUUID(),
        },
    ]);

    return (
        <section className="post-section">
            {posts.map((post) => {
                return (
                    <PostCard post={post} key={post.id} />
                )
            })}
        </section>
    )
}

export default PostSection;
