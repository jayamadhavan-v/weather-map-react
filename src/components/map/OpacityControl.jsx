import { memo } from 'react';
import useWeatherStore from '../../store/useWeatherStore';

const OpacityControl = () => {

    const opacity = useWeatherStore((state) => state.opacity);
    const setOpacity = useWeatherStore((state) => state.setOpacity);

    return (
        <div className='absolute bottom-4 left-4 bg-white z-[1000] rounded-lg shadow-lg px-4 py-2 font-semibold text-lg'>
            <div>
                <label
                    className='flex justify-center pb-2'
                    htmlFor='weather-opacity'
                >
                    Opacity Level
                </label>
            </div>
            <div> <span className='mr-1'>0%</span>
                <input
                    id='weather-opacity'
                    type="range"
                    min={0}
                    max={100}
                    step={4}
                    value={Math.round(opacity * 100)}
                    aria-label="Weather layer opacity"
                    onChange={(e) => setOpacity(Number(e.target.value) / 100)}
                />
                <span className='ml-1'>100%</span></div>
        </div>
    )
}

export default memo(OpacityControl);
