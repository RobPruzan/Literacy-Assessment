import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SelectedExcerptsActions } from '../../../redux/reducers/selectedExcerpts';
import { RootState } from '../../../redux/store';

const CompareActions = () => {
  const dispatch = useDispatch();
  const selectedExcerpts = useSelector(
    ({ selectedExcerptsState }: RootState) =>
      selectedExcerptsState.selectedExcerpts
  );

  return (
    <div>
      <button
        className="rounded bg-blue-500 text-white p-2 :hover:bg-blue-600"
        onClick={() =>
          dispatch({ type: SelectedExcerptsActions.ResetSelectedExcerpts })
        }
      >
        Reset All
      </button>
      <button className="rounded bg-blue-500 text-white p-2 :hover:bg-blue-600">
        Compare
      </button>
    </div>
  );
};

export default CompareActions;
