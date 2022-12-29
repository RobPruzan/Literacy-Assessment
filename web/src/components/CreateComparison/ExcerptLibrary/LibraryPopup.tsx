import { Button } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';
import { useMutation } from 'react-query';
import NorthStar, { ExcerptInfo } from '../../../services.ts/connections';
import { ExcerptCard } from './ExcerptCard';
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
    <div className="absolute z-10 bg-white shadow-lg rounded-lg p-4">
      {isLoading || isError ? (
        <div>
          {isError ? <div> Error {`${error}`}</div> : <div>Loading...</div>}
        </div>
      ) : (
        <>
          <Button
            color="secondary"
            onClick={() => {
              keyValue === activePopUp && setActivePopUp(-1);
            }}
          >
            Close
          </Button>

          {data?.map((info) => (
            <div className="border-b-2 border-gray-200 pb-2">
              <ExcerptCard excerptInfo={info} />
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default LibraryPopup;
