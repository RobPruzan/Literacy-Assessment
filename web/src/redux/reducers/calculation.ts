import { Data } from '../../components/Chart/Chart';
import {
  CalculationStats,
  DiversityOutput,
  ReadabilityMeasures,
  WindowDifficultyOutput,
} from '../../services.ts/connections';

export const DEFAULT_CALCULATION_STATE: CalculationStats = {
  difficulty: null,
  diversity: null,
  grammar: null,
  readability_measures: null,
  sliding_window_stats: null,
};

export enum CalculationActions {
  SetDifficulty = 'calculation/SET_DIFFICULTY',
  SetDiversity = 'calculation/SET_DIVERSITY',
  SetGrammar = 'calculation/SET_GRAMMAR',
  SetReadabilityMeasures = 'calculation/SET_READABILITY_MEASURES',
  SetSlidingWindowStats = 'calculation/SET_SLIDING_WINDOW_STATS',
  ClearCalculationStats = 'calculation/CLEAR_CALCULATION_STATS',
}

interface SetDifficultyAction {
  type: CalculationActions.SetDifficulty;
  payload: number;
}
interface SetDiversityAction {
  type: CalculationActions.SetDiversity;
  payload: DiversityOutput;
}
interface SetGrammarAction {
  type: CalculationActions.SetGrammar;
  payload: number;
}

interface SetReadabilityMeasuresAction {
  type: CalculationActions.SetReadabilityMeasures;
  payload: ReadabilityMeasures;
}

interface SetSlidingWindowStatsAction {
  type: CalculationActions.SetSlidingWindowStats;
  payload: WindowDifficultyOutput;
}

interface ClearCalculationStatsAction {
  type: CalculationActions.ClearCalculationStats;
}

export const CalculationReducer = (
  state: CalculationStats = DEFAULT_CALCULATION_STATE,
  action:
    | SetDifficultyAction
    | SetDiversityAction
    | SetGrammarAction
    | SetReadabilityMeasuresAction
    | SetSlidingWindowStatsAction
    | ClearCalculationStatsAction
) => {
  switch (action.type) {
    case CalculationActions.SetDifficulty:
      return {
        ...state,
        difficulty: action.payload,
      };
    case CalculationActions.SetDiversity:
      return {
        ...state,
        diversity: action.payload,
      };
    case CalculationActions.SetGrammar:
      return {
        ...state,
        grammar: action.payload,
      };
    case CalculationActions.SetReadabilityMeasures:
      return {
        ...state,
        readability_measures: action.payload,
      };
    case CalculationActions.SetSlidingWindowStats:
      return {
        ...state,
        sliding_window_stats: action.payload,
      };

    case CalculationActions.ClearCalculationStats:
      return {
        ...state,
        calculationStats: null,
      };

    default:
      return state;
  }
};
