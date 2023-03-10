import {
  CalculationReducer,
  CalculationState,
} from './reducers/excerptCalculation';
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
import {
  CollectionCalculationReducer,
  CollectionCalculationState,
} from './reducers/collectionCalculation';

export interface RootState {
  countState: CountState;
  selectedExcerptsState: SelectedExcerptsState;
  selectedCollectionState: SelectedCollectionsState;
  calculationState: CalculationState;
  collectionCalculationState: CollectionCalculationState;
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
    collectionCalculationState: CollectionCalculationReducer,
  }),
  composeWithDevTools(applyMiddleware())
);
