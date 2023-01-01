import { Button } from '@mui/material';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
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
  } = useQuery(
    'excerptsByCategory',
    () => NorthStar.getExcerptsInfoByCategory(categoryId),
    {
      enabled: activePopUp === keyValue,
    }
  );
  return (
    <div
      className=" bg-white  h-40  w-28 border border-white rounded-sm m-2"
      style={{
        backgroundColor: 'white',
        borderRadius: '5px',
        border: '2px solid #0c9ced',
        minWidth: '250px',
        maxWidth: '250px',
        minHeight: '150px',

        maxHeight: '150px',
        padding: '10px',
      }}
      key={keyValue}
    >
      <p className="text-center text-custom-blue font-bold text-xl">
        {categoryName}
      </p>
      <p className="text-center text-custom-blue font-bold text-xl">
        {difficulty}
      </p>
      <p className="text-center text-custom-blue font-bold text-xl">
        {total_excerpts}
      </p>

      <button
        className="bg-custom-blue hover:bg-blue-700 text-lg text-white font-bold py-2 px-4 mx-2 min-w-min rounded-sm shadow-md hover:shadow-lg flex justify-center items-center"
        onClick={() => {
          console.log('setting active popup to', keyValue);
          setActivePopUp(keyValue);
        }}
      >
        Show popup
      </button>
      {activePopUp === keyValue && (
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
      )}
    </div>
  );
};

export default CategoryCard;
