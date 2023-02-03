import { CalculationActions } from '../../../redux/reducers/excerptCalculation';
import { SequentialComparisonHelpersParams } from './useSequentialComparison';
import { useDispatch } from 'react-redux';
import { useMutation } from 'react-query';
export type useServerCalculationParams<T> = {
  fn: (params: SequentialComparisonHelpersParams) => Promise<T>;
  // dispatchType: CalculationActions;
};
const useServerCalculation = <T>({
  fn,
}: // dispatchType,
useServerCalculationParams<T>) => {
  const dispatch = useDispatch();
  const serverCalculationMutation = useMutation(
    (params: SequentialComparisonHelpersParams) => fn(params),
    {
      onError: (error) => {
        console.error(error);
      },
      onSuccess: (data, params) => {
        // dispatch({
        //   type: dispatchType,
        //   payload: data,
        // });

        params.successHandler && params.successHandler(data);
      },
    }
  );
  return serverCalculationMutation;
};

export default useServerCalculation;
