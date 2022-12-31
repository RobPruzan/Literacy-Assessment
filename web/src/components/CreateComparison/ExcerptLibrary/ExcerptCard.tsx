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

  return (
    <Card
      style={{
        maxWidth: `${250 * sizeMultiplier}px`,
        minHeight: `${150 * sizeMultiplier}px`,
        margin: '10px',
      }}
    >
      <div className="d-flex">
        {isMinimal ? (
          <>{excerptInfo.excerpt.title}</>
        ) : (
          <>
            {excerptInfo.excerpt.title} |{excerptInfo.difficulty} |
            {excerptInfo.diversity} (diversity) |{excerptInfo.category.title}|
          </>
        )}

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
        {allowDelete && (
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
        )}
      </div>
    </Card>
  );
};
