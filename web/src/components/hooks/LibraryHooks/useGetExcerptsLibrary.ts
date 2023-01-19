import NorthStar from '../../../services.ts/connections';
import { useQuery } from 'react-query';

export const useGetExcerptsLibrary = () => {
  const getExcerptsQuery = useQuery('excerptLibrary', () =>
    NorthStar.getExcerptsLibrary()
  );

  return getExcerptsQuery;
};
