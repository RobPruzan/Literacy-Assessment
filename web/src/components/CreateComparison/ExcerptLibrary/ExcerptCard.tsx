import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { SelectedExcerptsActions } from '../../../redux/reducers/selectedExcerpts';
import { ExcerptInfo } from '../../../services.ts/connections';
export type ExcerptCardProps = {
  excerptInfo: ExcerptInfo;
};
export const ExcerptCard = ({ excerptInfo }: ExcerptCardProps) => {
  const dispatch = useDispatch();
  return (
    <Card>
      <div className="d-flex">
        {excerptInfo.excerpt.title} |{excerptInfo.difficulty} |
        {excerptInfo.diversity} (diversity) |{excerptInfo.topic}|
        <Button
          onClick={() =>
            dispatch({
              type: SelectedExcerptsActions.AddExcerpt,
              payload: { excerptInfo: excerptInfo },
            })
          }
        >
          Add
        </Button>
      </div>
    </Card>
  );
};
