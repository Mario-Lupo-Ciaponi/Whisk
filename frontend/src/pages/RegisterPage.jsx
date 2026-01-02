import RegisterForm from "../components/forms/RegisterForm.jsx";

function RegisterPage({ navigate }) {
    return (
        <>
            <h1 className="register-title">Register</h1>
            <RegisterForm navigate={navigate} />
        </>
    )
}

export default RegisterPage;
