import LocationCard from "../../cards/LocationCard/LocationCard.jsx";
import "./LocationSection.css";

const LocationSection = ({
  post,
  showSection,
  locations,
  currentUser,
  setFound,
}) => {
  return (
    <section className={`location-section ${showSection && "active"}`}>
      {locations.map((location) => {
        return (
          <LocationCard
            post={post}
            location={location}
            currentUser={currentUser}
            setFound={setFound}
          />
        );
      })}
    </section>
  );
};

export default LocationSection;
