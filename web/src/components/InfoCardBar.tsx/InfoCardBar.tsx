import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CollectionCard from '../CreateComparison/ExcerptLibrary/CollectionCard';
import CollectionInfoCard from './CollectionInfoCard';
import { ExcerptCard } from '../CreateComparison/ExcerptLibrary/ExcerptCard';
import React from 'react';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';

const InfoCardBar = () => {
  const selectedExcerpts = useSelector(
    ({ selectedExcerptsState }: RootState) =>
      selectedExcerptsState.selectedExcerpts
  );

  const selectedCollections = useSelector(
    ({ selectedCollectionState }: RootState) =>
      selectedCollectionState.selectedCollections
  );

  const comparisonType = useSelector(
    ({ comparisonState }: RootState) => comparisonState.comparisonType
  );
  return (
    <div className="flex h-full items-center overflow-scroll ">
      {comparisonType === 'excerpt' ? (
        (selectedExcerpts?.length ?? 0) >= 1 ? (
          <>
            {selectedExcerpts?.map((excerpt) => (
              <ExcerptCard
                sizeMultiplier={0.3}
                difficulty={excerpt.difficulty}
                diversity={excerpt.diversity}
                text_length={excerpt.text_length}
                title={excerpt.title}
                allowDelete={true}
                isMinimal={true}
              />
            ))}
          </>
        ) : (
          <p className="text-3xl w-full  text-gray-300 font-semibold">
            Add Collections to Excerpts
          </p>
        )
      ) : (
        (selectedCollections?.length ?? 0) >= 1 && (
          <>
            {/* {selectedCollections?.map((collection) => (
              <CollectionCard
                isCreating={false}
                collectionId={0}
                collectionName={''}
                difficulty={0}
                total_excerpts={0}
                activePopUp={-1}
                setActivePopUp={function (
                  value: React.SetStateAction<number>
                ): void {
                  throw new Error('Function not implemented.');
                }}
                index={0}
              />
            ))} */}
            {selectedCollections?.map((collection) => (
              <CollectionInfoCard title={collection.title} />
            ))}
          </>
        )
      )}

      {/* <FileUpload /> */}
    </div>
  );
};

export default InfoCardBar;
