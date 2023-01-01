import { ButtonBase } from '@mui/material';
import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import { useMutation, useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { SelectedExcerptsActions } from '../../../redux/reducers/selectedExcerpts';
import NorthStar, { ExcerptInfo } from '../../../services.ts/connections';
import LibraryPopup from './LibraryPopup';
// import mui button
import { Button } from '@mui/material';
import StatsCard from '../../InfoCardBar.tsx/StatsCard';
export type ExcerptCardProps = {
  excerptInfo: ExcerptInfo;
  allowDelete?: boolean;
  sizeMultiplier?: number;
  isMinimal?: boolean;
};
export const ExcerptCard = ({
  excerptInfo,
  allowDelete,
  sizeMultiplier = 1,
  isMinimal = false,
}: ExcerptCardProps) => {
  const dispatch = useDispatch();

  // useMutation
  const tempStyle = {
    maxWidth: `${250 * sizeMultiplier}px`,
    minHeight: `${150 * sizeMultiplier}px`,
    margin: '10px',
  };

  return (
    <div
      className="
    bg-custom-blue
    hover:bg-blue-700
    text-white
    font-bold
    py-2
    px-3 
    rounded-md
    mx-2
    min-w-min
    
    shadow-md
    hover:shadow-lg
    flex
    justify-center
    items-center
    "
      style={tempStyle}
    >
      <div className="d-flex flex-col ">
        <>{excerptInfo.excerpt.title}</>
        <StatsCard />
        {/* {isMinimal ? (
          <Button
            color="secondary"
            onClick={() =>
              dispatch({
                type: SelectedExcerptsActions.RemoveExcerpt,
                payload: { excerptInfo: excerptInfo },
              })
            }
          >
            Remove
          </Button>
        ) : (
          <Button
            color="secondary"
            onClick={() =>
              dispatch({
                type: SelectedExcerptsActions.AddExcerpt,
                payload: { excerptInfo: excerptInfo },
              })
            }
          >
            Add
          </Button>
        )} */}
      </div>
    </div>
  );
};
