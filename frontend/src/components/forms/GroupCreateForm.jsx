import { useState } from "react";
import ErrorList from "../ErrorList.jsx";
import api from "../../api/api.js";
import "./GroupCreateForm.css";

const GroupCreateForm = ({ navigate, errors, setErrors }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const createPost = async (event) => {
    event.preventDefault();

    if (!name || !description) {
      setErrors({ detail: "All fields are required." });
      return;
    }

    const formData = new FormData();
    formData.append("name", name);

    try {
      await api.post("groups/", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (e) {
      if (e.response?.status === 401) {
        navigate("login/");
      }

      setErrors(e.data);
    }
  };

  return (
    <form onSubmit={createPost}>
      {errors && <ErrorList errors={errors} />}

      <label htmlFor="name">Name:</label>
      <input
        id="name"
        name="name"
        type="text"
        onChange={(event) => {
          setName(event.target.value.trim());
        }}
      />

      <label htmlFor="name">Description:</label>
      <textarea
        name="description"
        id="description"
        onChange={(event) => {
          setDescription(event.target.value.trim());
        }}
      ></textarea>

      <button className="create-btn">Create</button>
    </form>
  );
};

export default GroupCreateForm;
