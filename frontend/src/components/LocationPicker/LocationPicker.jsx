import { useState, useLayoutEffect } from "react";
import {
  MapContainer,
  Marker,
  TileLayer,
  useMapEvents,
  useMap,
} from "react-leaflet";
import api from "../../api/api.js";
import "leaflet/dist/leaflet.css";
import "./LocationPicker.css";

const MapEvents = ({ onClick }) => {
  useMapEvents({
    click(event) {
      // Gives the latitude and longitude from the event object
      onClick(event.latlng);
    },
  });

  return null;
};

const RecalculateView = () => {
  const map = useMap();

  useLayoutEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 200);

    return () => clearTimeout(timer);
  }, [map]);

  return null;
};

const LocationPicker = ({ post, setLocations, setLocationsCount }) => {
  const [selectedPosition, setSelectedPosition] = useState(null);

  const latitude = Number(post.city.latitude);
  const longitude = Number(post.city.longitude);

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
      };

      const response = await api.post("posts/location/", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setLocations((prev) => [...prev, response.data]);
      setLocationsCount((prev) => prev + 1);
      alert("Location added successfully!");
      setSelectedPosition(null);
    } catch (e) {
      console.log(e);
      alert("An Error occurred!");
    }
  };

  return (
    <>
      <MapContainer
        center={[latitude, longitude]}
        zoom={15}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
          url="https://api.maptiler.com/maps/base-v4/{z}/{x}/{y}.png?key=sEQcJLkXBPo4v8VsuE7h"
        />

        <MapEvents onClick={setSelectedPosition} />
        <RecalculateView />

        {selectedPosition && <Marker position={selectedPosition} />}
      </MapContainer>

      <button onClick={addLocation} className="add-location-btn">
        Add Location
      </button>
    </>
  );
};

export default LocationPicker;
