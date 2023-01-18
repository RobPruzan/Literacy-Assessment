import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { ExcerptCard } from '../CreateComparison/ExcerptLibrary/ExcerptCard';
import React from 'react';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';

const InfoCardBar = () => {
  const selectedExcerpts = useSelector(
    ({ selectedExcerptsState }: RootState) =>
      selectedExcerptsState.selectedExcerpts
  );
  return (
    <div className="flex h-full items-center overflow-scroll ">
      {(selectedExcerpts?.length ?? 0) >= 1 ? (
        <>
          {selectedExcerpts?.map((excerpt) => (
            <ExcerptCard
              sizeMultiplier={0.3}
              excerptInfo={excerpt}
              allowDelete={true}
              isMinimal={true}
            />
          ))}
        </>
      ) : (
        <p className="text-3xl w-full  text-gray-300 font-semibold">
          Add Collections to Compare
        </p>
      )}
      {/* <FileUpload /> */}
    </div>
  );
};

export default InfoCardBar;
