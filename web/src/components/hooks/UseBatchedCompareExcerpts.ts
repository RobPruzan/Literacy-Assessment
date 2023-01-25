import NorthStar, { ExcerptInfo } from '../../services.ts/connections';

import { CalculationActions } from '../../redux/reducers/calculation';
import { useDispatch } from 'react-redux';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

export const UseBatchedCompareExcerpts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { mutate, data, error, isLoading, isError, isSuccess } = useMutation(
    (excerpts: ExcerptInfo[]) => NorthStar.compareExcerpts(excerpts),
    {
      onError: (error) => {
        console.error(error);
      },
      // when clicked redirect to loading page
      // onMutate: () => {
      //   navigate('/loading');
      // },

      onSuccess: (data) => {
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
