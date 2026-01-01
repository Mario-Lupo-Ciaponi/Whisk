import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import api from "../../api/api.js";


function LoginForm({ setAuthTokens }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

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
        } catch (e) {
            console.log("Error", e)
        }
    }

    return (
        <form onSubmit={handleLogin} className="login-form">
            <label htmlFor="username">Username</label>
            <input
                id="username"
                name="username"
                type="text"
                value={username}
                onChange={(event) => {
                    setUsername(event.target.value);
                }}

            />

            <label htmlFor="password">Password</label>
            <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(event) => {
                    setPassword(event.target.value);
                }}
            />

            <button className="submit-btn">Submit</button>
        </form>
    );
}

export default LoginForm;
