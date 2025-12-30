import PostSection from "../components/PostSection.jsx";
import "./HomePage.css";

function HomePage() {
    return (
        <>
            <title>Whisk</title>
            <link rel="shortcut icon" href="images/favicons/favicon-32x32.png" type="image/x-icon"/>

            <div className="feed-container">
                <select name="feed-select" className="feed-select">
                    <option value="all">All</option>
                    <option value="groups">Groups</option>
                    <option value="city">City</option>
                </select>
            </div>

            <PostSection />
        </>
    );
}

export default HomePage;
