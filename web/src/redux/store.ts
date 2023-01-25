import { CalculationReducer, CalculationState } from './reducers/calculation';
import { ComparisonReducer, ComparisonState } from './reducers/comparisonState';
import { CountReducer, CountState } from './reducers/count';
import {
  SelectedCollectionsReducer,
  SelectedCollectionsState,
} from './reducers/selectedCollections';
import {
  SelectedExcerptsReducer,
  SelectedExcerptsState,
} from './reducers/selectedExcerpts';
import { UserReducer, UserState } from './user';
import {
  applyMiddleware,
  combineReducers,
  createStore,
} from '@reduxjs/toolkit';

import { composeWithDevTools } from 'redux-devtools-extension';

export interface RootState {
  countState: CountState;
  selectedExcerptsState: SelectedExcerptsState;
  selectedCollectionState: SelectedCollectionsState;
  calculationState: CalculationState;
  userState: UserState;
  comparisonState: ComparisonState;
  // counter: CounterState;
}

export const store = createStore(
  combineReducers({
    countState: CountReducer,
    selectedExcerptsState: SelectedExcerptsReducer,
    selectedCollectionState: SelectedCollectionsReducer,
    calculationState: CalculationReducer,
    userState: UserReducer,
    comparisonState: ComparisonReducer,
  }),
  composeWithDevTools(applyMiddleware())
);
