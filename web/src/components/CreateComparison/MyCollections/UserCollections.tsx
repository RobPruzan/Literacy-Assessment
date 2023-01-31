import React from 'react';
import { useGetUserColletions } from '../../hooks/LibraryHooks/useGetUserCollections';
import CollectionCard from '../Library/CollectionCard';
import CollectionCreate from '../Library/CollectionCreate/CollectionCreate';

type Props = {};

const UserCollections = (props: Props) => {
  const userCollectionsQuery = useGetUserColletions();
  return (
    <div className="flex flex-col items-center justify-between ">
      <div className="fixed z-50 flex w-1/5 items-center justify-center  border-b-4 border-gray-300 bg-white p-2">
        <p className="text-2xl font-bold text-gray-400 ">My Collections</p>
      </div>

      <div className="mt-5 flex h-full w-full flex-col items-center justify-center">
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
