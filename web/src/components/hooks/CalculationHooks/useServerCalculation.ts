import { CalculationActions } from '../../../redux/reducers/excerptCalculation';
import { SequentialComparisonHelpersParams } from './useSequentialComparison';
import { useDispatch } from 'react-redux';
import { useMutation } from 'react-query';
export type useServerCalculationParams<T> = {
  fn: (params: SequentialComparisonHelpersParams) => Promise<T>;
  dispatchType: CalculationActions;
};
const useServerCalculation = <T>({
  fn,
  dispatchType,
}: useServerCalculationParams<T>) => {
  const dispatch = useDispatch();
  const serverCalculationMutation = useMutation(fn, {
    onError: (error) => {
      console.error(error);
    },
    onSuccess: (data) => {
      dispatch({
        type: dispatchType,
        payload: data,
      });
      dispatch({
        type: CalculationActions.SetLoadingProgress,
        payload: 1,
      });
    },
  });
  return serverCalculationMutation;
};

export default useServerCalculation;
