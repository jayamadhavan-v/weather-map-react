import React from 'react';
import { Marker, Popup } from "react-leaflet";
import useWeatherStore from "../../store/useWeatherStore";

import { useRef } from "react";


const LocationMarker = () => {

    const { selectedLocation } = useWeatherStore();
    const markerRef = useRef(null);

    if (!selectedLocation) {
        return null;
    }

    const position = [selectedLocation.lat, selectedLocation.lon];



    return (

        <Marker position={position}

            ref={markerRef}

            eventHandlers={{
                mouseover: () => {
                    markerRef.current.openPopup();
                },

                mouseout: () => {
                    markerRef.current.closePopup();
                },
            }}>
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

export default LocationMarker;