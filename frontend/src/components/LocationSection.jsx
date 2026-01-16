import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import "./LocationSection.css";


export default function LocationSection () {
    return (
        <section className="location-section">
            <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                    attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
                    url="https://api.maptiler.com/maps/base-v4/256/{z}/{x}/{y}.png?key=sEQcJLkXBPo4v8VsuE7h"
                />
            </MapContainer>
        </section>
    );
}
