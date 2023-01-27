import { RootState } from '../../../redux/store';
import { useSelector } from 'react-redux';
import useSequentialComparison from './useSequentialComparison';
import { useState } from 'react';
export enum AttemptErrors {
  NoExcerptsSelected = 'No excerpts selected',
  NotEnoughExcerptsSelected = 'Not enough excerpts selected',
  TooManyExcerptsSelected = 'Too many excerpts selected',
}
export const useCompareExcerpts = () => {
  const [attemptError, setAttemptError] = useState<AttemptErrors | null>(null);
  const selectedExcerpts = useSelector(({ selectedExcerptsState }: RootState) =>
    selectedExcerptsState.selectedExcerpts?.reverse()
  );
  const sequentialComparisonHelpers = useSequentialComparison();
  const handleCompare = () => {
    if (!selectedExcerpts || selectedExcerpts.length === 0) {
      setAttemptError(AttemptErrors.NoExcerptsSelected);
      return;
    } else {
      const excerpt_ids = selectedExcerpts
        ? selectedExcerpts.map((excerpt) => excerpt.id)
        : [];

      setAttemptError(null);
      sequentialComparisonHelpers.grammarHelpers.mutate(excerpt_ids);
      sequentialComparisonHelpers.readabilityMeasuresHelper.mutate(excerpt_ids);
      sequentialComparisonHelpers.difficultyHelper.mutate(excerpt_ids);
      sequentialComparisonHelpers.diversityHelper.mutate(excerpt_ids);
      sequentialComparisonHelpers.slidingWindowStatsHelper.mutate(excerpt_ids);
    }
  };

  return {
    handleCompare,
    attemptError,
    sequentialComparisonHelpers,
  };
};
