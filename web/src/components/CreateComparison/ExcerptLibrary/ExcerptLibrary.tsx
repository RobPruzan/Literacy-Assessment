import React from 'react';
import NorthStar from '../../../services.ts/connections';
import { useQuery } from 'react-query';
import { Card } from '../../UIComponents/Card';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { SelectedExcerptsActions } from '../../../redux/reducers/selectedExcerpts';
import { ExcerptCard } from './ExcerptCard';

export const ExcerptLibrary = () => {
  const {
    data: libraryData,
    isLoading,
    error,
  } = useQuery('excerptLibrary', () => {
    return NorthStar.getExcerptsLibrary();
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {`We encountered an error: ${error}`}</div>;
  return (
    <div className="d-flex flex-wrap">
      {/* {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
        <Card>{item}</Card>
      ))} */}
      {libraryData?.map((excerptInfo) => (
        <ExcerptCard excerptInfo={excerptInfo} />
      ))}
    </div>
  );
};
