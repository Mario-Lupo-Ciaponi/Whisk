import { useState } from "react";
import { useTranslation } from "react-i18next";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import LocationSection from "../LocationSection/LocationSection.jsx";
import LocationPicker from "../../LocationPicker/LocationPicker.jsx";
import api from "../../../api/api.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp, faX } from "@fortawesome/free-solid-svg-icons";
import "./MapSection.css";

const MapSection = ({
  isVisible,
  onClose,
  post,
  locations,
  setLocations,
  setLocationsCount,
  currentUser,
  setFound,
}) => {
  const [showLocationSection, setShowLocationSection] = useState(false);
  const { t } = useTranslation();

  const toggleLocationSection = () =>
    setShowLocationSection(!showLocationSection);

  return (
    <section
      className={`map-section ${isVisible ? "map-section--active" : ""}`}
    >
      <button onClick={onClose} className="map-section__close-btn">
        <FontAwesomeIcon icon={faX} />
      </button>

      {!post.found && (
        <>
          {!(currentUser?.id === post.author.id) && (
            <>
              <header className="map-section__header">
                <h3 className="map-section__title">{t("mapSection.title")}</h3>
                <p className="map-section__description">
                  {t("mapSection.description")}
                </p>
              </header>
              <LocationPicker
                post={post}
                setLocations={setLocations}
                setLocationsCount={setLocationsCount}
                isVisible={isVisible}
              />
            </>
          )}
        </>
      )}

      <div className="map-section__locations-wrapper">
        {locations.length > 0 ? (
          <>
            <button
              className="map-section__toggle-btn"
              onClick={toggleLocationSection}
            >
              {showLocationSection
                ? t("mapSection.hideLocations")
                : t("mapSection.showLocations")}
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
          </>
        ) : (
          <p className="map-section__no-locations">
            {t("mapSection.noLocations")}
          </p>
        )}
      </div>
    </section>
  );
};

export default MapSection;
