import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SelectedExcerptsActions } from '../../../redux/reducers/selectedExcerpts';
import { RootState } from '../../../redux/store';
import NorthStar from '../../../services.ts/connections';
import { UseCompareExcerpts } from '../../hooks/UseCompareExcerpts';
import StatsCard from '../../InfoCardBar.tsx/StatsCard';
import Spinner from 'react-bootstrap/Spinner';

const enum AttemptErrors {
  NoExcerptsSelected = 'No excerpts selected',
  NotEnoughExcerptsSelected = 'Not enough excerpts selected',
  TooManyExcerptsSelected = 'Too many excerpts selected',
}

const CompareActions = () => {
  const [attemptError, setAttemptError] = useState<AttemptErrors | null>(null);
  const dispatch = useDispatch();
  const selectedExcerpts = useSelector(
    ({ selectedExcerptsState }: RootState) =>
      selectedExcerptsState.selectedExcerpts
  );

  const {
    compareExcerpts,
    comparisonStats,
    calculationError,
    calculationLoading,
    colactionErrored,
  } = UseCompareExcerpts();

  const handleCompare = () => {
    if (!selectedExcerpts || selectedExcerpts.length === 0) {
      setAttemptError(AttemptErrors.NoExcerptsSelected);
      return;
    } else {
      setAttemptError(null);
      compareExcerpts(selectedExcerpts);
    }
  };

  return (
    <div>
      {attemptError && <p className="text-red-500">Error: {attemptError}</p>}
      <button
        className="rounded bg-custom-blue text-white p-2 :hover:bg-blue-600 m-2 sm:text-base  text-sm"
        onClick={() =>
          dispatch({ type: SelectedExcerptsActions.ResetSelectedExcerpts })
        }
      >
        Reset All
      </button>
      {calculationLoading && <p className="text-black">Loading...</p>}
      <button
        onClick={handleCompare}
        className="rounded bg-custom-blue text-white p-2 :hover:bg-blue-600 m-2 sm:text-base  text-sm"
      >
        Compare
      </button>
    </div>
  );
};

export default CompareActions;
