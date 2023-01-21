import NorthStar, {
  CollectionCreateInfo,
} from '../../../services.ts/connections';

import { RootState } from '../../../redux/store';
import { useMutation } from 'react-query';
import { useSelector } from 'react-redux';

export type CreateCollectionParams = {
  collections: CollectionCreateInfo[];
};

export const useCreateCollection = () => {
  const userId = useSelector(({ userState }: RootState) => userState.user?.id);
  const createCollectionMutation = useMutation(
    ({ collections }: CreateCollectionParams) => {
      if (userId) {
        return NorthStar.createCollection(userId, collections);
      } else {
        return Promise.reject('Invalid userid provided');
      }
    }
  );

  return createCollectionMutation;
};
