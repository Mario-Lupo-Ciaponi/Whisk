import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faGlobe, faLock } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import PasswordToggle from "../../PasswordToggle/PasswordToggle.jsx";
import Loader from "../../Loader.jsx";
import api from "../../../api/api.js";
import "./AuthForm.css";

const RegisterForm = ({ setShowLogin, showPassword, setShowPassword }) => {
  // Declaration of states:
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [countrySelected, setCountrySelected] = useState("");
  const [firstPassword, setFirstPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");
  const [allCountries, setAllCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const fetchAllCountries = async () => {
    setIsLoading(true);

    try {
      const response = await api.get("countries/");
      setAllCountries(response.data);
    } catch (e) {
      setShowLogin(true);
      toast.error(t("errors.somethingWentWrong"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    if (
      !username ||
      !email ||
      !countrySelected ||
      !firstPassword ||
      !secondPassword
    ) {
      toast.error(t("auth.allFieldsRequired"));
      return;
    }

    const payload = {
      username,
      email,
      country: Number(countrySelected),
      password1: firstPassword,
      password2: secondPassword,
    };

    setIsLoading(true);

    try {
      await api.post("accounts/register/", payload);

      setShowLogin(true);
      toast.success(t("auth.registerForm.registrationSuccess"));
    } catch (e) {
      const errorData = e.response?.data;

      if (e.response?.status === 400) {
        const errorValue = Object.values(errorData)[0];

        const message = Array.isArray(errorValue) ? errorValue[0] : errorValue;

        toast.error(message || t("auth.invalidData"));
      } else {
        toast.error(t("errors.somethingWentWrong"));
      }
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchAllCountries();
  }, []);

  return (
    <form
      onSubmit={handleRegister}
      className={`register-form auth-form ${isLoading ? "loading" : ""}`}
    >
      <h2 className="auth-heading">
        {t("auth.registerForm.createAccount", "Create your account")}
      </h2>

      {isLoading ? (
        <div className="loader-container">
          <Loader width={200} height={200} />
        </div>
      ) : (
        <>
          {/* Username */}
          <div className="auth-field">
            <label htmlFor="username" className="auth-label">
              {t("auth.registerForm.username")}
            </label>
            <div className="input-wrapper">
              <span className="input-icon">
                <FontAwesomeIcon icon={faUser} />
              </span>
              <input
                id="username"
                name="username"
                type="text"
                value={username}
                className="auth-input"
                placeholder={t(
                  "auth.registerForm.usernamePlaceholder",
                  "Choose a username",
                )}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="auth-field">
            <label htmlFor="email" className="auth-label">
              {t("auth.registerForm.email")}
            </label>
            <div className="input-wrapper">
              <span className="input-icon">
                <FontAwesomeIcon icon={faEnvelope} />
              </span>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                className="auth-input"
                placeholder={t(
                  "auth.registerForm.emailPlaceholder",
                  "Enter your email",
                )}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Country */}
          <div className="auth-field">
            <label htmlFor="country" className="auth-label">
              {t("auth.registerForm.country")}
            </label>
            <div className="input-wrapper">
              <span className="input-icon">
                <FontAwesomeIcon icon={faGlobe} />
              </span>
              <select
                id="country"
                name="country"
                className="auth-input auth-select"
                value={countrySelected}
                onChange={(e) => setCountrySelected(e.target.value)}
                required
              >
                <option disabled value="">
                  {t("auth.registerForm.selectCountry")}
                </option>
                {allCountries.map((country) => (
                  <option key={country.id} value={country.id}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Password */}
          <div className="auth-field">
            <label htmlFor="password1" className="auth-label">
              {t("auth.registerForm.password")}
            </label>
            <div className="input-wrapper">
              <span className="input-icon">
                <FontAwesomeIcon icon={faLock} />
              </span>
              <input
                id="password1"
                name="password1"
                type={showPassword ? "text" : "password"}
                value={firstPassword}
                className="auth-input"
                placeholder={t(
                  "auth.registerForm.passwordPlaceholder",
                  "Create a password",
                )}
                onChange={(e) => setFirstPassword(e.target.value)}
                autoComplete="off"
                required
              />
              <PasswordToggle
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />
            </div>
          </div>

          {/* Repeat Password */}
          <div className="auth-field">
            <label htmlFor="password2" className="auth-label">
              {t("auth.registerForm.repeatPassword")}
            </label>
            <div className="input-wrapper">
              <span className="input-icon">
                <FontAwesomeIcon icon={faLock} />
              </span>
              <input
                id="password2"
                name="password2"
                type={showPassword ? "text" : "password"}
                value={secondPassword}
                className="auth-input"
                placeholder={t(
                  "auth.registerForm.repeatPasswordPlaceholder",
                  "Confirm your password",
                )}
                onChange={(e) => setSecondPassword(e.target.value)}
                autoComplete="off"
                required
              />
              <PasswordToggle
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />
            </div>
          </div>

          <button type="submit" className="submit-btn">
            {t("auth.register")}
          </button>
        </>
      )}
    </form>
  );
};

export default RegisterForm;
