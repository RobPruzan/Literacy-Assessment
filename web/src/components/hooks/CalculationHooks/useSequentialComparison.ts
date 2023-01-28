import { CalculationActions } from '../../../redux/reducers/excerptCalculation';
import NorthStar from '../../../services.ts/connections';
import useServerCalculation from './useServerCalculation';

export type SequentialComparisonHelpersParams = {
  excerpt_ids: number[];
};

const useSequentialComparison = () => {
  const difficultyCalculation = useServerCalculation({
    fn: calculateDifficultyFn,
    dispatchType: CalculationActions.SetDifficulty,
  });

  const diversityCalculation = useServerCalculation({
    fn: calculateDiversityFn,
    dispatchType: CalculationActions.SetDiversity,
  });
  const grammarCalculation = useServerCalculation({
    fn: calculateGrammarFn,
    dispatchType: CalculationActions.SetGrammar,
  });
  const readabilityMeasuresCalculation = useServerCalculation({
    fn: calculateReadabilityMeasuresFn,
    dispatchType: CalculationActions.SetReadabilityMeasures,
  });
  const slidingWindowCalculation = useServerCalculation({
    fn: calculateSlidingWindowStatsFn,
    dispatchType: CalculationActions.SetSlidingWindowStats,
  });
  function calculateDifficultyFn({
    excerpt_ids,
  }: SequentialComparisonHelpersParams) {
    return NorthStar.getDifficultyScore(excerpt_ids);
  }

  function calculateDiversityFn({
    excerpt_ids,
  }: SequentialComparisonHelpersParams) {
    return NorthStar.getDiversityScore(excerpt_ids);
  }

  function calculateGrammarFn({
    excerpt_ids,
  }: SequentialComparisonHelpersParams) {
    return NorthStar.getGrammarScore(excerpt_ids);
  }

  function calculateReadabilityMeasuresFn({
    excerpt_ids,
  }: SequentialComparisonHelpersParams) {
    return NorthStar.getReadabilityMeasures(excerpt_ids);
  }

  function calculateSlidingWindowStatsFn({
    excerpt_ids,
  }: SequentialComparisonHelpersParams) {
    return NorthStar.getWindowDifficultyScore(excerpt_ids);
  }

  return {
    difficultyHelper: difficultyCalculation,
    diversityHelper: diversityCalculation,
    grammarHelpers: grammarCalculation,
    readabilityMeasuresHelper: readabilityMeasuresCalculation,
    slidingWindowStatsHelper: slidingWindowCalculation,
  };
};

export default useSequentialComparison;
