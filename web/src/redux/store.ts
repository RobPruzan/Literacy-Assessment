import { CalculationReducer, CalculationState } from './reducers/calculation';
import { CountReducer, CountState } from './reducers/count';
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

import { CalculationStats } from '../services.ts/connections';
import { composeWithDevTools } from 'redux-devtools-extension';

export interface RootState {
  countState: CountState;
  selectedExcerptsState: SelectedExcerptsState;
  calculationState: CalculationState;
  userState: UserState;
  // counter: CounterState;
}

export const store = createStore(
  combineReducers({
    countState: CountReducer,
    selectedExcerptsState: SelectedExcerptsReducer,
    calculationState: CalculationReducer,
    userState: UserReducer,
    // counterState: CounterReducer
  }),
  composeWithDevTools(applyMiddleware())
);
