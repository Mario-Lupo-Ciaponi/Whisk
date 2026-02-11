import { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import api from "../../api/api.js";
import "./ProfileImageFileUpload.css";

const ProfileImageFileUpload = ({ user }) => {
  const [image, setImage] = useState(null);
  const inputFile = useRef(null);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    setImage(file);

    try {
      const formData = new FormData();

      formData.append("profile_image", file);

      const response = await api.patch(
        `accounts/profile/${user.id}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      location.reload();
    } catch (e) {
      console.error(e);
    }
  };

  const onButtonClick = () => {
    inputFile.current.click();
  };

  return (
    <button onClick={onButtonClick} className="edit-profile-image-btn">
      <input
        className="profile-image-edit-input"
        type="file"
        ref={inputFile}
        onChange={handleFileUpload}
      />

      <span className="btn-icon">
        <FontAwesomeIcon icon={faPencil} />
      </span>
    </button>
  );
};

export default ProfileImageFileUpload;
