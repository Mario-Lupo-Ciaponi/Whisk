import { useState, useEffect } from "react";
import GroupCard from "./cards/GroupCard.jsx";
import api from "../api/api.js";

export default function GroupSection () {
    const [groups, setGroups] = useState([]);

    const BASE_URL = "groups/";

    useEffect(() => {
        async function getGroups() {
            try {
                const response = await api.get(BASE_URL);
                setGroups(response.data);
            } catch (e) {
                console.log(e);
            }
        }

        getGroups();
    }, []);

    return (
        <section className="groups-section">
            {groups.map(group => {
                return <GroupCard group={group} />;
            })}
        </section>
    );
}