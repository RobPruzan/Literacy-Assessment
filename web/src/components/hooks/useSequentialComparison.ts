import { CalculationActions } from '../../redux/reducers/calculation';
import NorthStar from '../../services.ts/connections';
import useServerCalculation from './useServerCalculation';

const useSequentialComparison = () => {
  const calculateDifficultyFn = (excerpt_ids: number[]) =>
    NorthStar.getDifficultyScore(excerpt_ids);

  const calculateDiversityFn = (excerpt_ids: number[]) =>
    NorthStar.getDiversityScore(excerpt_ids);

  const calculateGrammarFn = (excerpt_ids: number[]) =>
    NorthStar.getGrammerScore(excerpt_ids);

  const calculateReadabilityMeasuresFn = (excerpt_ids: number[]) =>
    NorthStar.getReadabilityMeasures(excerpt_ids);

  const calculateSlidingWindowStatsFn = (excerpt_ids: number[]) =>
    NorthStar.getWindowDifficultyScore(excerpt_ids);

  const {
    mutate: mutateDifficulty,
    data: difficultyData,
    error: difficultyError,
    isLoading: difficultyLoading,
    isError: difficultyHasError,
  } = useServerCalculation({
    fn: calculateDifficultyFn,
    dispatchType: CalculationActions.SetDifficulty,
  });

  const {
    mutate: mutateDiversity,
    data: diversityData,
    error: diversityError,
    isLoading: diversityLoading,
    isError: diversityHasError,
  } = useServerCalculation({
    fn: calculateDiversityFn,
    dispatchType: CalculationActions.SetDiversity,
  });
  const {
    mutate: mutateGrammar,
    data: grammarData,
    error: grammarError,
    isLoading: grammarLoading,
    isError: grammarHasError,
  } = useServerCalculation({
    fn: calculateGrammarFn,
    dispatchType: CalculationActions.SetGrammar,
  });
  const {
    mutate: mutateReadabilityMeasures,
    data: readabilityMeasuresData,
    error: readabilityMeasuresError,
    isLoading: readabilityMeasuresLoading,
    isError: readabilityMeasuresHasError,
  } = useServerCalculation({
    fn: calculateReadabilityMeasuresFn,
    dispatchType: CalculationActions.SetReadabilityMeasures,
  });
  const {
    mutate: mutateSlidingWindowStats,
    data: slidingWindowStatsData,
    error: slidingWindowStatsError,
    isLoading: slidingWindowStatsLoading,
    isError: slidingWindowStatsHasError,
  } = useServerCalculation({
    fn: calculateSlidingWindowStatsFn,
    dispatchType: CalculationActions.SetSlidingWindowStats,
  });

  return {
    difficultyHelpers: {
      mutateDifficulty,
      difficultyData,
      difficultyError,
      difficultyLoading,
      difficultyHasError,
    },

    diversityHelpers: {
      mutateDiversity,
      diversityData,
      diversityError,
      diversityLoading,
      diversityHasError,
    },
    grammarHelpers: {
      mutateGrammar,
      grammarData,
      grammarError,
      grammarLoading,
      grammarHasError,
    },
    readabilityMeasuresHelpers: {
      mutateReadabilityMeasures,
      readabilityMeasuresData,
      readabilityMeasuresError,
      readabilityMeasuresLoading,
      readabilityMeasuresHasError,
    },
    slidingWindowStatsHelpers: {
      mutateSlidingWindowStats,
      slidingWindowStatsData,
      slidingWindowStatsError,
      slidingWindowStatsLoading,
      slidingWindowStatsHasError,
    },
  };
};

export default useSequentialComparison;
