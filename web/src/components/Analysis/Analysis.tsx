import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CalculationActions } from '../../redux/reducers/calculation';
import { RootState } from '../../redux/store';
import InfoCardBar from '../InfoCardBar.tsx/InfoCardBar';
import { AboutNavbar } from '../Navabars/AboutNavbar';

export const Analysis = () => {
  const calculationState = useSelector(
    ({ calculationState }: RootState) => calculationState
  );
  const dispatch = useDispatch();
  useEffect(
    () => () => {
      dispatch({
        type: CalculationActions.ClearCalculationStats,
      });
    },
    []
  );

  return (
    <div>
      <AboutNavbar color={'custom-blue'} />
      <div className="border-2 border-t-0 border-custom-blue p-2">
        <InfoCardBar />
      </div>

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
            Diversity: {diversity[1].diversity_score}
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
