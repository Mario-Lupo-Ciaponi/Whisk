import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import ErrorList from "../../ErrorList/ErrorList.jsx";
import UploadBox from "../../UploadBox/UploadBox.jsx";
import Loader from "../../Loader.jsx";
import api from "../../../api/api.js";
import "./PostCreateForm.css";

const PostCreateForm = ({ currentUser, navigate }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const createPost = async (event) => {
    event.preventDefault();

    if (!title || !description || !selectedCity || !image) {
      toast.error("All fields are required");
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

      toast.success("Post created successfully!");
      navigate("/");
    } catch (e) {
      const errorData = e.response?.data;

      if (e.response?.status === 400) {
        const errorValue = Object.values(errorData)[0];

        const message = Array.isArray(errorValue) ? errorValue[0] : errorValue;

        toast.error(message || "Invalid data submitted.");
      } else if (e.response?.status === 401) {
        toast.error("You are not authenticated. Please Login!");
        navigate("login/");
      } else {
        toast.error("Something went wrong on our end. Please try again later!");
      }
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
      <Toaster position="bottom-center" />

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
