import { COLOR_MAP } from '../CreateComparison/Library/CollectionCard';
export type StatsCardProps = {
  // excerptInfo: ExcerptInfo;
  difficulty?: number;
  diversity?: number;
  text_length: number;
};
const StatsCard = ({ difficulty, diversity, text_length }: StatsCardProps) => {
  return (
    <div className="h-max w-full min-w-min   bg-white text-center text-sm">
      <hr className="mx-3 opacity-100" />
      <div className=" flex w-full justify-evenly  text-center text-xs text-custom-blood-red">
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
          <p className="inline text-gray-500">{text_length}</p>
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
