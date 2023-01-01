import { useState } from 'react';
import NorthStar from '../../../services.ts/connections';
import { useQuery } from 'react-query';
import CategoryCard from './CategoryCard';

export const ExcerptLibrary = () => {
  const [activePopUp, setActivePopUp] = useState(-1);

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
  if (categoriesError) {
    return <div>Error: {`We encountered an error: ${categoriesError}`}</div>;
  }

  return (
    <div className="d-flex flex-wrap justify-center sm:justify-start">
      {categoryData &&
        categoryData?.map((category, idx) => (
          <CategoryCard
            categoryId={category.id}
            categoryName={category.title}
            difficulty={category.difficulty}
            total_excerpts={category.total_excerpts}
            activePopUp={activePopUp}
            setActivePopUp={setActivePopUp}
            keyValue={idx}
          />
        ))}
    </div>
  );
};
