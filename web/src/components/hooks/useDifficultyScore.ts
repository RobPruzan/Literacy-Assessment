import { useMutation } from 'react-query';
import NorthStar from '../../services.ts/connections';

export const useDifficultyScore = () => {
  const { mutate, data, error, isLoading, isError } = useMutation(
    (excerpt: string) => NorthStar.calculateDifficultyScore(excerpt),
    {
      onError: (error) => {
        console.log(error);
      },
    }
  );
  return {
    getDifficultyScore: mutate,
    difficultyScore: data,
    modelError: error,
    modelLoading: isLoading,
    modelHasError: isError,
  };
};
