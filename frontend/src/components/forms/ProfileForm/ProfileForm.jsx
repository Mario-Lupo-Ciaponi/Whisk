import { useEffect, useState } from "react";
import api from "../../../api/api.js";
import "./ProfileForm.css";

const ProfileForm = ({ user, shouldNotEdit }) => {
  const [bio, setBio] = useState(user.profile.bio);
  const [accountType, setAccountType] = useState(user.profile?.account_type);
  const [selectedCity, setSelectedCity] = useState(user.profile?.city);
  const [cities, setCities] = useState([]);

  const addCities = async () => {
    const countryId = user.country;

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

      await api.patch(`accounts/profile/${user.id}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      location.reload();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (user?.country) addCities();
  }, [user]);

  return (
    <form onSubmit={editProfile} className="profile-form">
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
            <option value="no type">Do not specify</option>
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
            <option className="select-option" value="">
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
        <button type="submit" disabled={shouldNotEdit} className="submit-btn">
          Edit
        </button>
      )}
    </form>
  );
};

export default ProfileForm;
