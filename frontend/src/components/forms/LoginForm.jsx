import { useState } from "react";
import PasswordToggle from "../PasswordToggle.jsx";
import api from "../../api/api.js";
import "./AuthForm.css";
import Loader from "../Loader.jsx";

const LoginForm = ({
  setAuthTokens,
  navigate,
  errors,
  setErrors,
  showPassword,
  setShowPassword,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();

    const formData = new FormData();

    if (!username || !password) {
      setErrors({ detail: "All fields are required." });
      return;
    }

    formData.append("username", username);
    formData.append("password", password);

    setIsLoading(true);
    try {
      const response = await api.post("token/", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);

      setAuthTokens(response.data);

      navigate("/");
    } catch (e) {
      if (e.response.status === 400) {
        setErrors(e.response.data);
      }

      console.log(e);
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleLogin} className="login-form auth-form">
      <div className="auth-field">
        <label htmlFor="username" className="auth-label">
          Username
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
        <label htmlFor="password" className="auth-label">
          Password
        </label>

        <div className="input-container">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={password}
            className={`auth-input ${errors.password ? "error-input" : ""}`}
            onChange={(event) => {
              setPassword(event.target.value);
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
          "Login"
        }
      </button>
    </form>
  );
};

export default LoginForm;
