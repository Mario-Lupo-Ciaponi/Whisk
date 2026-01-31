import RegisterForm from "../components/forms/RegisterForm.jsx";
import LoginForm from "../components/forms/LoginForm.jsx";
import { useState } from "react";
import "./AuthPage.css";

const AuthPage = ({ setAuthTokens, navigate, errors, setErrors }) => {
  const [showLogin, setShowLogin] = useState(true);
  // Lifting the state up to prevent redundancy
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowLogin = (event) =>
    setShowLogin("login" === event.target.value);

  return (
    <div className="auth-wrapper">
      <article className="auth-card">
        <div className="segmented-control">
          <div className={`toggle-option ${showLogin ? "active" : ""}`}>
            <label htmlFor="login" className="control-label">
              Login
            </label>
            <input
              type="radio"
              id="login"
              onChange={toggleShowLogin}
              value="login"
              name="login"
              className="control-input"
              checked={showLogin === true}
            />
          </div>
          <div className={`toggle-option ${showLogin ? "" : "active"}`}>
            <label htmlFor="register" className="control-label">
              Register
            </label>
            <input
              type="radio"
              id="register"
              onChange={toggleShowLogin}
              value="register"
              name="register"
              className="control-input"
              checked={showLogin === false}
            />
          </div>
        </div>

        <header className="auth-header">
          <h2 className="auth-title">{showLogin ? "Login" : "Register"}</h2>
        </header>

        {showLogin ? (
          <LoginForm
            setAuthTokens={setAuthTokens}
            navigate={navigate}
            errors={errors}
            setErrors={setErrors}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />
        ) : (
          <RegisterForm
            navigate={navigate}
            errors={errors}
            setErrors={setErrors}
            setShowLogin={setShowLogin}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />
        )}
      </article>
    </div>
  );
};

export default AuthPage;
