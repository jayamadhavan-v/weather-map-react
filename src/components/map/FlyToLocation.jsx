import { useEffect } from "react";
import { useMap } from "react-leaflet";
import useWeatherStore from "../../store/useWeatherStore";

const FlyToLocation = () => {
  const map = useMap();

  const selectedLocation = useWeatherStore((state) => state.selectedLocation);

  useEffect(() => {
    if (!selectedLocation) return;

    const position = [
      selectedLocation.lat,
      selectedLocation.lon,
    ];

    map.flyTo(
      position,
      12,
      {
        animate: true,
        duration: 1.2,
        easeLinearity: 0.25,
      }
    );
  }, [selectedLocation, map]);

  return null;
};

export default FlyToLocation;
