import {useEffect, useState} from "react";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import api from "../../api/api.js";
import "./AuthForm.css";

// This gives access to all the countries in english
countries.registerLocale(enLocale);

const RegisterForm = ({ navigate, errors, setErrors }) => {
    // Declaration of states:
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [countrySelected, setCountrySelected] = useState("");
    const [firstPassword, setFirstPassword] = useState("");
    const [secondPassword, setSecondPassword] = useState("");
    const [allCountries, setAllCountries] = useState({});

    const getAllCountries = () =>
        countries.getNames("en", {select: "official"});

    const handleRegister = async (event) => {
        event.preventDefault();

        if (!username || !email || !countrySelected || !firstPassword || !secondPassword) {
            setErrors({ detail: "All fields are required." });
            return;
        }

        const formData = new FormData();

        formData.append("username", username);
        formData.append("email", email);
        formData.append("country", countrySelected);
        formData.append("password1", firstPassword);
        formData.append("password2", secondPassword);

        try {
            await api.post("accounts/register/", formData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            navigate("/login");
        } catch (e) {
            if (e.response.status === 400) {
                setErrors(e.response.data);
            }

            console.log(e)
        }
    }

    useEffect(() => {
        const countryData = getAllCountries();
        setAllCountries(countryData);
    }, []);

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
                <label htmlFor="country" className="auth-label">Country:</label>
                <select
                    id="country"
                    name="country"
                    className={`auth-input ${errors.email ? "error-input" : ""}`}
                    onChange={(event) => {
                        setCountrySelected(event.target.value);
                    }}>
                    <option disabled selected value> -- select a country -- </option>
                    {Object.entries(allCountries).map(([countryCode, countryName]) => {
                        return <option value={countryCode}>{countryName}</option>
                    })}
                </select>
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
