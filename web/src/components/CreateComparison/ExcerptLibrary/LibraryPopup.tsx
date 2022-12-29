import { Button } from '@mui/material';
import React from 'react';
import { useMutation } from 'react-query';
import NorthStar, { ExcerptInfo } from '../../../services.ts/connections';
import { ExcerptCard } from './ExcerptCard';
export type LibraryPopupProps = {
  isLoading: boolean;
  isError: boolean;
  error: any;
  data?: ExcerptInfo[];
  categoryId: number;
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
};
const LibraryPopup = ({
  isLoading,
  isError,
  error,
  data,
  categoryId,
  setShowPopup,
}: LibraryPopupProps) => {
  return (
    <div className="absolute z-10 bg-white shadow-lg rounded-lg p-4">
      {isLoading || isError ? (
        <div>
          {isError ? <div> Error {`${error}`}</div> : <div>Loading...</div>}
        </div>
      ) : (
        data?.map((info) => (
          <div className="border-b-2 border-gray-200 pb-2">
            <Button color="secondary" onClick={() => setShowPopup(false)}>
              Close
            </Button>
            <ExcerptCard excerptInfo={info} />
          </div>
        ))
      )}
    </div>
  );
};

export default LibraryPopup;
