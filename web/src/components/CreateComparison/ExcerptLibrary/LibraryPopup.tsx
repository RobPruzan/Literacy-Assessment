import { Dispatch, SetStateAction } from 'react';

import { ExcerptCard } from './ExcerptCard';
import { ExcerptInfo } from '../../../services.ts/connections';
import { HighlightOff } from '@mui/icons-material';
import { SearchBar } from './SearchBar';
export type LibraryPopupProps = {
  isLoading: boolean;
  isError: boolean;
  error: any;
  data?: ExcerptInfo[];
  categoryId: number;
  setActivePopUp: Dispatch<SetStateAction<number>>;
  activePopUp: number;
  keyValue: number;
};
const LibraryPopup = ({
  isLoading,
  isError,
  error,
  data,
  categoryId,
  setActivePopUp,
  activePopUp,
  keyValue,
}: LibraryPopupProps) => {
  return (
    <div className="absolute z-10 bg-white shadow-lg rounded-lg sm:p-4 h-96 p-0  min-w-fit max-w-full  w-72 overflow-y-auto border-2 border-custom-blood-red ">
      {isLoading || isError ? (
        <div>
          {isError ? <div> Error {`${error}`}</div> : <div>Loading...</div>}
        </div>
      ) : (
        <div className="flex flex-col">
          <HighlightOff
            className="hover:cursor-pointer float-left mb-2 overflow-x-auto"
            sx={{ fill: 'red' }}
            onClick={() => {
              keyValue === activePopUp && setActivePopUp(-1);
            }}
          />
          <SearchBar />

          {data?.map((info) => (
            <div className="flex justify-center mb-3">
              {categoryId === info.category.id && (
                <ExcerptCard excerptInfo={info} />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LibraryPopup;
