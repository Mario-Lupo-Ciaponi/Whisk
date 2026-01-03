import {useState} from "react";
import api from "../../api/api.js";
import "./AuthForm.css";

function RegisterForm({ navigate, errors, setErrors }) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [firstPassword, setFirstPassword] = useState("");
    const [secondPassword, setSecondPassword] = useState("");


    async function handleRegister(event) {
        event.preventDefault();

        try {
            await api.post("accounts/register/", {
                username,
                email,
                password1: firstPassword,
                password2: secondPassword,
            });

            navigate("login/");
        } catch (e) {
            if (e.response.status === 400) {
                setErrors(e.response.data);
            }
        }
    }

    return (
        <form onSubmit={handleRegister} className="register-form auth-form">
            <div className="auth-field">
                <label htmlFor="username" className="auth-label">Username:</label>
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
                <label htmlFor="email" className="auth-label">Email:</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    className={`auth-input ${errors.email ? "error-input" : ""}`}
                    onChange={(event) => {
                        setEmail(event.target.value);
                    }}

                />
            </div>

            <div className="auth-field">
                <label htmlFor="password1" className="auth-label">Password</label>
                <input
                    id="password1"
                    name="password1"
                    type="password"
                    value={firstPassword}
                    className={`auth-input ${errors.password1 ? "error-input" : ""}`}
                    onChange={(event) => {
                        setFirstPassword(event.target.value);
                    }}
                />
            </div>

            <div className="auth-field">
                <label htmlFor="password2" className="auth-label">Repeat Password:</label>
                <input
                    id="password2"
                    name="password2"
                    type="password"
                    value={secondPassword}
                    className={`auth-input ${errors.password2 ? "error-input" : ""}`}
                    onChange={(event) => {
                        setSecondPassword(event.target.value);
                    }}
                />
            </div>

            <button className="submit-btn">Register</button>
        </form>
    );
}

export default RegisterForm
