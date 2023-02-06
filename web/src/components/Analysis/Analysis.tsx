import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Box } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import { useParams } from 'react-router-dom';
import { CalculationActions } from '../../redux/reducers/excerptCalculation';
import { RootState } from '../../redux/store';
import InfoCardBar from '../InfoCardBar.tsx/InfoCardBar';
import { AboutNavbar } from '../Navabars/AboutNavbar';

const NON_CALCULATION_KEYS = ['loadingProgress', 'isLoading'];

export const Analysis = () => {
  const params = useParams();
  const [totalCalculations, setTotalCalculations] = useState<number | null>(
    null
  );
  const calculationState = useSelector(
    ({ calculationState }: RootState) => calculationState
  );

  const collectionCalculationState = useSelector(
    ({ collectionCalculationState }: RootState) => collectionCalculationState
  );
  const dispatch = useDispatch();
  useEffect(
    () => () => {
      dispatch({
        type: CalculationActions.ClearCalculationStats,
      });
    },
    [dispatch]
  );

  const loadingProgress =
    calculationState.loadingProgress && totalCalculations
      ? (calculationState.loadingProgress / totalCalculations) * 100
      : null;
  useEffect(() => {
    setTotalCalculations(
      Object.keys(calculationState).reduce((prev, curr) => {
        if (NON_CALCULATION_KEYS.includes(curr)) {
          return prev;
        } else {
          return prev + 1;
        }
      }, 0)
    );
  }, [calculationState]);

  return (
    <div>
      <AboutNavbar color={'custom-blood-red'} />
      <div className="border-2 border-t-0 border-custom-blood-red p-2">
        <InfoCardBar />
      </div>
      <p className="text-center text-2xl font-bold">
        {collectionCalculationState.stats?.map((stat) => (
          <>
            {' '}
            Difficultys For Collection Id: {stat.collectionId}
            <p>
              {stat.difficulty &&
                stat.difficulty.length > 0 &&
                stat.difficulty?.map((iter) => iter.toFixed(2)).join(',')}
            </p>
            <hr />
          </>
        ))}
      </p>

      <div className="flex justify-center text-lg font-semibold">
        {calculationState.loadingProgress &&
          totalCalculations &&
          loadingProgress &&
          (loadingProgress < 100 ? (
            <Box sx={{ width: '100%', marginTop: '.2px' }}>
              <LinearProgress
                value={
                  (calculationState.loadingProgress / totalCalculations) * 100
                }
              />
            </Box>
          ) : (
            <Box sx={{ width: '100%', marginTop: '.2px' }}>
              <LinearProgress
                variant="buffer"
                value={
                  (calculationState.loadingProgress / totalCalculations) * 100
                }
              />
            </Box>
          ))}
      </div>
      <p className="text-center text-2xl font-bold">
        {calculationState.loadingProgress &&
          totalCalculations &&
          (calculationState.loadingProgress / totalCalculations) * 100}
        %
      </p>

      {calculationState?.difficulty &&
        calculationState?.difficulty.map((difficulty, idx) => (
          <p
            className="text-center text-2xl font-bold"
            key={`difficulty map ${idx}`}
          >
            Difficulty: {difficulty}
          </p>
        ))}

      {calculationState?.diversity &&
        calculationState?.diversity.map((diversity, idx) => (
          <p
            className="text-center text-2xl font-bold"
            key={`diversity map ${idx}`}
          >
            Diversity: {diversity[1][1].diversity_score}
          </p>
        ))}

      {calculationState?.grammar &&
        calculationState?.grammar.map((grammar, idx) => (
          <p
            className="text-center text-2xl font-bold"
            key={`grammar map ${idx}`}
          >
            Grammar Score: {grammar * 100}%
          </p>
        ))}

      {calculationState?.readability_measures &&
        calculationState?.readability_measures.map(
          (readability_measures, idx) => (
            <p
              className="text-center text-2xl font-bold"
              key={`readability_measures map ${idx}`}
            >
              Readability test measure:{' '}
              {readability_measures['readability grades']['Coleman-Liau']}
            </p>
          )
        )}

      {calculationState?.sliding_window_stats &&
        calculationState?.sliding_window_stats.map(
          (sliding_window_stats, idx) => (
            <p
              className="text-center text-2xl font-bold"
              key={`sliding_window_stats map ${idx}`}
            >
              Sliding Window Stats: {sliding_window_stats?.raw_scores.at(3)}
            </p>
          )
        )}
    </div>
  );
};
