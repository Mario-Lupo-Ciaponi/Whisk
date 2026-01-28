import {useEffect, useState } from "react";
import PostSection from "../components/sections/PostSection.jsx";
import NoResult from "../components/NoResult.jsx";
import api from "../api/api.js";
import "./HomePage.css";

const HomePage = () => {
    const [ posts, setPosts ] = useState([]);
    const BASE_URL = "posts/"

    // NOTE: This is purely for test purposes, and it will change to check the real users city and groups!
    const userInfo = {
        city: "Vratsa",
    }

    const getPosts = async () => {
        try {
            const response = await api.get(BASE_URL);
            setPosts(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const filterPosts = async(query) => {
        try {
            const response = await api.get(BASE_URL, {
                params: {
                    [query]: userInfo[query],
                }
            });
            setPosts(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getPosts();
    }, []);

    const filterFeed = async(event) => {
        const selectValue = event.target.value;

        if (selectValue === "all") await getPosts();
        else await filterPosts(selectValue);
    }

    return (
        <>
            <title>Whisk</title>

            <div className="feed-container">
                <select
                    onChange={filterFeed}
                    name="feed-select"
                    className="feed-select">
                    <option value="all">All</option>
                    <option value="groups">Groups</option>
                    <option value="city">City</option>
                </select>
            </div>

            {posts.length ? <PostSection posts={posts} /> : <NoResult />}
        </>
    );
}

export default HomePage;
