import { UseMutateFunction } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import {
  CollectionCalculationInfo,
  CollectionCollectionActions,
  CreateTypeWithAddition,
} from '../../../redux/reducers/collectionCalculation';

import { RootState } from '../../../redux/store';
import { CalculationStats } from '../../../services.ts/connections';
import useSequentialComparison, {
  SequentialComparisonHelpersParams,
} from './useSequentialComparison';

const useCompareCollections = () => {
  const dispatch = useDispatch();
  const selectedCollections = useSelector(
    ({ selectedCollectionState }: RootState) =>
      selectedCollectionState.selectedCollections
  );

  const sequentialComparisonHelpers = useSequentialComparison();

  // }
  type HelperParams = {};

  function helper<
    CalculationData extends CalculationStats[keyof CalculationStats],
    MutateFunction extends UseMutateFunction<
      CalculationData,
      unknown,
      SequentialComparisonHelpersParams,
      unknown
    >,
    UpdateKey extends keyof CreateTypeWithAddition<
      Partial<CalculationStats>,
      CollectionCalculationInfo
    >
  >({
    mutateFunction,
    updateKey,
    updateType,
    excerptIds,
    collectionId,
  }: {
    mutateFunction: MutateFunction;
    updateKey: UpdateKey;
    updateType: CollectionCollectionActions;
    excerptIds: number[];
    collectionId: number;
  }) {
    return mutateFunction({
      excerpt_ids: excerptIds,
      successHandler: (data: CalculationData) => {
        dispatch({
          type: updateType,
          payload: {
            collectionId: collectionId,
            [updateKey]: data,
          },
        });
      },
    });
  }

  const handleCompareCollections = () => {
    const collection_ids = selectedCollections?.forEach((collection) => {
      helper({
        mutateFunction: sequentialComparisonHelpers.difficultyHelper.mutate,
        updateKey: 'difficulty',
        updateType: CollectionCollectionActions.UpdateCollectionDifficulty,
        excerptIds: collection.excerpt_ids,
        collectionId: collection.id,
      });

      helper({
        mutateFunction: sequentialComparisonHelpers.diversityHelper.mutate,
        updateKey: 'diversity',
        updateType: CollectionCollectionActions.UpdateCollectionDiversity,

        excerptIds: collection.excerpt_ids,
        collectionId: collection.id,
      });

      helper({
        mutateFunction: sequentialComparisonHelpers.grammarHelpers.mutate,
        updateKey: 'grammar',
        updateType: CollectionCollectionActions.UpdateCollectionGrammar,
        excerptIds: collection.excerpt_ids,
        collectionId: collection.id,
      });

      helper({
        mutateFunction:
          sequentialComparisonHelpers.readabilityMeasuresHelper.mutate,
        updateKey: 'readability_measures',
        updateType:
          CollectionCollectionActions.UpdateCollectionReadabilityMeasures,
        excerptIds: collection.excerpt_ids,
        collectionId: collection.id,
      });

      helper({
        mutateFunction:
          sequentialComparisonHelpers.slidingWindowStatsHelper.mutate,
        updateKey: 'sliding_window_stats',
        updateType:
          CollectionCollectionActions.UpdateCollectionSlidingWindowStats,
        excerptIds: collection.excerpt_ids,
        collectionId: collection.id,
      });
    });
  };
  return handleCompareCollections;
};

export default useCompareCollections;
