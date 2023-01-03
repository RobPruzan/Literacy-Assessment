import React from 'react';
import { ExcerptInfo } from '../../services.ts/connections';
export type StatsCardProps = {
  excerptInfo: ExcerptInfo;
};
const StatsCard = ({ excerptInfo }: StatsCardProps) => {
  return (
    <div className="bg-white  text-center text-sm flex min-w-min max-w-full rounded-md w-max h-max p-1">
      <div className=" text-custom-blue text-center  flex ">
        <div className="mx-2">
          <p className="">Difficulty</p>
          <p className="text-red-500 ">{excerptInfo.difficulty}%</p>
        </div>
        <div className="mx-2">
          <p className="inline">Diversity</p>
          <p className="text-green-500 ">{excerptInfo.diversity}%</p>
        </div>
        <div className="mx-2">
          <p>Length</p>
          <p className="text-black inline">{excerptInfo.text_length}</p>
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
