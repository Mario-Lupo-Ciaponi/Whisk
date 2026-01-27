import {useEffect, useState, useRef } from "react";
import axios from "axios";
import PostSection from "../components/PostSection.jsx";
import "./HomePage.css";
import api from "../api/api.js";


const HomePage = () => {
    const [ posts, setPosts ] = useState([]);
    const BASE_URL = "posts/"

    // NOTE: This is purely for test purposes and it will change to check the real users city and groups!
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
            const response = await api.get(`${BASE_URL}?${query}=${userInfo[query]}`);
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

            <PostSection posts={posts} />
        </>
    );
}

export default HomePage;
