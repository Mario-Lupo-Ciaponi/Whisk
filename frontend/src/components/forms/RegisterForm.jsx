import { useEffect, useState } from "react";
import PasswordToggle from "../PasswordToggle.jsx";

import api from "../../api/api.js";
import "./AuthForm.css";
import Loader from "../Loader.jsx";

const RegisterForm = ({
  errors,
  setErrors,
  setShowLogin,
  showPassword,
  setShowPassword,
}) => {
  // Declaration of states:
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [countrySelected, setCountrySelected] = useState("");
  const [firstPassword, setFirstPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");
  const [allCountries, setAllCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAllCountries = async () => {
    try {
      const response = await api.get("countries/");
      setAllCountries(response.data);
    } catch (e) {
      console.log(e);
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
      setErrors({ detail: "All fields are required." });
      return;
    }

    const formData = new FormData();

    formData.append("username", username);
    formData.append("email", email);
    formData.append("country", countrySelected);
    formData.append("password1", firstPassword);
    formData.append("password2", secondPassword);

    setIsLoading(true);

    try {
      await api.post("accounts/register/", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setShowLogin(true);
    } catch (e) {
      if (e.response.status === 400) {
        setErrors(e.response.data);
      }

      console.log(e);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchAllCountries();
  }, []);

  return (
    <form onSubmit={handleRegister} className="register-form auth-form">
      <div className="auth-field">
        <label htmlFor="username" className="auth-label">
          Username:
        </label>
        <input
          id="username"
          name="username"
          type="text"
          value={username}
          className={`auth-input ${errors.username ? "error-input" : ""}`}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
          required
        />
      </div>

      <div className="auth-field">
        <label htmlFor="email" className="auth-label">
          Email:
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={email}
          className={`auth-input ${errors.email ? "error-input" : ""}`}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          required
        />
      </div>

      <div className="auth-field">
        <label htmlFor="country" className="auth-label">
          Country:
        </label>
        <select
          id="country"
          name="country"
          className={`auth-input ${errors.email ? "error-input" : ""}`}
          onChange={(event) => {
            setCountrySelected(event.target.value);
          }}
          required
        >
          <option disabled selected value>
            {" "}
            -- select a country --{" "}
          </option>
          {allCountries.map((country) => {
            return <option value={country.id}>{country.name}</option>;
          })}
        </select>
      </div>

      <div className="auth-field">
        <label htmlFor="password1" className="auth-label">
          Password
        </label>

        <div className="input-container">
          <input
            id="password1"
            name="password1"
            type={showPassword ? "text" : "password"}
            value={firstPassword}
            className={`auth-input ${errors.password1 ? "error-input" : ""}`}
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
          Repeat Password:
        </label>

        <div className="input-container">
          <input
            id="password2"
            name="password2"
            type={showPassword ? "text" : "password"}
            value={secondPassword}
            className={`auth-input ${errors.password2 ? "error-input" : ""}`}
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
        {isLoading ?
          <Loader
            height={30}
            width={30}
          /> :
          "Register"
        }
      </button>
    </form>
  );
};

export default RegisterForm;
