import { useState } from "react";
import ErrorList from "../ErrorList.jsx";
import api from "../../api/api.js";
import "./PostForm.css";

function PostForm({ navigate, errors, setErrors }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [city, setCity] = useState("");

    async function createPost(event) {
        event.preventDefault();

        if (title && description && city) {
            try {
                await api.post("posts/", {
                    title: title.trim(),
                    description: description.trim(),
                    city: city.trim(),
                });

                navigate("/");
            } catch(e) {
                if (e.response.status === 400) setErrors(e.response?.data);
            }
        }
    }

    return (
        <div className="form-wrapper">
           <form className="create-post-form" onSubmit={createPost}>
               { errors && <ErrorList errors={errors} /> }

               <div className="post-field">
                   <label htmlFor="title">Title:</label>
                    <input
                        name="title"
                        type="text"
                        onChange={(event) => {
                        setTitle(event.target.value);
                    }}/>
               </div>
               <div className="post-field">
                   <label htmlFor="description">Description:</label>
                    <textarea
                        name="description"
                        cols="30"
                        rows="10"
                        onChange={(event) => {
                        setDescription(event.target.value);
                    }}></textarea>
               </div>
               <div className="post-field">
                    <label htmlFor="city">City:</label>
                    <input
                        name="city"
                        type="text"
                        onChange={(event) => {
                        setCity(event.target.value);
                    }}/>
               </div>

               <button className="submit-btn">Submit</button>
            </form>
        </div>
    )
}

export default PostForm;
