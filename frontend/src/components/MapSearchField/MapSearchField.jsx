import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import {useMap, useMapEvents} from "react-leaflet";
import { GeoSearchControl, LocationIQProvider } from "leaflet-geosearch";
import 'leaflet-geosearch/assets/css/leaflet.css';
import "./MapSearchField.css";

const MapSearchField = ({ apiKey, setSelectedPosition}) => {
  const { t } = useTranslation();

  const handleLocation = (event) => {
    setSelectedPosition({lat: event.location.x, lng: event.location.y});
  };

  const provider = new LocationIQProvider({
    params: {
      key: apiKey,
    }
  });

  // @ts-ignore
  const searchControl = new GeoSearchControl({
    provider: provider,
    style: "bar",
    searchLabel: t("mapSearchField.searchLabel"),
    maxMarkers: 1,
    showMarker: false,
  });

  const map = useMap();

  useEffect(() => {
    map.addControl(searchControl);
    map.on("geosearch/showlocation", handleLocation);

    return () => {
      map.removeControl(searchControl);
      map.off("geosearch/showlocation", handleLocation);
    };
  }, [map]);

  return null;
};

export default MapSearchField;
