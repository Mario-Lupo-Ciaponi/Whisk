import  { useState, useEffect } from "react";
import axios from "axios";
import PostCard from "./PostCard.jsx";
import "./PostSection.css";

function PostSection() {
    const [ posts, setPosts ] = useState([]);

    useEffect(() => {
        async function getPosts() {
            try {
                const response = await axios.get("api/posts/");
                setPosts(response.data)
            } catch (error) {
                console.log(error)
            }
        }

        getPosts();
    }, []);
    // !!! This is for test purposes
    // const userCity = "Vratsa";
    // const choice = "city";

    return (
        <section className="post-section">
            {posts.map((post) => {
                console.log(post)
                return (
                    <PostCard post={post} />
                )
            })}
        </section>
    )
}

export default PostSection;
