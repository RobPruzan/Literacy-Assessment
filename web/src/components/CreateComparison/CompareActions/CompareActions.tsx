import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SelectedExcerptsActions } from '../../../redux/reducers/selectedExcerpts';
import { RootState } from '../../../redux/store';
import StatsCard from '../../InfoCardBar.tsx/StatsCard';

const CompareActions = () => {
  const dispatch = useDispatch();
  const selectedExcerpts = useSelector(
    ({ selectedExcerptsState }: RootState) =>
      selectedExcerptsState.selectedExcerpts
  );

  return (
    <div>
      <button
        className="rounded bg-custom-blue text-white p-2 :hover:bg-blue-600 m-2 sm:text-base  text-sm"
        onClick={() =>
          dispatch({ type: SelectedExcerptsActions.ResetSelectedExcerpts })
        }
      >
        Reset All
      </button>
      <button className="rounded bg-custom-blue text-white p-2 :hover:bg-blue-600 m-2 sm:text-base  text-sm">
        Compare
      </button>
    </div>
  );
};

export default CompareActions;
