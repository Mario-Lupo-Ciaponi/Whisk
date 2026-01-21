import "./LocationCard.css";

const LocationCard = ({ location }) => {
    const latitude = location.latitude;
    const longitude = location.longitude;

    return (
        <article className="location-card">
            <a
                target="_blank"
                href={`https://www.google.com/maps?q=${latitude},${longitude}`}>
                {latitude} - {longitude}
            </a>
        </article>
    )
}

export default LocationCard;
