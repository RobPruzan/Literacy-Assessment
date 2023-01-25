import NorthStar from '../../../services.ts/connections';
import { useQuery } from 'react-query';

export const useGetExcerptsByCollection = (collectionId: number) => {
  const excerptByCollectionQuery = useQuery(
    ['excerptsByCollection', collectionId],
    () => NorthStar.getExcerptsInfoByCollection(collectionId)
  );
  return excerptByCollectionQuery;
};
