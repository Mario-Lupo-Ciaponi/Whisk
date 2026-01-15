import "./GroupCard.css";

export default function GroupCard({ group }) {
    return (
        <article key={group.id} className="group-card">
            <img src="images/default-group-image.png" alt="group image" className="group-image"/>

            <div className="content-wrapper">
                <header className="group-header">
                    <h1 className="group-title">{group.name}</h1>
                    <p className="group-description">{group.description}</p>
                </header>

                <button className="join-button">Join</button>
            </div>
        </article>
    )
}