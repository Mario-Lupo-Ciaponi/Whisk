import  { useState, useEffect } from "react";
import axios from "axios";
import PostCard from "./PostCard.jsx";
import NoResult from "./NoResult.jsx";
import NoResultImage from "../assets/no-result-search.svg";
import "./PostSection.css";

function PostSection({ posts }) {

    return (
        <>
            {posts && posts.length > 0 ?
                <section className="post-section">
                    {posts.map((post) => {
                        console.log(post)
                        return (
                            <PostCard post={post} />
                        )
                    })}
                </section>

                :

                <NoResult />
            }
        </>
    )
}

export default PostSection;
