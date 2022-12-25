import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { ExcerptCard } from '../CreateComparison/ExcerptLibrary/ExcerptCard';

const InfoCardBar = () => {
  const selectedExcerpts = useSelector(
    ({ selectedExcerptsState }: RootState) =>
      selectedExcerptsState.selectedExcerpts
  );
  return (
    <div
      className="flex flex-row items-center"
      style={{
        overflowX: 'scroll',
      }}
    >
      {selectedExcerpts?.map((excerpt) => (
        <ExcerptCard
          sizeMultiplier={0.5}
          excerptInfo={excerpt}
          allowDelete={true}
          isMinimal={true}
        />
      ))}
    </div>
  );
};

export default InfoCardBar;
