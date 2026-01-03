import { useState, useRef } from "react";
import api from "../../api/api.js";
import "./AuthForm.css";


function LoginForm({ setAuthTokens, navigate, errors, setErrors }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogin(event) {
        event.preventDefault();

        try {
            const response = await api.post("token/", {
                username,
                password
            });

            localStorage.setItem("access", response.data.access);
            localStorage.setItem("refresh", response.data.refresh);

            setAuthTokens(response.data);

            navigate("/");
        } catch (e){
            if (e.response.status === 400){
                setErrors(e.response.data);
            }

            console.log(e)
        }
    }

    return (
        <form onSubmit={handleLogin} className="login-form auth-form">
            <div className="auth-field">
                <label htmlFor="username" className="auth-label">Username</label>
                <input
                    id="username"
                    name="username"
                    type="text"
                    value={username}
                    className={`auth-input ${errors.username ? "error-input" : ""}`}
                    onChange={(event) => {
                        setUsername(event.target.value);
                    }}

                />
            </div>

            <div className="auth-field">
                <label htmlFor="password" className="auth-label">Password</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    className={`auth-input ${errors.password ? "error-input" : ""}`}
                    onChange={(event) => {
                        setPassword(event.target.value);
                    }}
                />
            </div>

            <button className="submit-btn">Login</button>
        </form>
    );
}

export default LoginForm;
