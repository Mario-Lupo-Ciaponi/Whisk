import LoginForm from "../components/forms/LoginForm.jsx";

function LoginPage({ setAuthTokens, navigate }) {
    return (
        <>
            <h1 className="login-title">Login</h1>
            <LoginForm setAuthTokens={setAuthTokens} navigate={navigate} />
        </>
    )
}

export default LoginPage;
