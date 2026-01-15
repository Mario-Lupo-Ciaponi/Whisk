import GroupCreateForm from "../components/forms/GroupCreateForm.jsx";
import "./CreateGroupPage.css";

export default function CreateGroupPage({ navigate, errors, setErrors }) {
    return (
        <>
            <GroupCreateForm navigate={navigate} errors={errors} setErrors={setErrors} />
        </>
    )
}
