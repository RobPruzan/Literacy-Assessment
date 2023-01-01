import { Button } from '@mui/material';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import NorthStar from '../../../services.ts/connections';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
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
      className=" bg-white min-w-fit min-h-fit p-2  w-52   border-2  border-blue-200  rounded-sm m-2 shadow-md"
      key={keyValue}
    >
      <p className="text-center text-black  text-xl font-semibold mb-2">
        {categoryName}
      </p>
      <p className="text-center text-black  text-base"></p>
      <p className="text-center text-black text-base">
        Total Excerpts: {total_excerpts}
      </p>
      <p className="text-red-500  font-medium ">Difficulty: {difficulty}</p>

      <ArrowCircleRightIcon
        className="hover:cursor-pointer float-right"
        onClick={() => {
          console.log('setting active popup to', libraryData);
          setActivePopUp(keyValue);
        }}
      />

      {/* <button
        className="bg-custom-blue hover:bg-blue-700 text-lg text-white font-bold py-2 px-4 mx-2 min-w-min rounded-sm shadow-md hover:shadow-lg flex justify-center items-center"
        onClick={() => {
          console.log('setting active popup to', keyValue);
          setActivePopUp(keyValue);
        }}
      >
        Show popup
      </button> */}
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
