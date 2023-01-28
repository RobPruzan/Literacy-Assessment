import CollectionCard from './CollectionCard';
import { ComparisonTypeStrings } from '../../../redux/reducers/comparisonState';
import { RootState } from '../../../redux/store';
import { useGetCollections } from '../../hooks/LibraryHooks/useGetCollections';
import { useSelector } from 'react-redux';
import { useState } from 'react';

export const ExcerptLibrary = () => {
  const [activePopUp, setActivePopUp] = useState(-1);

  // const getExcerptsQuery = useGetExcerptsLibrary();
  const getCollectionsQuery = useGetCollections();
  const comaprisonType = useSelector(
    ({ comparisonState }: RootState) => comparisonState.comparisonType
  );

  if (getCollectionsQuery.isLoading) return <div>Loading...</div>;
  if (getCollectionsQuery.isError) {
    return (
      <div>
        Error: {`We encountered an error: ${getCollectionsQuery.error}`}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-center">
      {comaprisonType === ComparisonTypeStrings.Collection ? (
        getCollectionsQuery.isSuccess &&
        getCollectionsQuery.data?.map((collection, idx) => (
          <CollectionCard
            key={`collection-${collection.id}`}
            isCreating={false}
            collection={collection}
            activePopUp={activePopUp}
            setActivePopUp={setActivePopUp}
            index={idx}
          />
        ))
      ) : (
        <>hola excerpt here </>
      )}
    </div>
  );
};
