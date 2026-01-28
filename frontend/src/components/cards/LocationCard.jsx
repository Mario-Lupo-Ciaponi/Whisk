import "./LocationCard.css";

const LocationCard = ({ location }) => {
    const latitude = location.latitude;
    const longitude = location.longitude;

    const locationUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;

    // This returns more human-readable coordinates
    const formatCoordinates =  c => Number(c).toFixed(3);


    return (
        <article className="location-card">
            <img
                className="profile-image"
                src="images/default-profile-img.jpeg"
                alt="profile image"
            /> {/*TODO: check whether the user has a profile image*/}

            <div className="location-info-wrapper">
                <p className="pointed-by-text">
                    <span className="username">{location.author || "Anonymous user"}</span> has pointed out the following position:
                    <a
                        className="location-url"
                        target="_blank"
                        href={locationUrl}>
                        {formatCoordinates(latitude)} - {formatCoordinates(longitude)}
                    </a>
                </p>
            </div>
        </article>
    )
}

export default LocationCard;
