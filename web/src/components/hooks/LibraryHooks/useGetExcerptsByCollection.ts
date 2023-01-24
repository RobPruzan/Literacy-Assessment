import NorthStar from '../../../services.ts/connections';
import { useQuery } from 'react-query';

export const useGetExcerptsByCollection = (
  collectionId: number,
  collectionIndex: number
) => {
  const excerptByCollectionQuery = useQuery(
    ['excerptsByCollection', collectionIndex],
    () => NorthStar.getExcerptsInfoByCollection(collectionId)
  );
  return excerptByCollectionQuery;
};
