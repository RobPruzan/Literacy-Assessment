import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { ExcerptCard } from '../ExcerptLibrary/ExcerptCard';

const InfoCardBar = () => {
  const dispatch = useDispatch();
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
        <ExcerptCard excerptInfo={excerpt} allowDelete={true} />
      ))}
    </div>
  );
};

export default InfoCardBar;
