import NorthStar, {
  CollectionCreateInfo,
} from '../../../services.ts/connections';
import { useMutation, useQueryClient } from 'react-query';

import { RootState } from '../../../redux/store';
import { useSelector } from 'react-redux';

export type CreateCollectionParams = {
  collection: CollectionCreateInfo;
};

export const useCreateCollection = (fn?: VoidFunction) => {
  const queryClient = useQueryClient();
  const userId = useSelector(({ userState }: RootState) => userState.user?.id);
  const createCollectionMutation = useMutation(
    ({ collection }: CreateCollectionParams) => {
      console.log('is this the problem?', userId);
      if (userId) {
        return NorthStar.createCollection(userId, collection);
      } else {
        return Promise.reject('Invalid userid provided');
      }
    },
    {
      onSettled: () => {
        queryClient.invalidateQueries(['collections']);
        fn && fn();
      },
    }
  );

  return createCollectionMutation;
};
