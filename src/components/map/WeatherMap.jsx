import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import MapControl from './MapControls'
import WeatherLegend from './WeatherLegend';
import OpacityControl from './OpacityControl';
import SearchLocation from './SearchLocation';
import FlyToLocation from './FlyToLocation';
import LocationMarker from "./LocationMarker";
import useWeatherStore from "../../store/useWeatherStore";
import WeatherInfo from "../weather/WeatherInfo"

const INDIA_CENTER = [20.5937, 78.9629];
const BASE_TILE_URL = "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";
const OPENWEATHER_TILE_URL = "https://tile.openweathermap.org/map";
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

const WeatherTileLayer = () => {
    const selectedLayer = useWeatherStore((state) => state.selectedLayer);
    const opacity = useWeatherStore((state) => state.opacity);

    return (
        <TileLayer
            updateWhenIdle
            updateInterval={250}
            keepBuffer={4}
            opacity={opacity}
            zIndex={2}
            url={`${OPENWEATHER_TILE_URL}/${selectedLayer}/{z}/{x}/{y}.png?appid=${API_KEY}`}
        />
    );
};

const WeatherMap = () => {
    return (
        <div className='relative h-screen w-full'>
            <WeatherInfo />
            <MapControl />
            <WeatherLegend />
            <OpacityControl />
            <SearchLocation />


            <MapContainer
                center={INDIA_CENTER}
                zoom={5}
                minZoom={3}
                maxZoom={12}
                preferCanvas
                zoomControl={false}
                className='h-screen w-full'
            >
                <FlyToLocation />
                <LocationMarker />
                <ZoomControl position="topright" />

                {/* Base Map */}
                <TileLayer
                    attribution='&copy; OpenStreetMap contributors &copy; CARTO'
                    updateWhenIdle
                    updateInterval={250}
                    keepBuffer={4}
                    zIndex={1}
                    url={BASE_TILE_URL}
                />
                <WeatherTileLayer />
            </MapContainer>
        </div>
    )
}

export default WeatherMap;
