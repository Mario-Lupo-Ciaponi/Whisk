import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router";
import { Helmet } from "react-helmet-async";
import { Toaster } from "react-hot-toast";
import RegisterForm from "../../components/forms/AuthForm/RegisterForm.jsx";
import LoginForm from "../../components/forms/AuthForm/LoginForm.jsx";
import "./AuthPage.css";

const AuthPage = ({ setAuthTokens, navigate, baseUrl }) => {
  const [showLogin, setShowLogin] = useState(true);
  // Lifting the state up to prevent redundancy
  const [showPassword, setShowPassword] = useState(false);

  const { t } = useTranslation();

  const location = useLocation();

  const pageTitle = t("auth.pageTitle");
  const pageUrl = `${baseUrl}${location.pathname}`;

  const toggleShowLogin = (event) =>
    setShowLogin("login" === event.target.value);

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta property="og:title" content={pageTitle} />
        <meta property="og:url" content={pageUrl} />
      </Helmet>
      <div className="auth-wrapper">
        <Toaster position="bottom-center" />

        <article className="auth-card">
          <div className="segmented-control">
            <div className={`toggle-option ${showLogin ? "active" : ""}`}>
              <label htmlFor="login" className="control-label">
                {t("auth.login")}
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
                {t("auth.register")}
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
            <h2 className="auth-title">
              {showLogin ? t("auth.login") : t("auth.register")}
            </h2>
          </header>

          {showLogin ? (
            <LoginForm
              setAuthTokens={setAuthTokens}
              navigate={navigate}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />
          ) : (
            <RegisterForm
              navigate={navigate}
              setShowLogin={setShowLogin}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />
          )}
        </article>
      </div>
    </>
  );
};

export default AuthPage;
