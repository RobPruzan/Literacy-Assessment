import { RootState } from '../../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import useSequentialComparison from './useSequentialComparison';
import { useState } from 'react';
import compareExcerptsHelper from './dispatchHelper';
import { CalculationActions } from '../../../redux/reducers/excerptCalculation';
export enum AttemptErrors {
  NoExcerptsSelected = 'No excerpts selected',
  NotEnoughExcerptsSelected = 'Not enough excerpts selected',
  TooManyExcerptsSelected = 'Too many excerpts selected',
}
export const useCompareExcerpts = () => {
  const dispatch = useDispatch();
  const [attemptError, setAttemptError] = useState<AttemptErrors | null>(null);

  // TODO remove reverse, do it on the backend
  const selectedExcerpts = useSelector(({ selectedExcerptsState }: RootState) =>
    selectedExcerptsState.selectedExcerpts?.reverse()
  );
  const sequentialComparisonHelpers = useSequentialComparison();
  const handleCompareExcerpts = () => {
    if (!selectedExcerpts || selectedExcerpts.length === 0) {
      setAttemptError(AttemptErrors.NoExcerptsSelected);
      return;
    } else {
      const excerpt_ids = selectedExcerpts
        ? selectedExcerpts.map((excerpt) => excerpt.id)
        : [];

      setAttemptError(null);
      compareExcerptsHelper({
        dispatch: dispatch,
        excerptIds: excerpt_ids,
        mutateFunction: sequentialComparisonHelpers.grammarHelpers.mutate,
        updateKey: 'grammar',
        updateType: CalculationActions.SetGrammar,
      });
      // sequentialComparisonHelpers.grammarHelpers.mutate({ excerpt_ids });
      compareExcerptsHelper({
        dispatch: dispatch,
        excerptIds: excerpt_ids,
        mutateFunction:
          sequentialComparisonHelpers.readabilityMeasuresHelper.mutate,
        updateKey: 'readability_measures',
        updateType: CalculationActions.SetReadabilityMeasures,
      });
      // sequentialComparisonHelpers.readabilityMeasuresHelper.mutate({
      //   excerpt_ids,
      // });
      compareExcerptsHelper({
        dispatch: dispatch,
        excerptIds: excerpt_ids,
        mutateFunction: sequentialComparisonHelpers.difficultyHelper.mutate,
        updateKey: 'difficulty',
        updateType: CalculationActions.SetDifficulty,
      });
      // sequentialComparisonHelpers.difficultyHelper.mutate({ excerpt_ids });
      compareExcerptsHelper({
        dispatch: dispatch,
        excerptIds: excerpt_ids,
        mutateFunction: sequentialComparisonHelpers.diversityHelper.mutate,
        updateKey: 'diversity',
        updateType: CalculationActions.SetDiversity,
      });

      compareExcerptsHelper({
        dispatch: dispatch,
        excerptIds: excerpt_ids,
        mutateFunction:
          sequentialComparisonHelpers.slidingWindowStatsHelper.mutate,
        updateKey: 'sliding_window_stats',
        updateType: CalculationActions.SetSlidingWindowStats,
      });

      // sequentialComparisonHelpers.diversityHelper.mutate({ excerpt_ids });
      // sequentialComparisonHelpers.slidingWindowStatsHelper.mutate({
      //   excerpt_ids,
      // });
    }
  };

  return {
    handleCompareExcerpts,
    attemptError,
    sequentialComparisonHelpers,
  };
};
