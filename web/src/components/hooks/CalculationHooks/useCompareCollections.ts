import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../../redux/store';
import useSequentialComparison from './useSequentialComparison';

const useCompareCollections = () => {
  const dispatch = useDispatch();
  const selectedCollections = useSelector(
    ({ selectedCollectionState }: RootState) =>
      selectedCollectionState.selectedCollections
  );
  // const stuff = useGetExcerptsByCollection()
  // stuff.refetch()

  const sequentialComparisonHelpers = useSequentialComparison();
  const handleCompareCollections = () => {
    const collection_ids = selectedCollections?.forEach((collection) => {
      sequentialComparisonHelpers.grammarHelpers.mutate({
        excerpt_ids: collection.excerpt_ids,
      });
      sequentialComparisonHelpers.readabilityMeasuresHelper.mutate({
        excerpt_ids: collection.excerpt_ids,
      });
      sequentialComparisonHelpers.difficultyHelper.mutate({
        excerpt_ids: collection.excerpt_ids,
      });
      sequentialComparisonHelpers.diversityHelper.mutate({
        excerpt_ids: collection.excerpt_ids,
      });
      sequentialComparisonHelpers.slidingWindowStatsHelper.mutate({
        excerpt_ids: collection.excerpt_ids,
      });
    });
  };

  function immediatelyInvokeHelperAndDispatch<P, T>(dispatchContent: {
    payload: P;
    type: T;
  }) {
    dispatch(dispatchContent);
  }
};
