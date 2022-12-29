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
};
const CategoryCard = ({
  categoryId,
  categoryName,
  difficulty,
  total_excerpts,
  activePopUp,
  setActivePopUp,
  keyValue,
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
    <div className="card" key={keyValue}>
      <p>{categoryName}</p>
      <p>{difficulty}</p>
      <p>{total_excerpts}</p>

      <Button
        color="secondary"
        onClick={() => {
          console.log('setting active popup to', keyValue);
          setActivePopUp(keyValue);
        }}
      >
        Show popup
      </Button>
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
