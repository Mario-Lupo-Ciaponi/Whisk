import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import "./LocationSection.css";
import "leaflet/dist/leaflet.css";


export default function LocationSection ({ mapSectionRef }) {
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
            <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                    attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
                    url="https://api.maptiler.com/maps/base-v4/{z}/{x}/{y}.png?key=sEQcJLkXBPo4v8VsuE7h"
                />
            </MapContainer>
        </section>
    );
}
