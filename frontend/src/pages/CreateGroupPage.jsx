import GroupCreateForm from "../components/forms/GroupCreateForm.jsx";
import "./CreateGroupPage.css";

export default function CreateGroupPage({ errors, setErrors }) {
    return (
        <>
            <GroupCreateForm errors={errors} setErrors={setErrors} />
        </>
    )
}
