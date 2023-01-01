import { TextareaAutosize } from '@mui/material';
import React, { useState } from 'react';
import { useMutation } from 'react-query';
import NorthStar from '../../services.ts/connections';
import { useDifficultyScore } from '../hooks/useDifficultyScore';
import { useWindowDifficultyScore } from '../hooks/useWindowDifficultyScore';
import InfoCardBar from '../InfoCardBar.tsx/InfoCardBar';
import { AboutNavbar } from '../Navabars/AboutNavbar';

export const Analysis = () => {
  const [excerpt, setExcerpt] = useState('');

  const {
    data,
    mutate: getDiversityScore,
    isLoading,
    isError,
    error,
  } = useMutation((excerpt: string) =>
    NorthStar.calculateDiversityScore(excerpt)
  );
  const {
    getDifficultyScore,
    difficultyScore,
    modelError,
    modelLoading,
    modelHasError,
  } = useDifficultyScore();

  const {
    getWindowDifficultyScores,
    windowDifficultyScores,
    windowError,
    windowLoading,
    windowHasError,
  } = useWindowDifficultyScore();

  const getStats = () => {
    getDiversityScore(excerpt);
    getDifficultyScore(excerpt);
    getWindowDifficultyScores(excerpt);
  };
  console.log('are you lnwlyo', windowDifficultyScores);

  console.log('way', data);
  return (
    <div>
      <AboutNavbar color={'custom-blue'} />
      <div className="my-5 border-2  border-y-slate-500 p-2">
        <InfoCardBar />
      </div>

      <textarea
        className="border border-custom-blue"
        value={excerpt}
        onChange={(e) => setExcerpt(e.target.value)}
      ></textarea>
      <button onClick={getStats}>Calculate Stats</button>
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error: {`We encountered an error: ${error}`}</div>}
      {data && <div>{data[1]?.diversity_score}</div>}

      {modelLoading && <div>Model Loading...</div>}
      {modelHasError && (
        <div>Model Error: {`We encountered an error: ${modelError}`}</div>
      )}
      {difficultyScore && <div>Difficulty: {difficultyScore}</div>}

      {windowLoading && <div>Window Loading...</div>}
      {windowHasError && (
        <div>Window Error: {`We encountered an error: ${windowError}`}</div>
      )}
      {windowDifficultyScores && (
        <div>
          Window Difficulty:{' '}
          {windowDifficultyScores.raw_scores.reduce((prev, curr) => {
            return prev + curr;
          }, 0) / windowDifficultyScores.raw_scores.length}
        </div>
      )}
    </div>
  );
};
