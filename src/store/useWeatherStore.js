import { create } from "zustand";

const useWeatherStore = create((set) => ({
  // Map State

  selectedLayer: "temp_new",
  setSelectedLayer: (layer) =>
    set({
      selectedLayer: layer,
    }),

  opacity: 0.8,
  setOpacity: (value) =>
    set({
      opacity: value,
    }),

  selectedLocation: null,
  setSelectedLocation: ({ lat, lon, city }) =>
    set({
      selectedLocation: {
        lat,
        lon,
        city,
      },
    }),

  searchLocation: "",
  setSearchLocation: (city) =>
    set({
      searchLocation: city,
    }),

  // Weather State
  currentWeather: null,
  setCurrentWeather: (weather) =>
    set({
      currentWeather: weather,
    }),

  loading: false,

  setLoading: (loading) =>
    set({
      loading,
    }),
}));

export default useWeatherStore;
