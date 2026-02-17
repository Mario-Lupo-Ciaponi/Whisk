import { useEffect, useState } from "react";
import ErrorList from "../../ErrorList/ErrorList.jsx";
import UploadBox from "../../UploadBox/UploadBox.jsx";
import Loader from "../../Loader.jsx";
import api from "../../../api/api.js";
import "./PostCreateForm.css";

const PostCreateForm = ({ currentUser, navigate, errors, setErrors }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const createPost = async (event) => {
    event.preventDefault();

    if (!title || !description || !selectedCity || !image) {
      setErrors({ detail: "All fields are required." });
      return;
    }

    const formData = new FormData();

    formData.append("title", title.trim());
    formData.append("description", description.trim());
    formData.append("city", selectedCity);
    formData.append("image", image);
    formData.append("city_id", Number(selectedCity));

    setIsLoading(true);

    try {
      await api.post("posts/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/");
    } catch (e) {
      if (e.response?.status === 400) {
        setErrors(e.response.data);
      } else if (e.response?.status === 401) {
        navigate("login/");
      }

      console.log(e);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    const addCities = async () => {
      const countryId = currentUser.country.id;

      const response = await api.get("cities/", {
        params: {
          country: countryId,
        },
      });

      setCities(response.data);
    };

    if (currentUser?.country) addCities();
  }, [currentUser]);

  return (
    <form className="create-post-form" onSubmit={createPost}>
      {errors && <ErrorList errors={errors} />}

      <div className="post-field">
        <label className="post-label" htmlFor="title">
          Title:
        </label>
        <input
          id="title"
          className="post-input"
          name="title"
          type="text"
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

      <UploadBox image={image} setImage={setImage} />

      <button className="submit-btn">
        {isLoading ? <Loader height={30} width={30} /> : "Submit"}
      </button>
    </form>
  );
};

export default PostCreateForm;
