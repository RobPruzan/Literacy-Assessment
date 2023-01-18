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
    <div
      style={{
        zIndex: 200,
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      }}
      className="
      flex flex-row justify-center items-center"
      //  bg-white flex justify-center shadow-lg rounded-sm sm:p-4 h-96 p-0  min-w-fit max-w-full  w-72 overflow-y-auto border-2 border-custom-blood-red "
    >
      <div className="   bg-white flex justify-center shadow-lg rounded-sm sm:p-4 h-96 p-0  min-w-fit max-w-full  w-72 overflow-y-auto border-2 border-custom-blood-red ">
        ``{' '}
        {isLoading || isError ? (
          <div>
            {isError ? <div> Error {`${error}`}</div> : <div>Loading...</div>}
          </div>
        ) : (
          <div className="flex flex-col">
            <HighlightOff
              sx={{ fill: 'red' }}
              className="hover:cursor-pointer hover:scale-110 hover:fill-red-700 float-left mb-2 overflow-x-auto"
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
    </div>
  );
};

export default LibraryPopup;
