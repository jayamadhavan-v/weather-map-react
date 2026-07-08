import { memo, useCallback, useEffect, useRef, useState } from 'react';
import toast from "react-hot-toast";
import useWeatherStore from "../../store/useWeatherStore";
import { getCoordinatesByCity, getCurrentWeather, } from "../../Services/weatherService";

const SearchLocation = () => {
    const [query, setQuery] = useState("");
    const abortControllerRef = useRef(null);

    const setSelectedLocation = useWeatherStore((state) => state.setSelectedLocation);
    const setCurrentWeather = useWeatherStore((state) => state.setCurrentWeather);
    const loading = useWeatherStore((state) => state.loading);
    const setLoading = useWeatherStore((state) => state.setLoading);

    useEffect(() => {
        return () => {
            abortControllerRef.current?.abort();
        };
    }, []);

    const resetAbortController = useCallback(() => {
        abortControllerRef.current?.abort();
        const controller = new AbortController();
        abortControllerRef.current = controller;
        return controller;
    }, []);

    const handleSearch = useCallback(async (event) => {
        event?.preventDefault();

        const city = query.trim();

        if (!city) {
            toast.error("Please enter a city name");
            return;
        }

        const controller = resetAbortController();
        setLoading(true);

        try {

            const data = await getCoordinatesByCity(city, {
                signal: controller.signal,
            });

            if (data.length === 0) {
                toast.error("Location not found");
                return;
            }

            const { lat, lon, name } = data[0];
            setSelectedLocation({
                lat,
                lon,
                city: name,
            });

            const weather = await getCurrentWeather(lat, lon, {
                signal: controller.signal,
            });

            setCurrentWeather(weather);
            toast.success("Weather updated");
        } catch (error) {
            if (error.name === "AbortError") {
                return;
            }

            toast.error("Unable to fetch weather");
            console.error(error);
        } finally {
            if (abortControllerRef.current === controller) {
                setLoading(false);
            }
        }
    }, [query, resetAbortController, setCurrentWeather, setLoading, setSelectedLocation]);

    const handleCurrentLocation = useCallback(() => {

        if (!navigator.geolocation) {
            toast.error("Geolocation is not supported.");
            return;
        }

        const controller = resetAbortController();
        setLoading(true);

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    const weather = await getCurrentWeather(
                        latitude,
                        longitude,
                        {
                            signal: controller.signal,
                        },
                    );

                    setCurrentWeather(weather);
                    setSelectedLocation({
                        lat: latitude,
                        lon: longitude,
                        city: "My Location",
                    });
                    toast.success("Current Location Loaded");
                } catch (error) {
                    if (error.name === "AbortError") {
                        return;
                    }

                    console.error(error);
                    toast.error("Unable to fetch weather");

                } finally {
                    if (abortControllerRef.current === controller) {
                        setLoading(false);
                    }
                }
            },
            () => {
                if (abortControllerRef.current === controller) {
                    toast.error("Unable to get your location");
                    setLoading(false);
                }
            },
            {
                enableHighAccuracy: false,
                maximumAge: 300000,
                timeout: 10000,
            },
        );
    }, [resetAbortController, setCurrentWeather, setLoading, setSelectedLocation]);

    return (
        <form
            className='absolute top-4 left-20 right-4 z-[1000] flex flex-wrap bg-white px-4 py-2 font-semibold gap-2 rounded-lg shadow-lg sm:right-auto'
            onSubmit={handleSearch}
        >
            <div className='min-w-0 flex-1 sm:flex-none'>
                <input
                    type="text"
                    className='w-full border-2 border-gray-600 px-4 py-1 bg-gray-200 rounded-lg outline-none text-red-900 sm:w-64'
                    placeholder='Search by Location '
                    aria-label="Search city"
                    onChange={(e) => setQuery(e.target.value)}
                    value={query}
                />
            </div>
            <div>
                <button
                    type="submit"
                    className='py-1 px-6 bg-blue-500 text-white rounded-lg border-2 border-blue-600 transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-60'
                    disabled={loading}

                >
                    {loading ? "Loading" : "Search "}
                </button>
            </div>
            <div>
                <button
                    type="button"
                    className='py-1 px-4 bg-red-500 text-white rounded-lg border-2 border-red-600 transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-60'
                    onClick={handleCurrentLocation}
                    disabled={loading}
                >
                    {loading ? "Loading..." : "My Location"}
                </button>
            </div>
        </form>
    )
}

export default memo(SearchLocation);
