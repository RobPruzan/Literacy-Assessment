import { useQuery, useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import NorthStar from '../../../services.ts/connections';

export const useGetUserColletions = () => {
  const queryClient = useQueryClient();
  const userId = useSelector(({ userState }: RootState) => userState.user?.id);
  const userCollectionsQuery = useQuery(['user_collections'], () => {
    if (userId) {
      queryClient.getQueryState('user_collections').
      return NorthStar.getUserCollections(userId);
    } else {
      return Promise.reject('No user id');
    }
  });
  return userCollectionsQuery;
};
