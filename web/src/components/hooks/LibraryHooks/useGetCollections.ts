import NorthStar from '../../../services.ts/connections';
import { RootState } from '../../../redux/store';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';

export const useGetCollections = () => {
  const getCollectionsQuery = useQuery(['collections'], () =>
    NorthStar.getCollections()
  );

  return getCollectionsQuery;
};
