import CollectionCard from '../Library/CollectionCard';
import CollectionCreate from '../Library/CollectionCreate/CollectionCreate';
import React from 'react';
import { useGetUserColletions } from '../../hooks/LibraryHooks/useGetUserCollections';

type Props = {};

const UserCollections = (props: Props) => {
  const userCollectionsQuery = useGetUserColletions();
  return (
    <div className="flex flex-col justify-between items-center ">
      <div className="flex items-center justify-center bg-white p-2 z-50  fixed border-gray-300 border-b-4 w-1/5">
        <p className="text-2xl font-bold text-gray-400 ">My Collections</p>
      </div>

      <div className="flex flex-col items-center justify-center w-full h-full mt-5">
        <CollectionCreate />
        {userCollectionsQuery.isSuccess &&
          userCollectionsQuery.data.map((collection, index) => (
            <CollectionCard
              key={collection.id}
              isCreating={false}
              collection={collection}
              activePopUp={-1}
              setActivePopUp={function (
                value: React.SetStateAction<number>
              ): void {
                throw new Error('Function not implemented.');
              }}
              index={index}
            />
          ))}
      </div>
    </div>
  );
};

export default UserCollections;
