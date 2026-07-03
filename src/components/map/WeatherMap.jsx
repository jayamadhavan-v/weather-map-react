import React from 'react'
import { MapContainer, TileLayer, } from 'react-leaflet';
import MapControl from './MapControls'
import WeatherLegend from './WeatherLegend';
import OpacityControl from './OpacityControl';
import SearchLocation from './SearchLocation';
import FlyToLocation from './FlyToLocation';
import LocationMarker from "./LocationMarker";
import useWeatherStore from "../../store/useWeatherStore";
import WeatherInfo from "../weather/WeatherInfo"

const WeatherMap = () => {

    const { selectedLayer, opacity, selectedLocation, } = useWeatherStore();
    // console.log(selectedLocation);

    const API_KEY =
        import.meta.env.VITE_OPENWEATHER_API_KEY;
   
    return (
        <div className='relative h-screen w-full'>
            <WeatherInfo />
            <MapControl />
            <WeatherLegend />
            <OpacityControl />
            <SearchLocation />


            <MapContainer
                center={[20.5937, 78.9629]}
                zoom={5}
                className='h-screen w-full'
            >
                <FlyToLocation />
                <LocationMarker />

                {/* Base Map */}
                <TileLayer
                    attribution='&copy; OpenStreetMap contributors &copy; CARTO'
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                />
                <TileLayer
                    opacity={opacity}
                    url={`https://tile.openweathermap.org/map/${selectedLayer}/{z}/{x}/{y}.png?appid=${API_KEY}`}
                />
            </MapContainer>
        </div>
    )
}

export default WeatherMap;