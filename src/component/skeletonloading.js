import React, { useState, useEffect } from 'react';

const AnimatedSkeletonLoader = () => {
  const [percentage, setPercentge] = useState(100);

  // Use useEffect to update the percentage in a loop
  useEffect(() => {
    const interval = setInterval(() => {
      if (percentage === 100) {
        setPercentge(1300);
      } else {
        setPercentge(100);
      }
    }, 500); // Adjust the interval to control the speed of the animation

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, [percentage]);

  return (
    <div className=''>
      <br/>
        <div className="bg-white p-4 m-4 shadow-md rounded-md animate-pulse">
            <div className=" flex items-center bg-gray-300 h-4 w-1/2 mb-2 rounded-md"></div>
            <div className="bg-gray-300 h-4 w-3/4 mb-2 rounded-md">
            <div className='bg-slate-200 h-4 w-4 rounded-x-md transition-transform delay-0 duration-500 animate-pulse' style={{ transform: `translateX(${percentage}%)`}}></div>
            </div>
            <div className="bg-gray-300 h-4 w-1/3 mb-2 rounded-md"></div>
        </div>
        <br/>
        <div className="bg-white p-4 m-4 shadow-md rounded-md animate-pulse">
            <div className=" flex items-center bg-gray-300 h-4 w-1/2 mb-2 rounded-md"></div>
            <div className="bg-gray-300 h-4 w-3/4 mb-2 rounded-md">
            <div className='bg-slate-200 h-4 w-4 rounded-x-md transition-transform delay-0 duration-500 animate-pulse' style={{ transform: `translateX(${1400-percentage}%)`}}></div>
            </div>
            <div className="bg-gray-300 h-4 w-1/3 mb-2 rounded-md"></div>
        </div>
        <br/>
        <div className="bg-white p-4 m-4 shadow-md rounded-md animate-pulse">
            <div className=" flex items-center bg-gray-300 h-4 w-1/2 mb-2 rounded-md"></div>
            <div className="bg-gray-300 h-4 w-3/4 mb-2 rounded-md">
            <div className='bg-slate-200 h-4 w-4 rounded-x-md transition-transform delay-0 duration-500 animate-pulse' style={{ transform: `translateX(${percentage}%)`}}></div>
            </div>
            <div className="bg-gray-300 h-4 w-1/3 mb-2 rounded-md"></div>
        </div> 
        <br/>
        <div className="bg-white p-4 m-4 shadow-md rounded-md animate-pulse">
            <div className=" flex items-center bg-gray-300 h-4 w-1/2 mb-2 rounded-md"></div>
            <div className="bg-gray-300 h-4 w-3/4 mb-2 rounded-md">
            <div className='bg-slate-200 h-4 w-4 rounded-x-md transition-transform delay-0 duration-500 animate-pulse' style={{ transform: `translateX(${1400-percentage}%)`}}></div>
            </div>
            <div className="bg-gray-300 h-4 w-1/3 mb-2 rounded-md"></div>
        </div> 
    </div>
  );
};

export default AnimatedSkeletonLoader;
