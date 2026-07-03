import React from 'react'
import useWeatherStore from "../../store/useWeatherStore";
import { ThermometerSun, Wind, Cloud, CloudHail, WindArrowDown, CloudSnow } from "lucide-react";
import { motion } from 'framer-motion'


const MapControls = () => {

  const { selectedLayer, setSelectedLayer } = useWeatherStore();

  const selectedStyle = "my-3 py-2 bg-blue-500 text-white px-4 py-1 rounded font-medium hover:cursor flex items-center justify-center gap-1";

  const notSelectedStyle = "my-3 py-2 bg-gray-200  px-4 py-1 rounded font-medium hover:cursor flex items-center justify-center gap-1";

  const layers = [
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
  
  return (
    <div className='absolute top-4 left-4 z-[1000] bg-white rounded-lg shadow-lg p-2 flex-col gap-4  '>
      {
        layers.map((layer) => (
          <motion.button
            initial={{opacity:0}}
            animate={{opacity :1,transition : {duration : 0.8}}}
            whileHover={{scale : 1.1}}
            whileTap={{scale :1.2}}
            key={layer.value}
            onClick={() => (
              setSelectedLayer(layer.value)
            )}
            className={
              selectedLayer === layer.value
                ? selectedStyle : notSelectedStyle
            }
          >
            < layer.icon size={18} />
            <motion.span 
            >
            </motion.span>

          </motion.button>

        ))
      }
    </div>

  )
}

export default MapControls;