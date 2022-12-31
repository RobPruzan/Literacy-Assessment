import { useMutation } from 'react-query';
import NorthStar from '../../services.ts/connections';

export const useWindowDifficultyScore = () => {
  const { mutate, data, error, isLoading, isError } = useMutation(
    (excerpt: string) => NorthStar.calculateWindowDifficultyScore(excerpt),
    {
      onError: (error) => {
        console.log(error);
      },
    }
  );
  return {
    getWindowDifficultyScores: mutate,
    windowDifficultyScores: data,
    windowError: error,
    windowLoading: isLoading,
    windowHasError: isError,
  };
};
