import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import useWeatherStore from "../../store/useWeatherStore";

const FlyToLocation = () => {
  const map = useMap();

  const { selectedLocation } = useWeatherStore();
  const isInitialRender = useRef(true);

  useEffect(() => {

    if (isInitialRender.current) {
    isInitialRender.current = false;
    return;
  }
    if (!selectedLocation) return;

    map.flyTo(
      [
        selectedLocation.lat,
        selectedLocation.lon,
      ],
      12,
      {
        animate: true,
        duration: 1.8,
      }
    );
  }, [selectedLocation, map]);

  return null;
};

export default FlyToLocation;