import { Dispatch, SetStateAction } from 'react';

import { HighlightOff } from '@mui/icons-material';
import { ExcerptInfo } from '../../../services.ts/connections';
import { ExcerptCard } from './ExcerptCard';
import { SearchBar } from './SearchBar';

export type LibraryPopupProps = {
  isLoading: boolean;
  isError: boolean;
  error: any;
  excerptsInfo?: ExcerptInfo[];
  collectionId: number;
  setActivePopUp: Dispatch<SetStateAction<number>>;
  activePopUp: number;
};
const LibraryPopup = ({
  isLoading,
  isError,
  error,
  excerptsInfo,
  collectionId,
  setActivePopUp,
  activePopUp,
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
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      }}
      className="
      flex flex-row items-center justify-center"
      //  bg-white flex justify-center shadow-lg rounded-sm sm:p-4 h-96 p-0  min-w-fit max-w-full  w-72 overflow-y-auto border-2 border-custom-blood-red "
    >
      <div className="   flex h-96 w-72 min-w-fit max-w-full justify-center overflow-y-auto rounded-sm  border-2 border-custom-blood-red  bg-white p-0 shadow-lg sm:p-4 ">
        {isLoading || isError ? (
          <div>
            {isError ? <div> Error {`${error}`}</div> : <div>Loading...</div>}
          </div>
        ) : (
          <div className="flex flex-col">
            <HighlightOff
              sx={{ fill: 'red' }}
              className="float-left mb-2 overflow-x-auto hover:scale-110 hover:cursor-pointer hover:fill-red-700"
              onClick={() => {
                collectionId === activePopUp && setActivePopUp(-1);
              }}
            />
            <SearchBar />

            {excerptsInfo?.map((excerptInfo) => (
              <div className="mb-3 flex justify-center">
                {collectionId === excerptInfo.excerpt.collection.id && (
                  <ExcerptCard
                    difficulty={excerptInfo.difficulty}
                    diversity={excerptInfo.diversity}
                    text_length={excerptInfo.text_length}
                    title={excerptInfo.excerpt.title}
                  />
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
