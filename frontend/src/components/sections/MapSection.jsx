import { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import LocationSection from "./LocationSection.jsx";
import LocationPicker from "../LocationPicker.jsx";
import api from "../../api/api.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import "./MapSection.css";

const MapSection = ({ activeSection, post, locations, setLocations, currentUser, setFound }) => {
  const [showLocationSection, setShowLocationSection] = useState(false);

  const toggleLocationSection = () =>
    setShowLocationSection(!showLocationSection);

  return (
    <section className={`map-section ${activeSection === "map" ? "active" : "none"}`}>
      <header className="section-header">
        <h3 className="section-title">Pet Location</h3>
        <p className="section-description">
          Select a location where you have seen the pet
        </p>
      </header>

      <LocationPicker post={post} setLocations={setLocations} />

      <div className="locations-wrapper">
        <button className="show-locations-btn" onClick={toggleLocationSection}>
          {showLocationSection ? "Hide" : "Show"} Locations Provided
          <FontAwesomeIcon
            icon={showLocationSection ? faCaretUp : faCaretDown}
          />
        </button>

        <LocationSection
          post={post}
          showSection={showLocationSection}
          locations={locations}
          currentUser={currentUser}
          setFound={setFound}
        />
      </div>
    </section>
  );
};

export default MapSection;
