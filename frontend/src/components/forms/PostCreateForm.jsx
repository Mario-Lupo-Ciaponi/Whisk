import {useEffect, useState} from "react";
import ErrorList from "../ErrorList.jsx";
import api from "../../api/api.js";
import "./PostCreateForm.css";

const PostCreateForm = ({ navigate, errors, setErrors }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState("");
    const [image, setImage] = useState(null);

    const addCities = async () => {
        const response = await api.get("cities/");

        console.log(response.data)

        setCities(response.data);
    }

    const createPost = async (event) => {
        event.preventDefault();

        if (!title || !description || !city || !image) {
            setErrors({ detail: "All fields are required." })
            return;
        }

        const formData = new FormData();

        formData.append("title", title.trim())
        formData.append("description", description.trim())
        formData.append("city", selectedCity)
        formData.append("image", image)

        try {
            await api.post("posts/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });

            navigate("/");
        } catch(e) {
            if (e.response?.status === 400){
                setErrors(e.response.data);
            } else if (e.response?.status === 401){
                navigate("login/");
            }
        }
    }

    useEffect(() => {
        addCities();
    }, []);

    return (
        <div className="form-wrapper">
           <form className="create-post-form" onSubmit={createPost}>
               { errors && <ErrorList errors={errors} /> }

               <div className="post-field">
                   <label className="post-label" htmlFor="title">Title:</label>
                   <input
                        id="title"
                        className="post-input"
                        name="title"
                        type="text"
                        onChange={(event) => {
                        setTitle(event.target.value);
                    }}/>
               </div>
               <div className="post-field">
                   <label className="post-label" htmlFor="description">Description:</label>
                   <textarea
                        id="description"
                        className="post-input textarea"
                        name="description"
                        cols="30"
                        rows="5"
                        onChange={(event) => {
                        setDescription(event.target.value);
                    }}></textarea>
               </div>
               <div className="post-field">
                   <label className="post-label" htmlFor="city">City:</label>

                   <select
                       name="city"
                       id="city"
                       className="post-input select"
                       onChange={event => {
                           setSelectedCity(event.target.value);
                       }}
                   >
                       <option disabled selected value> -- select a city -- </option>
                       {cities.map(city => {
                           return <option value={city.id}>{city.name}</option>
                       })}
                   </select>
               </div>

               <div className="post-field">
                    <label className="post-label" htmlFor="image">Image:</label>
                    <input
                        id="image"
                        className="post-input"
                        name="image"
                        type="file"
                        onChange={(event) => {
                        setImage(event.target.files[0]);
                    }}/>
               </div>

               <button className="submit-btn">Submit</button>
            </form>
        </div>
    )
}

export default PostCreateForm;
