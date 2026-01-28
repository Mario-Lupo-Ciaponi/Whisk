import {useState} from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import LocationCard from "./cards/LocationCard.jsx";
import LocationSection from "./LocationSection.jsx";
import api from "../api/api.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import "./MapSection.css";
import "leaflet/dist/leaflet.css";

const MapEvents = ({ onClick }) => {
    useMapEvents({
        click(event) {
            // Gives the latitude and longitude from the event object
            onClick(event.latlng);
        }
    });

    return null;
}

const MapSection = ({ mapSectionRef, post, locations, setLocations }) => {
    const [selectedPosition, setSelectedPosition] = useState(null);
    const [showLocationSection, setShowLocationSection] = useState(false);

    const addLocation = async () => {
        try {
            if (!selectedPosition) {
                alert("Please select a location!");
                return;
            }
            const latitude = selectedPosition.lat;
            const longitude = selectedPosition.lng;

            const data = {
                latitude: latitude.toFixed(6),
                longitude: longitude.toFixed(6),
                post_id: post.id,
            }

            const response = await api.post("posts/location/", data, {
                headers: {
                    "Content-Type": "application/json",
                }
            });

            setLocations(prev => [...prev, response.data]);
            alert("Location added successfully!");
        } catch (e) {
            console.log(e)
            alert("An Error occurred!")
        }
    }
    const toggleLocationSection = () => setShowLocationSection(!showLocationSection);

    return (
        <section ref={mapSectionRef} className="map-section">
            <header className="section-header">
                <h3 className="section-title">
                    Pet Location
                </h3>
                <p className="section-description">
                    Select a location where you have seen the pet
                </p>
            </header>


            <MapContainer
                center={[0, 0]}
                zoom={1}
                scrollWheelZoom={false}>
                <TileLayer
                    attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
                    url="https://api.maptiler.com/maps/base-v4/{z}/{x}/{y}.png?key=sEQcJLkXBPo4v8VsuE7h"
                />
                <MapEvents onClick={setSelectedPosition} />

                {selectedPosition && <Marker position={selectedPosition} />}
            </MapContainer>


            <button onClick={addLocation} className="add-location-btn">
                Add Location
            </button>

            <div className="locations-wrapper">
                <button className="show-locations-btn" onClick={toggleLocationSection}>
                    {showLocationSection ? "Hide" : "Show"} Locations Provided
                    <FontAwesomeIcon icon={showLocationSection ? faCaretUp : faCaretDown} />
                </button>

                <LocationSection showSection={showLocationSection} locations={locations} />
            </div>
        </section>
    );
}

export default MapSection;
