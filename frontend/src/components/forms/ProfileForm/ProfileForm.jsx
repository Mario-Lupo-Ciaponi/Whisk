import { useEffect, useState } from "react";
import api from "../../../api/api.js";
import "./ProfileForm.css";

const ProfileForm = ({ currentUser, shouldNotEdit }) => {
  const [bio, setBio] = useState(currentUser.profile.bio);
  const [accountType, setAccountType] = useState(
    currentUser.profile.account_type,
  );
  const [selectedCity, setSelectedCity] = useState(currentUser.profile.city);
  const [cities, setCities] = useState([]);

  console.log(currentUser.profile.city);

  const addCities = async () => {
    const countryId = currentUser.country;

    const response = await api.get("cities/", {
      params: {
        country: countryId,
      },
    });

    setCities(response.data);
  };

  const editProfile = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    try {
      const formData = new FormData();

      formData.append("bio", bio.trim());
      formData.append("account_type", accountType);
      formData.append("city", selectedCity);

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

  useEffect(() => {
    if (currentUser?.country) addCities();
  }, [currentUser]);

  return (
    <form className="profile-form">
      <div className="profile-fields">
        <div className="profile-field">
          <label className="profile-label" htmlFor="">
            Bio:
          </label>
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
          <label className="profile-label" htmlFor="">
            Account type:
          </label>
          <select
            name="account-type"
            className="profile-select type"
            disabled={shouldNotEdit}
            value={accountType}
            onChange={(event) => {
              setAccountType(event.target.value);
            }}
          >
            <option value={null}>Do not specify</option>
            <option value="pet owner">Pet owner</option>
            <option value="volunteer">Volunteer</option>
            <option value="shelter">Shelter</option>
          </select>
        </div>

        <div className="profile-field">
          <label className="profile-label" htmlFor="">
            City:
          </label>
          <select
            name="city"
            id="city"
            className="profile-select city"
            disabled={shouldNotEdit}
            value={selectedCity}
            onChange={(event) => {
              setSelectedCity(event.target.value);
            }}
          >
            <option className="select-option" value={null}>
              No city
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
