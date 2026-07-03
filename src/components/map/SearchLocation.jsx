import React from 'react'
import { motion } from 'framer-motion';
import toast from "react-hot-toast";
import useWeatherStore from "../../store/useWeatherStore";
import { getCoordinatesByCity, getCurrentWeather, } from "../../services/weatherService";

const SearchLocation = () => {

    const { searchLocation, setSearchLocation, selectedLocation, setSelectedLocation, setCurrentWeather, loading, setLoading } = useWeatherStore();

    const handleSearch = async () => {

        if (!searchLocation.trim()) {
            toast.error("Please enter a city name");
            return;
        }

        setLoading(true);
        try {

            const data = await getCoordinatesByCity(searchLocation);

            if (data.length === 0) {
                toast.error("Location not found");
                return;
            }

            const { lat, lon, name } = data[0];
            // console.log(lat, lon, name, "hadhsbvdh");
            setSelectedLocation({
                lat,
                lon,
                city: name,
            });

            const weather = await getCurrentWeather(lat, lon);

            // console.log(weather);
            setCurrentWeather(weather);
            toast.success("Weather updated");
        } catch (error) {
            toast.error("Unable to fetch weather");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleCurrentLocation = () => {

        if (!navigator.geolocation) {
            toast.error("Geolocation is not supported.");
            return;
        }

        setLoading(true);
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    const weather = await getCurrentWeather(
                        latitude,
                        longitude
                    );
                    setCurrentWeather(weather);
                    setSelectedLocation({
                        lat: latitude,
                        lon: longitude,
                        city: "My Location",
                    });
                    toast.success("Current Location Loaded");
                } catch (error) {
                    console.error(error);
                    toast.error("Unable to fetch weather");

                } finally {
                    setLoading(false);
                }
            },
            () => {
                toast.error("Unable to get your location");
                setLoading(false);
            }
        );
    };

    return (
        <div className='absolute top-4 left-20 z-[1000] flex bg-white px-4 py-2 font-semibold gap-2 rounded-lg mx-4'>
            <div>
                <input
                    type="text"
                    className='border-2 border-gray-600 px-4 py-1 bg-gray-200 rounded-lg outline-none text-red-900'
                    placeholder='Search by Location '
                    onChange={(e) => setSearchLocation(e.target.value)}
                    value={searchLocation}
                />
            </div>
            <div>
                <motion.button
                    className='border-1 py-1 px-6 bg-blue-500 text-white rounded-lg border-2 border-blue-600'
                    initial={{ opacity: 0 }}
                    whileHover={{
                        opacity: 0.8,
                    }}
                    whileTap={{
                        scale: 1.1
                    }}
                    animate={{
                        opacity: 1,
                        transition: { duration: 0.8 }
                    }}
                    onClick={() => handleSearch()}
                    disabled={loading}

                >
                    {loading ? "Loading" : "Search "}
                </motion.button>
            </div>
            <div>
                <motion.button
                    className='border-1 py-1 px-4 bg-red-500 text-white rounded-lg border-2 border-red-600'
                    initial={{ opacity: 0 }}
                    whileHover={{
                        opacity: 0.8,
                    }}
                    whileTap={{
                        scale: 1.1
                    }}
                    animate={{
                        opacity: 1,
                        transition: { duration: 0.5 }
                    }}
                    onClick={handleCurrentLocation}
                >
                    {loading ? "Loading..." : "My Location"}
                </motion.button>
            </div>
        </div>
    )
}

export default SearchLocation;