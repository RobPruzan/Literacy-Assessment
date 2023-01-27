import { CalculationActions } from '../../../redux/reducers/calculation';
import NorthStar from '../../../services.ts/connections';
import useServerCalculation from './useServerCalculation';

const useSequentialComparison = () => {
  const calculateDifficultyFn = (excerpt_ids: number[]) =>
    NorthStar.getDifficultyScore(excerpt_ids);

  const calculateDiversityFn = (excerpt_ids: number[]) =>
    NorthStar.getDiversityScore(excerpt_ids);

  const calculateGrammarFn = (excerpt_ids: number[]) =>
    NorthStar.getGrammarScore(excerpt_ids);

  const calculateReadabilityMeasuresFn = (excerpt_ids: number[]) =>
    NorthStar.getReadabilityMeasures(excerpt_ids);

  const calculateSlidingWindowStatsFn = (excerpt_ids: number[]) =>
    NorthStar.getWindowDifficultyScore(excerpt_ids);

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

  return {
    difficultyHelper: difficultyCalculation,

    diversityHelper: diversityCalculation,
    grammarHelpers: grammarCalculation,
    readabilityMeasuresHelper: readabilityMeasuresCalculation,
    slidingWindowStatsHelper: slidingWindowCalculation,
  };
};

export default useSequentialComparison;
