import React from 'react';
import NorthStar from '../../../services.ts/connections';
import { useQuery } from 'react-query';
import { Card } from '../../UIComponents/Card';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { SelectedExcerptsActions } from '../../../redux/reducers/selectedExcerpts';
import { ExcerptCard } from './ExcerptCard';
import CategoryCard from './CategoryCard';

export const ExcerptLibrary = () => {
  const {
    data: libraryData,
    isLoading,
    error,
  } = useQuery('excerptLibrary', () => NorthStar.getExcerptsLibrary());
  const {
    data: categoryData,
    isLoading: isCategoriesLoading,
    error: categoriesError,
  } = useQuery('categories', () => NorthStar.getCategories());

  if (isCategoriesLoading) return <div>Loading...</div>;
  if (categoriesError)
    return <div>Error: {`We encountered an error: ${categoriesError}`}</div>;
  return (
    <div className="d-flex flex-wrap">
      {categoryData &&
        categoryData?.map((category) => (
          <CategoryCard
            categoryId={category.id}
            categoryName={category.title}
            difficulty={category.difficulty}
            total_excerpts={category.total_excerpts}
          />
        ))}
    </div>
  );
};
