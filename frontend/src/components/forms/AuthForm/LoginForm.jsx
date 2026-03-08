import { useState } from "react";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import PasswordToggle from "../../PasswordToggle/PasswordToggle.jsx";
import Loader from "../../Loader.jsx";
import api from "../../../api/api.js";
import "./AuthForm.css";

const LoginForm = ({
  setAuthTokens,
  navigate,
  showPassword,
  setShowPassword,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const handleLogin = async (event) => {
    event.preventDefault();

    const formData = new FormData();

    if (!username || !password) {
      toast.error(t("auth.allFieldsRequired"));
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
      location.reload();
    } catch (e) {
      const errorData = e.response?.data;

      if (e.response?.status === 400) {
        const errorValue = Object.values(errorData)[0];

        const message = Array.isArray(errorValue) ? errorValue[0] : errorValue;

        toast.error(message || t("auth.invalidData"));
      } else if (e.response?.status === 401) {
        toast.error(t("auth.loginForm.incorrectCredentials"));
      } else {
        toast.error(t("errors.somethingWentWrong"));
      }
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleLogin} className="login-form auth-form">
      <div className="auth-field">
        <label htmlFor="username" className="auth-label">
          {t("auth.loginForm.username")}
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
        <label htmlFor="password" className="auth-label">
          {t("auth.loginForm.password")}
        </label>

        <div className="input-container">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={password}
            className={"auth-input"}
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
        {isLoading ? <Loader height={30} width={30} /> : t("auth.login")}
      </button>
    </form>
  );
};

export default LoginForm;
