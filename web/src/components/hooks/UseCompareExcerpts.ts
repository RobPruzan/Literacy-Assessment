import { useMutation } from 'react-query';
import NorthStar, { ExcerptInfo } from '../../services.ts/connections';

export const UseCompareExcerpts = () => {
  const { mutate, data, error, isLoading, isError } = useMutation(
    (excerpts: ExcerptInfo[]) => NorthStar.compareExcerpts(excerpts),
    {
      onError: (error) => {
        console.log(error);
      },
      onSuccess: (data) => {
        console.log('Compare Text Data', data);
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
