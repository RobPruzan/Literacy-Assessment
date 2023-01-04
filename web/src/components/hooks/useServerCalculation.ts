import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import { CalculationActions } from '../../redux/reducers/calculation';
export type useServerCalculationParams<T> = {
  fn: (excerpt_ids: number[]) => Promise<T>;
  dispatchType: CalculationActions;
};
const useServerCalculation = <T>({
  fn,
  dispatchType,
}: useServerCalculationParams<T>) => {
  const dispatch = useDispatch();
  const { mutate, data, error, isLoading, isError } = useMutation(fn, {
    onError: (error) => {
      console.log(error);
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
      // dispatch({
      //   type: CalculationActions.SetIsLoading,
      //   payload: false,
      // });
    },
    onMutate: () => {
      // dispatch({
      //   type: CalculationActions.SetIsLoading,
      //   payload: true,
      // });
    },
  });
  return {
    mutate,
    data,
    error,
    isLoading,
    isError,
  };
};

export default useServerCalculation;
