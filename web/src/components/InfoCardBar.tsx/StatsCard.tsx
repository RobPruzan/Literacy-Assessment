import { COLOR_MAP } from '../CreateComparison/ExcerptLibrary/CategoryCard';
import { ExcerptInfo } from '../../services.ts/connections';
import React from 'react';
export type StatsCardProps = {
  excerptInfo: ExcerptInfo;
};
const StatsCard = ({ excerptInfo }: StatsCardProps) => {
  return (
    <div className="bg-white text-center text-sm   min-w-min h-max w-full">
      <hr className="mx-3 opacity-100" />
      <div className=" text-custom-blood-red text-center text-xs  w-full flex justify-evenly">
        <div>
          <p className="">Difficulty</p>
          <p
            style={{
              color: `${COLOR_MAP(excerptInfo.difficulty)}`,
            }}
            // className={`text-${COLOR_MAP(excerptInfo.difficulty)}-500`}
          >
            {excerptInfo.difficulty}%
          </p>
        </div>
        <div className="mx-2">
          <p className="inline">Diversity</p>
          <p
            style={{
              color: `${COLOR_MAP(excerptInfo.diversity)}`,
            }}
            className={`text-${COLOR_MAP(excerptInfo.diversity)}-500`}
          >
            {excerptInfo.diversity}%
          </p>
        </div>
        <div className="mx-2">
          <p>Length</p>
          <p className="text-gray-500 inline">{excerptInfo.text_length}</p>
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
