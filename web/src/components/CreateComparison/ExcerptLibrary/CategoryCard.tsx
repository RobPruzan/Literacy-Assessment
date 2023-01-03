import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { Dispatch, SetStateAction, useDebugValue } from 'react';
import { useQuery } from 'react-query';
import NorthStar from '../../../services.ts/connections';
import LibraryPopup from './LibraryPopup';
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
    <div
      className=" bg-white min-w-fit min-h-fit p-2  w-52   border-2  border-custom-blue border-opacity-50  rounded-md m-2 shadow-md"
      key={keyValue}
    >
      <p className="text-center text-black  text-xl  mb-2">{categoryName}</p>
      <p className="text-center text-black  text-base"></p>
      <p className="text-red-500 text-sm font-semibold">
        <p className="inline">Difficulty: </p>
        <p className="inline">{difficulty}</p>
      </p>
      <p className="text-center text-black text-sm font-semibold">
        <p className="inline">Excerpts: </p>
        <p className="inline">{total_excerpts}</p>
      </p>

      {!(activePopUp === keyValue) && (
        <ArrowCircleRightIcon
          className="hover:cursor-pointer float-left"
          onClick={() => setActivePopUp(keyValue)}
        />
      )}

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
    </div>
  );
};

export default CategoryCard;
