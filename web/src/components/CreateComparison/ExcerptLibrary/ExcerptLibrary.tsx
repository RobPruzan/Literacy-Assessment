import CollectionCard from './CollectionCard';
import { useGetCollections } from '../../hooks/LibraryHooks/useGetCollections';
import { useGetExcerptsLibrary } from '../../hooks/LibraryHooks/useGetExcerptsLibrary';
import { useState } from 'react';

export const ExcerptLibrary = () => {
  const [activePopUp, setActivePopUp] = useState(-1);

  // const getExcerptsQuery = useGetExcerptsLibrary();
  const getCollectionsQuery = useGetCollections();

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
      {getCollectionsQuery.isSuccess &&
        getCollectionsQuery.data?.map((collection, idx) => (
          <CollectionCard
            collectionId={collection.id}
            collectionName={collection.title}
            difficulty={collection.difficulty}
            total_excerpts={collection.total_excerpts}
            activePopUp={activePopUp}
            setActivePopUp={setActivePopUp}
            index={idx}
          />
        ))}
    </div>
  );
};
