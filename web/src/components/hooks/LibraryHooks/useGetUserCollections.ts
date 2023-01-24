import { useQuery, useQueryClient } from 'react-query';

import NorthStar from '../../../services.ts/connections';
import { RootState } from '../../../redux/store';
import { useSelector } from 'react-redux';

export const useGetUserColletions = () => {
  const queryClient = useQueryClient();
  const userId = useSelector(({ userState }: RootState) => userState.user?.id);
  const userCollectionsQuery = useQuery(
    ['user_collections'],
    () => {
      if (userId) {
        queryClient.getQueryState(['user_collections']);
        return NorthStar.getUserCollections(userId);
      } else {
        return Promise.reject('No user id');
      }
    },

    {
      onSuccess: (data) => {
        console.log('success', data.length, data);
      },
      onError: (error) => {
        console.log('error', error);
      },
    }
  );
  return userCollectionsQuery;
};
