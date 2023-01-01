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
    <div className="flex h-full items-center overflow-scroll">
      {selectedExcerpts?.map((excerpt) => (
        <ExcerptCard
          sizeMultiplier={0.3}
          excerptInfo={excerpt}
          allowDelete={true}
          isMinimal={true}
        />
      ))}
    </div>
  );
};

export default InfoCardBar;
