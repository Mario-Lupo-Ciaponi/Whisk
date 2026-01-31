import GroupCreateForm from "../components/forms/GroupCreateForm.jsx";
import "./CreateGroupPage.css";

const CreateGroupPage = ({ navigate, errors, setErrors }) => {
  return (
    <>
      <GroupCreateForm
        navigate={navigate}
        errors={errors}
        setErrors={setErrors}
      />
    </>
  );
};

export default CreateGroupPage;
