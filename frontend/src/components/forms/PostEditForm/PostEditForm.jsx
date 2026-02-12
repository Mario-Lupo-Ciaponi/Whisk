import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import api from "../../../api/api.js";
import "./PostEditForm.css";
import Loader from "../../Loader.jsx";

const PostEditForm = ({
  post,
  currentUser,
  isEditFormVisible,
  setIsEditFormVisible,
  setIsFilterVisible,
}) => {
  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState(post.description);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(post.city.id);
  const [isLoading, setIsLoading] = useState(false);

  const addCities = async () => {
    const countryId = currentUser.country;

    const response = await api.get("cities/", {
      params: {
        country: countryId,
      },
    });

    setCities(response.data);
  };

  const editPost = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    setIsLoading(true);

    try {
      const formData = new FormData();

      console.log(selectedCity);

      formData.append("title", title.trim());
      formData.append("description", description.trim());
      formData.append("city_id", Number(selectedCity));

      await api.patch(`posts/${post.id}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setIsFilterVisible(false);
      setIsEditFormVisible(false);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const closeTab = () => {
    setIsEditFormVisible(false);
    setIsFilterVisible(false);
  };

  useEffect(() => {
    if (currentUser?.country) addCities();
  }, [currentUser]);

  return (
    <div className={`form-container ${isEditFormVisible && "active"}`}>
      <button onClick={closeTab} className="close-tab-btn">
        <FontAwesomeIcon icon={faX} />
      </button>

      <header className="form-header">
        <h3 className="form-title">Edit post</h3>
      </header>

      <form className="edit-post-form" onSubmit={editPost}>
        <div className="post-field">
          <label className="post-label" htmlFor="title">
            Title:
          </label>
          <input
            id="title"
            className="post-input"
            name="title"
            type="text"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
        </div>
        <div className="post-field">
          <label className="post-label" htmlFor="description">
            Description:
          </label>
          <textarea
            id="description"
            className="post-input textarea"
            name="description"
            cols="30"
            rows="5"
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          ></textarea>
        </div>
        <div className="post-field">
          <label className="post-label" htmlFor="city">
            City:
          </label>

          <select
            name="city"
            id="city"
            className="post-input select"
            value={selectedCity}
            onChange={(event) => {
              setSelectedCity(event.target.value);
            }}
          >
            <option className="select-option" disabled selected value>
              Select
            </option>
            {cities.map((city) => {
              return (
                <option className="select-option" value={city.id}>
                  {city.name}
                </option>
              );
            })}
          </select>
        </div>

        <button className="edit-btn" type="submit">
          {isLoading ? <Loader width={25} height={25} /> : "Edit" }
        </button>
      </form>
    </div>
  );
};

export default PostEditForm;
