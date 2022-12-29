import { Button } from '@mui/material';
import React, { useState } from 'react';
import { useMutation } from 'react-query';
import NorthStar from '../../../services.ts/connections';
import LibraryPopup from './LibraryPopup';
export type CategoryCardProps = {
  categoryId: number;
  categoryName: string;
  difficulty: number;
  total_excerpts: number;
};
const CategoryCard = ({
  categoryId,
  categoryName,
  difficulty,
  total_excerpts,
}: CategoryCardProps) => {
  const [showPopup, setShowPopup] = useState(false);
  const { isLoading, isSuccess, isError, data, error, mutate } = useMutation(
    () => NorthStar.getExcerptsInfoByCategory(categoryId)
  );
  return (
    <div className="card">
      <p>{categoryName}</p>
      <p>{difficulty}</p>
      <p>{total_excerpts}</p>

      <Button
        color="secondary"
        onClick={() => {
          setShowPopup(!showPopup);
          mutate();
        }}
      >
        Show popup
      </Button>
      {showPopup && (
        <LibraryPopup
          isLoading={isLoading}
          isError={isError}
          error={error}
          data={data}
          categoryId={categoryId}
          setShowPopup={setShowPopup}
        />
      )}
    </div>
  );
};

export default CategoryCard;
