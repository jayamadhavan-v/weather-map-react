import { create } from "zustand";

const useWeatherStore = create((set) => ({
  selectedLayer: "temp_new",
  setSelectedLayer: (layer) =>
    set((state) =>
      state.selectedLayer === layer
        ? state
        : {
            selectedLayer: layer,
          },
    ),

  opacity: 0.8,
  setOpacity: (value) =>
    set((state) => {
      const opacity = Math.min(1, Math.max(0, value));

      return state.opacity === opacity
        ? state
        : {
            opacity,
          };
    }),

  selectedLocation: null,
  setSelectedLocation: ({ lat, lon, city }) =>
    set((state) => {
      const current = state.selectedLocation;

      if (
        current &&
        current.lat === lat &&
        current.lon === lon &&
        current.city === city
      ) {
        return state;
      }

      return {
        selectedLocation: {
          lat,
          lon,
          city,
        },
      };
    }),

  currentWeather: null,
  setCurrentWeather: (weather) =>
    set((state) =>
      state.currentWeather === weather
        ? state
        : {
            currentWeather: weather,
          },
    ),

  loading: false,
  setLoading: (loading) =>
    set((state) =>
      state.loading === loading
        ? state
        : {
            loading,
          },
    ),
}));

export default useWeatherStore;
