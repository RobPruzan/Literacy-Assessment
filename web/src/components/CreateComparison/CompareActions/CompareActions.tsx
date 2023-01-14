import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import { RootState } from '../../../redux/store';
import { SelectedExcerptsActions } from '../../../redux/reducers/selectedExcerpts';
import useSequentialComparison from '../../hooks/useSequentialComparison';
import { useState } from 'react';

const enum AttemptErrors {
  NoExcerptsSelected = 'No excerpts selected',
  NotEnoughExcerptsSelected = 'Not enough excerpts selected',
  TooManyExcerptsSelected = 'Too many excerpts selected',
}

const CompareActions = () => {
  const [attemptError, setAttemptError] = useState<AttemptErrors | null>(null);
  const dispatch = useDispatch();
  const selectedExcerpts = useSelector(({ selectedExcerptsState }: RootState) =>
    selectedExcerptsState.selectedExcerpts?.reverse()
  );

  const {
    difficultyHelpers,
    diversityHelpers,
    grammarHelpers,
    readabilityMeasuresHelpers,
    slidingWindowStatsHelpers,
  } = useSequentialComparison();

  const handleCompare = () => {
    if (!selectedExcerpts || selectedExcerpts.length === 0) {
      setAttemptError(AttemptErrors.NoExcerptsSelected);
      return;
    } else {
      const excerpt_ids = selectedExcerpts
        ? selectedExcerpts.map((excerpt) => excerpt.id)
        : [];
      setAttemptError(null);
      grammarHelpers.mutateGrammar(excerpt_ids);
      readabilityMeasuresHelpers.mutateReadabilityMeasures(excerpt_ids);
      difficultyHelpers.mutateDifficulty(excerpt_ids);
      diversityHelpers.mutateDiversity(excerpt_ids);
      slidingWindowStatsHelpers.mutateSlidingWindowStats(excerpt_ids);
    }
  };

  return (
    <div>
      {attemptError && <p className="text-red-500">Error: {attemptError}</p>}
      <button
        className="rounded bg-custom-blood-red text-white p-2 :hover:bg-blue-600 m-2 sm:text-base  text-sm"
        onClick={() =>
          dispatch({ type: SelectedExcerptsActions.ResetSelectedExcerpts })
        }
      >
        Reset All
      </button>
      {difficultyHelpers.difficultyLoading && (
        <p className="text-black">Loading...</p>
      )}
      <Link to="/analysis">
        <button
          onClick={handleCompare}
          className="rounded bg-custom-blood-red text-white p-2 :hover:bg-blue-600 m-2 sm:text-base  text-sm"
        >
          Compare
        </button>
      </Link>

      {difficultyHelpers.difficultyData?.map((calc, idx) => (
        <p className="text-black" key={`diff map ${idx}`}>
          Difficulty: {calc}
        </p>
      ))}
    </div>
  );
};

export default CompareActions;
