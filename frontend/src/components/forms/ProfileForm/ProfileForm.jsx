import { useState } from "react";
import api from "../../../api/api.js";
import "./ProfileForm.css";

const ProfileForm = ({ currentUser, shouldNotEdit }) => {
  const [bio, setBio] = useState(currentUser.profile.bio);
  const [profileType, setProfileType] = useState(
    currentUser.profile.profile_type,
  );

  const editProfile = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();

      formData.append("bio", bio);

      await api.patch(`accounts/profile/${currentUser.id}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("success");
      location.reload();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form className="profile-form">
      <div className="profile-fields">
        <div className="profile-field">
          <label htmlFor="">Bio:</label>
          <input
            name="bio"
            className="profile-input bio"
            disabled={shouldNotEdit}
            type="text"
            placeholder="Enter short bio"
            value={bio}
            onChange={(event) => {
              setBio(event.target.value);
            }}
          />
        </div>

        <div className="profile-field">
          <label htmlFor="">Profile type:</label>
          <select
            name="profile-type"
            className="profile-type"
            disabled={shouldNotEdit}
            value={profileType}
          >
            <option value="">Do not specify</option>
            <option value="pet owner">Pet owner</option>
            <option value="volunteer">Volunteer</option>
            <option value="shelter">Shelter</option>
          </select>
        </div>

        <div className="profile-field">
          <label htmlFor="">City:</label>
          <input
            name="city"
            className="profile-input city"
            disabled={shouldNotEdit}
            type="text"
            placeholder="Enter city"
          />
        </div>
      </div>
      {!shouldNotEdit && (
        <button
          onClick={editProfile}
          disabled={shouldNotEdit}
          className="submit-btn"
        >
          Edit
        </button>
      )}
    </form>
  );
};

export default ProfileForm;
