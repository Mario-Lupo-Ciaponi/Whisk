import {useState} from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import api from "../api/api.js";
import "./LocationSection.css";
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

const LocationSection = ({ mapSectionRef, post }) => {
    const [selectedPosition, setSelectedPosition] = useState(null);

    const addLocation = async () => {
        try {
            const latitude = selectedPosition.lat;
            const longitude = selectedPosition.lng;

            const data = {
                latitude: latitude.toFixed(6),
                longitude: longitude.toFixed(6),
                post_id: post.id,
            }

            await api.post("posts/location/", data, {
                headers: {
                    "Content-Type": "application/json",
                }
            });
            alert("Location added successfully!")
        } catch (e) {
            console.log(e)
            alert("An Error occurred!")
        }
    }

    return (
        <section ref={mapSectionRef} className="location-section">
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
        </section>
    );
}

export default LocationSection;
