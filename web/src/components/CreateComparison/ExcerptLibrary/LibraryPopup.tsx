import { HighlightOff } from '@mui/icons-material';
import { Button } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';
import { useMutation, useQueryClient } from 'react-query';
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
  console.log('category id', categoryId);
  console.log('data', data);
  return (
    <div className="absolute z-10 bg-white shadow-lg rounded-lg p-4 h-96  min-w-fit  w-72 overflow-y-auto border-2 border-custom-blue ">
      {isLoading || isError ? (
        <div>
          {isError ? <div> Error {`${error}`}</div> : <div>Loading...</div>}
        </div>
      ) : (
        <>
          <HighlightOff
            className="hover:cursor-pointer float-left mb-2"
            sx={{ fill: 'red' }}
            onClick={() => {
              keyValue === activePopUp && setActivePopUp(-1);
            }}
          >
            Close
          </HighlightOff>

          {data?.map((info) => (
            <div className=" mb-3">
              {categoryId === info.category.id && (
                <ExcerptCard excerptInfo={info} />
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default LibraryPopup;
