import React from 'react'
import useWeatherStore from '../../store/useWeatherStore';

const OpacityControl = () => {

    const { opacity, setOpacity } = useWeatherStore();
    return (
        <div className='absolute bottom-4 left-4 bg-white  z-[1000] rounded-lg shadow-lg px-4 py-2 font-semibold text-lg flex-col'>
            <div>
                <h3 className='flex justify-center pb-2'>Opacity Level</h3>
            </div>
            <div> <span className='mr-1'>0</span>
                <input type="range"  min={0} max={100} step={4}
                    onChange={(e) => setOpacity(e.target.value / 100)} />
                <span className='ml-1'>100%</span></div>
        </div>
    )
}

export default OpacityControl;