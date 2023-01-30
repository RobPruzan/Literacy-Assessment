import { useEffect, useRef } from 'react';

import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import CollectionCard from '../CreateComparison/Library/CollectionCard';
import { ExcerptCard } from '../CreateComparison/Library/ExcerptCard';

const InfoCardBar = () => {
  const cardBarRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    if (cardBarRef.current) {
      const lastChild = cardBarRef.current.lastElementChild;
      if (lastChild) {
        lastChild.scrollIntoView({
          behavior: 'smooth',
          block: 'end',
          inline: 'nearest',
        });
      }
    }
  }, [selectedExcerpts, selectedCollections]);
  return (
    <div
      ref={cardBarRef}
      className="flex h-full items-center overflow-x-scroll overflow-y-hidden "
    >
      {comparisonType === 'excerpt' ? (
        (selectedExcerpts?.length ?? 0) >= 1 ? (
          <>
            {selectedExcerpts?.map((excerpt) => (
              <ExcerptCard
                sizeMultiplier={0.3}
                difficulty={excerpt.difficulty}
                diversity={excerpt.diversity}
                text_length={excerpt.text_length}
                title={excerpt.excerpt.title}
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
              // <CollectionInfoCard title={collection.title} />
              <div className="scale-75 md:scale-90">
                <CollectionCard
                  isSelected={true}
                  collection={collection}
                  isCreating={false}
                  activePopUp={0}
                  setActivePopUp={() => null}
                  index={0}
                />
              </div>
            ))}
          </>
        )
      )}

      {/* <FileUpload /> */}
    </div>
  );
};

export default InfoCardBar;
