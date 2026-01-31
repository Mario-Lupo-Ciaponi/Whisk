import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "./PasswordToggle.css";

const PasswordToggle = ({ showPassword, setShowPassword }) => {
  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <button
      type="button"
      className="show-password-btn"
      onClick={toggleShowPassword}
    >
      <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
    </button>
  );
};

export default PasswordToggle;
