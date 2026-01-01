import {useState} from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import api from "../../api/api.js";

function RegisterForm() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()

    async function handleLogin(event) {
        event.preventDefault();

        try {
            await api.post("accounts/register/", {
                username,
                email,
                password
            })

            navigate("login/");
        } catch (e) {
            console.log("Error", e)
        }
    }

    return (
        <form onSubmit={handleLogin} className="login-form">
            <label htmlFor="username">Username:</label>
            <input
                id="username"
                name="username"
                type="text"
                value={username}
                onChange={(event) => {
                    setUsername(event.target.value);
                }}

            />

            <label htmlFor="email">Email:</label>
            <input
                id="email"
                name="email"
                type="emaol"
                value={email}
                onChange={(event) => {
                    setEmail(event.target.value);
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

export default RegisterForm
