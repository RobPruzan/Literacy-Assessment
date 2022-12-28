import {
  createStore,
  combineReducers,
  applyMiddleware,
} from '@reduxjs/toolkit';
import { composeWithDevTools } from 'redux-devtools-extension';
import { CountReducer, CountState } from './reducers/count';
import {
  SelectedExcerptsReducer,
  SelectedExcerptsState,
} from './reducers/selectedExcerpts';
export interface RootState {
  countState: CountState;
  selectedExcerptsState: SelectedExcerptsState;
  // counter: CounterState;
}

export const store = createStore(
  combineReducers({
    countState: CountReducer,
    selectedExcerptsState: SelectedExcerptsReducer,
    // counterState: CounterReducer
  }),
  composeWithDevTools(applyMiddleware())
);
