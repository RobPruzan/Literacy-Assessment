import { useDispatch, useSelector } from 'react-redux';
import { CollectionCollectionActions } from '../../../redux/reducers/collectionCalculation';

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
  const difficultySuccessHandler = () => {
    dispatch({
      type: CollectionCollectionActions.UpdateCollectionDifficulty,
      payload: {
        collectionId: 1,
        difficulty: [1, 2, 4],
      },
    });
  };

  const diversitySuccessHandler = () => {
    dispatch({
      type: CollectionCollectionActions.UpdateCollectionDiversity,
      payload: {
        collectionId: 1,
        diversity: [1, 2, 4],
      },
    });
  };

  const grammarSuccessHandler = () => {
    dispatch({
      type: CollectionCollectionActions.UpdateCollectionGrammar,
      payload: {
        collectionId: 1,
        grammar: [1, 2, 4],
      },
    });
  };

  const readabilityMeasuresSuccessHandler = () => {
    dispatch({
      type: CollectionCollectionActions.UpdateCollectionReadabilityMeasures,
      payload: {
        collectionId: 1,
        readabilityMeasures: [1, 2, 4],
      },
    });
  };

  const slidingWindowStatsSuccessHandler = () => {
    dispatch({
      type: CollectionCollectionActions.UpdateCollectionSlidingWindowStats,
      payload: {
        collectionId: 1,
        slidingWindowStats: [1, 2, 4],
      },
    });
  };

  const sequentialComparisonHelpers = useSequentialComparison();
  const handleCompareCollections = () => {
    const collection_ids = selectedCollections?.forEach((collection) => {
      sequentialComparisonHelpers.grammarHelpers.mutate({
        excerpt_ids: collection.excerpt_ids,
        successHandler: difficultySuccessHandler,
      });
      sequentialComparisonHelpers.readabilityMeasuresHelper.mutate({
        excerpt_ids: collection.excerpt_ids,
        successHandler: diversitySuccessHandler,
      });
      sequentialComparisonHelpers.difficultyHelper.mutate({
        excerpt_ids: collection.excerpt_ids,
        successHandler: grammarSuccessHandler,
      });
      sequentialComparisonHelpers.diversityHelper.mutate({
        excerpt_ids: collection.excerpt_ids,
        successHandler: readabilityMeasuresSuccessHandler,
      });
      sequentialComparisonHelpers.slidingWindowStatsHelper.mutate({
        excerpt_ids: collection.excerpt_ids,
        successHandler: slidingWindowStatsSuccessHandler,
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
