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
  plot_data: null,
  readability_measures: null,
  sliding_window_stats: null,
};

export enum CalculationActions {
  // SetCalculationStats = 'calculation/SET_CALCULATION_STATS',
  SetDifficulty = 'calculation/SET_DIFFICULTY',
  SetDiversity = 'calculation/SET_DIVERSITY',
  SetGrammar = 'calculation/SET_GRAMMAR',
  SetPlotData = 'calculation/SET_PLOT_DATA',
  SetReadabilityMeasures = 'calculation/SET_READABILITY_MEASURES',
  SetSlidingWindowStats = 'calculation/SET_SLIDING_WINDOW_STATS',
  ClearCalculationStats = 'calculation/CLEAR_CALCULATION_STATS',
}

interface SetDifficultyAction {
  type: CalculationActions.SetDifficulty;
  payload: {
    difficulty: number;
  };
}
interface SetDiversityAction {
  type: CalculationActions.SetDiversity;
  payload: {
    diversity: DiversityOutput;
  };
}
interface SetGrammarAction {
  type: CalculationActions.SetGrammar;
  payload: {
    grammar: number;
  };
}
interface SetPlotDataAction {
  type: CalculationActions.SetPlotData;
  payload: {
    plot_data: Data;
  };
}
interface SetReadabilityMeasuresAction {
  type: CalculationActions.SetReadabilityMeasures;
  payload: {
    readability_measures: ReadabilityMeasures;
  };
}

interface SetSlidingWindowStatsAction {
  type: CalculationActions.SetSlidingWindowStats;
  payload: {
    sliding_window_stats: WindowDifficultyOutput;
  };
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
    | SetPlotDataAction
    | SetReadabilityMeasuresAction
    | SetSlidingWindowStatsAction
    | ClearCalculationStatsAction
) => {
  switch (action.type) {
    case CalculationActions.SetDifficulty:
      return {
        ...state,
        difficulty: action.payload.difficulty,
      };
    case CalculationActions.SetDiversity:
      return {
        ...state,
        diversity: action.payload.diversity,
      };
    case CalculationActions.SetGrammar:
      return {
        ...state,
        grammar: action.payload.grammar,
      };
    case CalculationActions.SetPlotData:
      return {
        ...state,
        plot_data: action.payload.plot_data,
      };
    case CalculationActions.SetReadabilityMeasures:
      return {
        ...state,
        readability_measures: action.payload.readability_measures,
      };
    case CalculationActions.SetSlidingWindowStats:
      return {
        ...state,
        sliding_window_stats: action.payload.sliding_window_stats,
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
