import { memo, useMemo, useRef } from "react";
import { Marker, Popup } from "react-leaflet";
import useWeatherStore from "../../store/useWeatherStore";

const LocationMarker = () => {

    const selectedLocation = useWeatherStore((state) => state.selectedLocation);
    const markerRef = useRef(null);

    const eventHandlers = useMemo(() => ({
        mouseover: () => {
            markerRef.current?.openPopup();
        },
        mouseout: () => {
            markerRef.current?.closePopup();
        },
    }), []);

    if (!selectedLocation) {
        return null;
    }

    const position = [selectedLocation.lat, selectedLocation.lon];

    return (

        <Marker position={position}

            ref={markerRef}

            eventHandlers={eventHandlers}>
            <Popup>
                <h3>{selectedLocation.city}</h3>

                <p>
                    Latitude :
                    {selectedLocation.lat}
                </p>

                <p>
                    Longitude :
                    {selectedLocation.lon}
                </p>
            </Popup>
        </Marker>

    )
}

export default memo(LocationMarker);
