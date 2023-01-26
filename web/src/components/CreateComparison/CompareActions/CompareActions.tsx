import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import { RootState } from '../../../redux/store';
import { motion } from 'framer-motion';
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
  const selectedCollections = useSelector(
    ({ selectedCollectionState }: RootState) =>
      selectedCollectionState.selectedCollections
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

      // const collectionExcerptIds = selectedCollections?.map(
      //   ()

      // )

      setAttemptError(null);
      grammarHelpers.mutateGrammar(excerpt_ids);
      readabilityMeasuresHelpers.mutateReadabilityMeasures(excerpt_ids);
      difficultyHelpers.mutateDifficulty(excerpt_ids);
      diversityHelpers.mutateDiversity(excerpt_ids);
      slidingWindowStatsHelpers.mutateSlidingWindowStats(excerpt_ids);
    }
  };

  return (
    <div className="w-full">
      {attemptError && <p className="text-red-500">Error: {attemptError}</p>}
      {/* <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 1 }}
        className="rounded bg-custom-blood-red text-white p-2 :hover:bg-blue-600 m-2 sm:text-base  text-sm"
        onClick={() =>
          dispatch({ type: SelectedExcerptsActions.ResetSelectedExcerpts })
        }
      >
        Reset All
      </motion.button> */}
      {difficultyHelpers.difficultyLoading && (
        <p className="text-gray-500">Loading...</p>
      )}
      <Link to="/analysis">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 1 }}
          onClick={handleCompare}
          className="rounded bg-custom-blood-red w-full text-white p-2  sm:text-base  text-sm "
        >
          Compare
        </motion.button>
      </Link>

      {difficultyHelpers.difficultyData?.map((calc, idx) => (
        <p className="text-gray-500" key={`diff map ${idx}`}>
          Difficulty: {calc}
        </p>
      ))}
    </div>
  );
};

export default CompareActions;
