import { Link } from "react-router";
import GroupSection from "../components/GroupSection.jsx";

const GroupsPage = () => {
    return (
        <>
            {/*TODO: Rest of the page*/}

            <Link className="create-group" to="/create-group">Create Group</Link>
            <GroupSection />
        </>
    )
}

export default GroupsPage;