import { Dispatch, SetStateAction, useDebugValue } from 'react';

import { AiOutlineEye } from 'react-icons/ai';
import { BsPlus } from 'react-icons/bs';
import LibraryPopup from './LibraryPopup';
import NorthStar from '../../../services.ts/connections';
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
  keyValue: number;
  sizeMultiplier?: number;
};
const CategoryCard = ({
  categoryId,
  categoryName,
  difficulty,
  total_excerpts,
  activePopUp,
  setActivePopUp,
  keyValue,
  sizeMultiplier = 1,
}: CategoryCardProps) => {
  const {
    data: libraryData,
    isLoading: isLibraryLoading,
    error: libraryError,
    isError: isLibraryError,
  } = useQuery(['excerptsByCategory', keyValue], () =>
    NorthStar.getExcerptsInfoByCategory(categoryId)
  );
  useDebugValue('test');

  return (
    <>
      <div
        className=" bg-white min-w-fit min-h-fit p-2  w-52 relative   border-2  border-custom-blood-red border-opacity-50  rounded-md m-3 shadow-md"
        key={keyValue}
      >
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

        {!(activePopUp === keyValue) && (
          <AiOutlineEye
            size={22}
            className="hover:cursor-pointer hover:fill-slate-500 hover:shadow-2xl float-left"
            onClick={() => setActivePopUp(keyValue)}
          />
        )}
        <BsPlus
          size={40}
          className="absolute bottom-0 right-0 cursor-pointer fill-emerald-400 hover:shadow-2xl hover:fill-emerald-500 hover:scale-105"
        />
      </div>

      {activePopUp === keyValue && (
        <div className="float left">
          <LibraryPopup
            isLoading={isLibraryLoading}
            isError={isLibraryError}
            error={libraryError}
            data={libraryData}
            categoryId={categoryId}
            setActivePopUp={setActivePopUp}
            activePopUp={activePopUp}
            keyValue={keyValue}
          />
        </div>
      )}
    </>
  );
};

export default CategoryCard;
