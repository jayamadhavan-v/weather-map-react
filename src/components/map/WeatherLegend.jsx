import React from 'react'
import useWeatherStore from "../../store/useWeatherStore";
import { LEGEND_CONFIG } from "../../constants/legendConfig";


const WeatherLegend = () => {

   const { selectedLayer } = useWeatherStore();
   const legend = LEGEND_CONFIG[selectedLayer] || LEGEND_CONFIG.temp_new;

   return (
      <div className="absolute bottom-6 right-4 z-[1000] bg-white rounded-lg shadow-lg px-4 py-2 flex-row gap-2 " >
         <h3 className='font-semibold text-gray-800 mb-3'>
            {legend.title}
         </h3>
         <div>
            {
               legend.items.map((item) => (
                  <div
                     key={item.label}
                     className="flex items-center gap-3"
                  >
                     <span
                        className="w-4 h-4 rounded-full border"
                        style={{
                           backgroundColor: item.color,
                        }}
                     />

                     <span className="text-sm text-gray-700">
                        {item.label}
                     </span>
                  </div>
               ))
            }
         </div>
      </div>
   );
}

export default WeatherLegend;