import { useState } from "react";
import axios from "axios";
import api from "../../api/api.js";
import "./PostForm.css";

function PostForm({ navigate }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [city, setCity] = useState("");

    async function createPost(event) {
        event.preventDefault();

        if (title && description && city) {
            try {
                await api.post("http://localhost:8000/api/posts/", {
                    title,
                    description,
                    city,
                });

                navigate("/");
            } catch(err) {
                console.log(err);
            }
        }
    }

    return (
        <div className="form-wrapper">
           <form className="create-post-form" onSubmit={createPost}>
                <label htmlFor="title">Title:</label>
                <input name="title" type="text" onChange={(event) => {
                    setTitle(event.target.value);
                }}/>

                <label htmlFor="description">Description:</label>
                <textarea name="description" cols="30" rows="10" onChange={(event) => {
                    setDescription(event.target.value);
                }}></textarea>

                <label htmlFor="city">City:</label>
                <input name="city" type="text" onChange={(event) => {
                    setCity(event.target.value);
                }}/>

                <button className="submit-btn">Submit</button>
            </form>
        </div>
    )
}

export default PostForm;
