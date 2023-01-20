import { BsPlusLg } from 'react-icons/bs';
import CategoryCard from './CategoryCard';
import CollectionCreate from './CollectionCreate/CollectionCreate';
import { IoCreateOutline } from 'react-icons/io5';
import NorthStar from '../../../services.ts/connections';
import { useGetCategories } from '../../hooks/LibraryHooks/useGetCategories';
import { useGetExcerptsLibrary } from '../../hooks/LibraryHooks/useGetExcerptsLibrary';
import { useQuery } from 'react-query';
import { useState } from 'react';

export const ExcerptLibrary = () => {
  const [activePopUp, setActivePopUp] = useState(-1);

  const getExcerptsQuery = useGetExcerptsLibrary();
  const getCategoriesQuery = useGetCategories();

  if (getCategoriesQuery.isLoading) return <div>Loading...</div>;
  if (getCategoriesQuery.isError) {
    return (
      <div>Error: {`We encountered an error: ${getCategoriesQuery.error}`}</div>
    );
  }

  return (
    <div className="flex flex-wrap justify-center">
      {getCategoriesQuery.isSuccess &&
        getCategoriesQuery.data?.map((category, idx) => (
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
