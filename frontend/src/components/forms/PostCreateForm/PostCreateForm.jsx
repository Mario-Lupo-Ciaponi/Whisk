import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import toast, { Toaster } from "react-hot-toast";
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
  const { t } = useTranslation();

  const createPost = async (event) => {
    event.preventDefault();

    if (!title || !description || !selectedCity || !image) {
      toast.error(t("createPostPage.postForm.allFieldsRequired"));
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

      toast.success(t("createPostPage.postForm.success"));
      navigate("/");
    } catch (e) {
      const errorData = e.response?.data;

      if (e.response?.status === 400) {
        const errorValue = Object.values(errorData)[0];

        const message = Array.isArray(errorValue) ? errorValue[0] : errorValue;

        toast.error(message || t("createPostPage.postForm.invalidData"));
      } else if (e.response?.status === 401) {
        toast.error(t("createPostPage.postForm.authError"));
        navigate("login/");
      } else {
        toast.error(t("createPostPage.postForm.serverError"));
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
    <form className="post-create-form" onSubmit={createPost}>
      <Toaster position="bottom-center" />

      <div className="post-create-form__stack">
        <div className="post-create-form__field">
          <label className="post-create-form__label" htmlFor="title">
            {t("createPostPage.postForm.title")}
          </label>
          <input
            id="title"
            className="post-create-form__control"
            name="title"
            type="text"
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
        </div>

        <div className="post-create-form__field">
          <label className="post-create-form__label" htmlFor="description">
            {t("createPostPage.postForm.description")}
          </label>
          <textarea
            id="description"
            className="post-create-form__control post-create-form__control--textarea"
            name="description"
            cols="30"
            rows="5"
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          ></textarea>
        </div>

        <div className="post-create-form__field">
          <label className="post-create-form__label" htmlFor="city">
            {t("createPostPage.postForm.city")}
          </label>

          <select
            name="city"
            id="city"
            className="post-create-form__control post-create-form__control--select"
            onChange={(event) => {
              setSelectedCity(event.target.value);
            }}
          >
            <option className="select-option" disabled selected value>
              {t("createPostPage.postForm.selectCity")}
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

        <div className="post-create-form__actions">
          <button
            type="submit"
            className="post-create-form__submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader height={30} width={30} />
            ) : (
              t("createPostPage.postForm.submit")
            )}
          </button>

          <button
            type="button"
            className="post-create-form__cancel"
            onClick={() => navigate("/")}
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};

export default PostCreateForm;
