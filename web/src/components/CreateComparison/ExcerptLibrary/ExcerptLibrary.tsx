import { BsPlusLg } from 'react-icons/bs';
import CategoryCard from './CategoryCard';
import NorthStar from '../../../services.ts/connections';
import { useQuery } from 'react-query';
import { useState } from 'react';

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
      <div className="hover:bg-gray-50 hover:shadow-xl hover:fill-emerald-400  hover:border-opacity-50 min-w-fit min-h-fit p-2  w-52 flex justify-center items-center cursor-pointer  border-2  border-custom-blood-red hover:border-red-400 border-opacity-50  rounded-md m-3 shadow-md">
        <BsPlusLg className="" size={40} color="3CC90A" />
      </div>
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
