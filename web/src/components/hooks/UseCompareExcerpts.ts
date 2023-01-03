import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CalculationActions } from '../../redux/reducers/calculation';
import NorthStar, { ExcerptInfo } from '../../services.ts/connections';

export const UseCompareExcerpts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { mutate, data, error, isLoading, isError, isSuccess } = useMutation(
    (excerpts: ExcerptInfo[]) => NorthStar.compareExcerpts(excerpts),
    {
      onError: (error) => {
        console.log(error);
      },
      // when clicked redirect to loading page
      onMutate: () => {
        navigate('/loading');
      },

      onSuccess: (data) => {
        console.log('Compare Text Data', data);
        dispatch({
          type: CalculationActions.SetDifficulty,
          payload: {
            difficulty: data,
          },
        });
        navigate('/analysis');
      },
    }
  );

  return {
    compareExcerpts: mutate,
    comparisonStats: data,
    calculationError: error,
    calculationLoading: isLoading,
    colactionErrored: isError,
  };
};
