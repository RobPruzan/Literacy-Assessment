import NorthStar from '../../../services.ts/connections';
import { useQuery } from 'react-query';

export const useGetCategories = () => {
  const getCategoriesQuery = useQuery('categories', () =>
    NorthStar.getCategories()
  );

  return getCategoriesQuery;
};
