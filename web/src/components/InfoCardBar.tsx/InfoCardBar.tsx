import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { ExcerptCard } from '../CreateComparison/ExcerptLibrary/ExcerptCard';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const InfoCardBar = () => {
  const selectedExcerpts = useSelector(
    ({ selectedExcerptsState }: RootState) =>
      selectedExcerptsState.selectedExcerpts
  );
  return (
    <div className="flex h-full items-center overflow-scroll">
      <div
        style={{
          minWidth: '11rem',
        }}
        className="
  
   border-2 border-custom-blue
    text-white
    font-bold
    py-2
    px-3 
    rounded-md
    mx-2
    
    h-24
    w-44
    shadow-md
    hover:shadow-lg
    flex
    justify-center
    items-center min-h-fit
  

    "
      >
        <AddCircleOutlineIcon
          sx={{ '&:hover': { fill: '#A0B3BD' }, fill: 'gray' }}
          fontSize="large"
        />
      </div>
      {/* <FileUpload /> */}
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
