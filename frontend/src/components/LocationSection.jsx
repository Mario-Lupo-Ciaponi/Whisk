import LocationCard from "./cards/LocationCard.jsx";
import "./LocationSection.css";

const LocationSection = ({ showSection, locations }) => {
    return (
        <section className={`location-section ${showSection && "active"}`}>
            {locations.map(location => {
                return <LocationCard location={location} />
            })}
        </section>
    )
}

export default LocationSection;