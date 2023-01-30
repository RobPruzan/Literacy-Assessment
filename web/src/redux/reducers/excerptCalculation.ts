import {
  CalculationStats,
  DiversityOutput,
  ReadabilityMeasures,
  WindowDifficultyOutput,
} from '../../services.ts/connections';

export type CalculationInfo = {
  loadingProgress: number | null;
  isLoading: boolean;
  // totalCalculations: number;
};

export type CalculationState = CalculationInfo & CalculationStats;

export const DEFAULT_CALCULATION_STATE: CalculationState = {
  difficulty: null,
  diversity: null,
  grammar: null,
  readability_measures: null,
  sliding_window_stats: null,
  loadingProgress: null,
  isLoading: false,
  // totalCalculations: 0,
};

export enum CalculationActions {
  SetDifficulty = 'calculation/SET_DIFFICULTY',
  SetDiversity = 'calculation/SET_DIVERSITY',
  SetGrammar = 'calculation/SET_GRAMMAR',
  SetReadabilityMeasures = 'calculation/SET_READABILITY_MEASURES',
  SetSlidingWindowStats = 'calculation/SET_SLIDING_WINDOW_STATS',
  SetLoadingProgress = 'calculation/SET_LOADING_PROGRESS',
  SetIsLoading = 'calculation/SET_IS_LOADING',
  // SetTotalCalculations = 'calculation/SET_TOTAL_CALCULATIONS',
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

interface SetLoadingProgressAction {
  type: CalculationActions.SetLoadingProgress;
  payload: number;
}

interface SetIsLoadingAction {
  type: CalculationActions.SetIsLoading;
  payload: boolean;
}

// interface SetTotalCalculationsAction {
//   type: CalculationActions.SetTotalCalculations;
//   payload: number;
// }

interface ClearCalculationStatsAction {
  type: CalculationActions.ClearCalculationStats;
}

export const CalculationReducer = (
  state: CalculationState = DEFAULT_CALCULATION_STATE,
  action:
    | SetDifficultyAction
    | SetDiversityAction
    | SetGrammarAction
    | SetReadabilityMeasuresAction
    | SetSlidingWindowStatsAction
    | SetIsLoadingAction
    | ClearCalculationStatsAction
    | SetLoadingProgressAction
  // | SetTotalCalculationsAction
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
    case CalculationActions.SetLoadingProgress:
      return {
        ...state,
        loadingProgress: (state.loadingProgress ?? 0) + action.payload,
      };

    case CalculationActions.SetIsLoading:
      return {
        ...state,
        isLoading: action.payload,
      };

    // case CalculationActions.SetTotalCalculations:
    //   return {
    //     ...state,
    //     totalCalculations: action.payload,
    //   };

    case CalculationActions.ClearCalculationStats:
      return DEFAULT_CALCULATION_STATE;

    default:
      return state;
  }
};
