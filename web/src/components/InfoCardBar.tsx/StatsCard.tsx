import { COLOR_MAP } from '../CreateComparison/ExcerptLibrary/CollectionCard';
import { ExcerptInfo } from '../../services.ts/connections';
import React from 'react';
export type StatsCardProps = {
  // excerptInfo: ExcerptInfo;
  difficulty?: number;
  diversity?: number;
  text_length: number;
};
const StatsCard = ({ difficulty, diversity, text_length }: StatsCardProps) => {
  return (
    <div className="bg-white text-center text-sm   min-w-min h-max w-full">
      <hr className="mx-3 opacity-100" />
      <div className=" text-custom-blood-red text-center text-xs  w-full flex justify-evenly">
        <div>
          <p className="">Difficulty</p>
          <p
            style={
              difficulty
                ? {
                    color: `${COLOR_MAP(difficulty)}`,
                  }
                : undefined
            }
            // className={`text-${COLOR_MAP(excerptInfo.difficulty)}-500`}
          >
            {difficulty}%
          </p>
        </div>
        <div className="mx-2">
          <p className="inline">Diversity</p>
          <p
            style={
              diversity
                ? {
                    color: `${COLOR_MAP(diversity)}`,
                  }
                : undefined
            }
            className={
              diversity ? `text-${COLOR_MAP(diversity)}-500` : 'text-gray-600'
            }
          >
            {diversity}%
          </p>
        </div>
        <div className="mx-2">
          <p>Length</p>
          <p className="text-gray-500 inline">{text_length}</p>
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
