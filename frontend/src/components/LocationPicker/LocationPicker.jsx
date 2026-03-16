import { useState, useLayoutEffect } from "react";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import {
  MapContainer,
  Marker,
  TileLayer,
  useMapEvents,
  useMap,
} from "react-leaflet";
import MapSearchField from "../MapSearchField/MapSearchField.jsx";
import Loader from "../Loader.jsx";
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

const RecalculateView = ({ trigger }) => {
  const map = useMap();

  useLayoutEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 300);

    return () => clearTimeout(timer);
  }, [map, trigger]);

  return null;
};

const LocationPicker = ({
  post,
  setLocations,
  setLocationsCount,
  activeSection,
}) => {
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const openMapsApiKey = import.meta.env.VITE_MAPTILER_API_KEY;
  const locationIQApiKey = import.meta.env.VITE_LOCATION_IQ_API_KEY;

  const latitude = Number(post.city.latitude);
  const longitude = Number(post.city.longitude);

  const addLocation = async () => {
    setIsLoading(true);

    try {
      if (!selectedPosition) {
        toast.error(t("locationPicker.selectLocation"));
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

      setSelectedPosition(null);
      toast.success(t("locationPicker.locationAdded"));
    } catch (e) {
      const errorData = e.response?.data;

      if (e.response?.status === 400) {
        const errorValue = Object.values(errorData)[0];

        const message = Array.isArray(errorValue) ? errorValue[0] : errorValue;

        toast.error(message || t("createPostPage.postForm.invalidData"));
      } else if (e.response?.status === 429) {
        toast.error(t("locationPicker.tooManyRequests"));
      } else {
        toast.error(t("locationPicker.error"));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <MapContainer
        center={[latitude, longitude]}
        zoom={20}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
          url={`https://api.maptiler.com/maps/base-v4/{z}/{x}/{y}.png?key=${openMapsApiKey}`}
        />

        <MapSearchField
          apiKey={locationIQApiKey}
          setSelectedPosition={setSelectedPosition}
        />

        <MapEvents onClick={setSelectedPosition} />
        <RecalculateView trigger={activeSection} />

        {selectedPosition && <Marker position={selectedPosition} />}
      </MapContainer>

      <button onClick={addLocation} className="add-location-btn">
        {isLoading ? (
          <Loader height={25} width={25} />
        ) : (
          t("locationPicker.addLocation")
        )}
      </button>
    </>
  );
};

export default LocationPicker;
