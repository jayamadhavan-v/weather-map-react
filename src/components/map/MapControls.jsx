import { memo } from "react";
import useWeatherStore from "../../store/useWeatherStore";
import { ThermometerSun, Wind, Cloud, CloudHail, WindArrowDown } from "lucide-react";

const LAYERS = [
  {
    label: "Temperature",
    value: "temp_new",
    icon: ThermometerSun
  },
  {
    label: "Wind",
    value: "wind_new",
    icon: Wind,
  },
  {
    label: "Rain",
    value: "precipitation_new",
    icon: CloudHail,
  },
  {
    label: "Clouds",
    value: "clouds_new",
    icon: Cloud,
  },
  {
    label: "Pressure",
    value: "pressure_new",
    icon: WindArrowDown,
  },
];

const MapControls = () => {

  const selectedLayer = useWeatherStore((state) => state.selectedLayer);
  const setSelectedLayer = useWeatherStore((state) => state.setSelectedLayer);

  const selectedStyle = "my-1  bg-blue-500 text-white px-4 py-2 rounded font-medium cursor-pointer flex items-center justify-center  transition-transform hover:scale-110 active:scale-105";

  const notSelectedStyle = "my-1 bg-gray-200 px-4 py-2 rounded font-medium cursor-pointer flex items-center justify-center gap-1 transition-transform hover:scale-110 active:scale-105";
  
  return (
    <div className='absolute top-4 left-4 z-[1000] flex flex-col gap-1 bg-white rounded-lg shadow-lg p-2'>
      {
        LAYERS.map((layer) => {
          const Icon = layer.icon;

          return (
            <button
              key={layer.value}
              onClick={() => (
                setSelectedLayer(layer.value)
              )}
              className={
                selectedLayer === layer.value
                  ? selectedStyle : notSelectedStyle
              }
              title={layer.label}
              aria-label={layer.label}
            >
              <Icon size={18} />
            </button>
          );
        })
      }
    </div>

  )
}

export default memo(MapControls);
