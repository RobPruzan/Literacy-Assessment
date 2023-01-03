import { ButtonBase } from '@mui/material';
import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import { useMutation, useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { SelectedExcerptsActions } from '../../../redux/reducers/selectedExcerpts';
import NorthStar, { ExcerptInfo } from '../../../services.ts/connections';
import LibraryPopup from './LibraryPopup';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
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
  // const tempStyle = {
  //   maxWidth: `${250 * sizeMultiplier}px`,
  //   minHeight: `${150 * sizeMultiplier}px`,
  //   margin: '10px',
  // };

  return (
    <div
      className="
    bg-custom-blue
   
    text-white
    font-bold
    py-1
    px-2
    rounded-md
    mx-2
    min-w-min
    min-h-min
    shadow-md
    hover:shadow-lg
    flex
    justify-center
    items-center 

    "
    >
      <div className="d-flex flex-col ">
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
          className="m-1 text-md  flex"
        >
          <div style={{ margin: 'auto' }}>
            {excerptInfo.excerpt.title.toUpperCase()}
          </div>
          <div style={{ alignSelf: 'flex-end' }}>
            {isMinimal ? (
              <HighlightOffIcon
                fontSize="medium"
                className="hover:cursor-pointer top-0"
                sx={{ fill: '#FE4242' }}
                onClick={() =>
                  dispatch({
                    type: SelectedExcerptsActions.RemoveExcerpt,
                    payload: { excerptInfo: excerptInfo },
                  })
                }
              />
            ) : (
              <AddCircleOutlineIcon
                className="hover:cursor-pointer  hover:fill-green-500"
                sx={{ fill: '#4EFF10' }}
                onClick={() =>
                  dispatch({
                    type: SelectedExcerptsActions.AddExcerpt,
                    payload: { excerptInfo: excerptInfo },
                  })
                }
              />
            )}
          </div>
        </div>
        <StatsCard />
      </div>
    </div>
  );
};
