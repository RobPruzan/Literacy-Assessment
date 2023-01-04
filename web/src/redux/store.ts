import {
  createStore,
  combineReducers,
  applyMiddleware,
} from '@reduxjs/toolkit';
import { composeWithDevTools } from 'redux-devtools-extension';
import { CalculationStats } from '../services.ts/connections';
import { CalculationReducer, CalculationState } from './reducers/calculation';
import { CountReducer, CountState } from './reducers/count';
import {
  SelectedExcerptsReducer,
  SelectedExcerptsState,
} from './reducers/selectedExcerpts';
export interface RootState {
  countState: CountState;
  selectedExcerptsState: SelectedExcerptsState;
  calculationState: CalculationState;
  // counter: CounterState;
}

export const store = createStore(
  combineReducers({
    countState: CountReducer,
    selectedExcerptsState: SelectedExcerptsReducer,
    calculationState: CalculationReducer,
    // counterState: CounterReducer
  }),
  composeWithDevTools(applyMiddleware())
);
