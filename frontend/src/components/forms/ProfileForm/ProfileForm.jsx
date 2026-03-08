import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Toaster, toast } from "react-hot-toast";
import api from "../../../api/api.js";
import "./ProfileForm.css";

const ProfileForm = ({ user, shouldNotEdit }) => {
  const [bio, setBio] = useState(user.profile.bio);
  const [accountType, setAccountType] = useState(user.profile?.account_type);
  const [selectedCity, setSelectedCity] = useState(user.profile?.city);
  const [cities, setCities] = useState([]);

  const { t } = useTranslation();

  const addCities = async () => {
    const countryId = user.country.id;

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
      const payload = {
        bio,
        account_type: accountType,
        city: selectedCity,
      };

      await api.patch(`accounts/profile/${user.id}/`, payload);

      location.reload();
    } catch {
      toast.error(t("errors.somethingWentWrong"));
    }
  };

  useEffect(() => {
    if (user?.country) addCities();
  }, [user]);

  return (
    <form onSubmit={editProfile} className="profile-form">
      <Toaster />

      <div className="profile-fields">
        <div className="profile-field">
          <label className="profile-label" htmlFor="">
            {t("profileForm.bio")}
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
            {t("profileForm.accountType")}
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
            <option value="no type">{t("profileForm.noType")}</option>
            <option value="pet owner">{t("profileForm.petOwner")}</option>
            <option value="volunteer">{t("profileForm.volunteer")}r</option>
            <option value="shelter">{t("profileForm.shelter")}</option>
          </select>
        </div>

        <div className="profile-field">
          <label className="profile-label" htmlFor="">
            {t("profileForm.city")}
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
              {t("profileForm.noCity")}
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
          {t("profileForm.edit")}
        </button>
      )}
    </form>
  );
};

export default ProfileForm;
