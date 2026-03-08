import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
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
      {isLoading ? (
        <div className="loader-container">
          <Loader width={200} height={200} />
        </div>
      ) : (
        <>
          <div className="auth-field">
            <label htmlFor="username" className="auth-label">
              {t("auth.registerForm.username")}
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={username}
              className={"auth-input"}
              onChange={(event) => {
                setUsername(event.target.value);
              }}
              required
            />
          </div>

          <div className="auth-field">
            <label htmlFor="email" className="auth-label">
              {t("auth.registerForm.email")}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              className={"auth-input"}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              required
            />
          </div>

          <div className="auth-field">
            <label htmlFor="country" className="auth-label">
              {t("auth.registerForm.country")}
            </label>
            <select
              id="country"
              name="country"
              className="auth-input"
              value={countrySelected}
              onChange={(event) => setCountrySelected(event.target.value)}
              required
            >
              <option disabled value selected>
                {t("auth.registerForm.selectCountry")}
              </option>
              {allCountries.map((country) => (
                <option key={country.id} value={country.id}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>

          <div className="auth-field">
            <label htmlFor="password1" className="auth-label">
              {t("auth.registerForm.password")}
            </label>

            <div className="input-container">
              <input
                id="password1"
                name="password1"
                type={showPassword ? "text" : "password"}
                value={firstPassword}
                className={"auth-input"}
                onChange={(event) => {
                  setFirstPassword(event.target.value);
                }}
                autoComplete="off"
                required
              />

              <PasswordToggle
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />
            </div>
          </div>

          <div className="auth-field">
            <label htmlFor="password2" className="auth-label">
              {t("auth.registerForm.repeatPassword")}
            </label>

            <div className="input-container">
              <input
                id="password2"
                name="password2"
                type={showPassword ? "text" : "password"}
                value={secondPassword}
                className={"auth-input"}
                onChange={(event) => {
                  setSecondPassword(event.target.value);
                }}
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
            {isLoading ? <Loader height={30} width={30} /> : t("auth.register")}
          </button>
        </>
      )}
    </form>
  );
};

export default RegisterForm;
