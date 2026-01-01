import LoginForm from "../components/forms/LoginForm.jsx";

function LoginPage({ setAuthTokens }) {
    return (
        <>
            <h1 className="login-title">Login</h1>
            <LoginForm setAuthTokens={setAuthTokens} />
        </>
    )
}

export default LoginPage;
