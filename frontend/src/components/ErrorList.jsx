function ErrorList({ errors }) {
    function normalizeError(value) {
        if (Array.isArray(value)) return value.join(", ")
        if (typeof value === "object") return Object.values(value).join(", ");

        return value
    }


    return (
        <ul className="error-list">
            {Object.entries(errors).map(([field, description]) => {
                return (
                    <li className="error">
                        {field !== "non_field_errors" ? `${field} - ` : ""}
                        {normalizeError(description)}
                    </li>
                )
            })}
        </ul>
    )
}

export default ErrorList;
