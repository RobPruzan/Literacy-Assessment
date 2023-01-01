import React from 'react';

const StatsCard = () => {
  return (
    <div className="bg-white  text-center text-sm flex min-w-min rounded-md w-max h-max p-1">
      <div className=" text-custom-blue text-center  flex ">
        <div className="mx-2">
          <p className="">Difficulty</p>
          <p className="text-red-500 ">98.1%</p>
        </div>
        <div className="mx-2">
          <p className="inline">Diversity</p>
          <p className="text-green-500 ">75%</p>
        </div>
        <div className="mx-2">
          <p>Length</p>
          <p className="text-black inline">298</p>
        </div>

        {/* <p className="inline"> Text Length</p>
        
      </div>
      <div className="text-center ">
       
       */}
      </div>
    </div>
  );
};

export default StatsCard;
