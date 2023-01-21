import { BsPlus, BsX } from 'react-icons/bs';
import { Dispatch, SetStateAction, useDebugValue } from 'react';
import NorthStar, {
  CollectionCreateInfo,
} from '../../../services.ts/connections';

import { AiOutlineEye } from 'react-icons/ai';
import LibraryPopup from './LibraryPopup';
import { useQuery } from 'react-query';

export const COLOR_MAP = (difficulty: number) => {
  if (difficulty <= 30) {
    return 'lime';
  } else if (difficulty <= 60) {
    return 'orange';
  } else {
    return 'red';
  }
};

export type CategoryCardProps = {
  categoryId: number;
  categoryName: string;
  difficulty: number;
  total_excerpts: number;
  activePopUp: number;
  setActivePopUp: Dispatch<SetStateAction<number>>;
  index: number;
  sizeMultiplier?: number;
  collectionsDispatch?: React.Dispatch<
    | {
        type: 'add';
        payload: {
          collection: CollectionCreateInfo;
        };
      }
    | {
        type: 'remove';
        payload: {
          index: number;
        };
      }
    | {
        type: 'reset';
      }
  >;
};
const CategoryCard = ({
  collectionsDispatch,
  categoryId,
  categoryName,
  difficulty,
  total_excerpts,
  activePopUp,
  setActivePopUp,
  index,
  sizeMultiplier = 1,
}: CategoryCardProps) => {
  const {
    data: libraryData,
    isLoading: isLibraryLoading,
    error: libraryError,
    isError: isLibraryError,
  } = useQuery(['excerptsByCategory', index], () =>
    NorthStar.getExcerptsInfoByCategory(categoryId)
  );
  useDebugValue('test');

  return (
    <>
      <div className=" bg-white min-w-fit min-h-fit p-2  w-52 relative   border-2  border-custom-blood-red border-opacity-50  rounded-md m-3 shadow-md">
        <p className="text-center text-gray-500  text-xl  mb-2">
          {categoryName}
        </p>

        <div
          style={{
            color: `${COLOR_MAP(difficulty)}`,
          }}
          className={` text-sm font-semibold`}
        >
          <p className="inline">Difficulty: </p>
          <p className="inline">{difficulty}</p>
        </div>
        <div className="text-center text-gray-500 text-sm font-semibold">
          <p className="inline">Excerpts: </p>
          <p className="inline">{total_excerpts}</p>
        </div>

        {!(activePopUp === index) && (
          <AiOutlineEye
            size={22}
            className="hover:cursor-pointer hover:fill-slate-500 hover:shadow-2xl float-left"
            onClick={() => setActivePopUp(index)}
          />
        )}
        <BsX
          onClick={() => {
            collectionsDispatch &&
              collectionsDispatch({
                type: 'remove',
                payload: { index: index },
              });
          }}
          className="top-0 right-0 absolute fill-red-500 cursor-pointer hover:fill-red-600 transition ease-in-out delay-75 hover:scale-105 scroll-smooth"
          size={30}
        />
      </div>

      {activePopUp === index && (
        <div className="float left">
          <LibraryPopup
            isLoading={isLibraryLoading}
            isError={isLibraryError}
            error={libraryError}
            data={libraryData}
            categoryId={categoryId}
            setActivePopUp={setActivePopUp}
            activePopUp={activePopUp}
            keyValue={index}
          />
        </div>
      )}
    </>
  );
};

export default CategoryCard;
