import { Dispatch, SetStateAction } from 'react';

import { BsX } from 'react-icons/bs';
import { CollectionCreateInfo } from '../../../services.ts/connections';
import { FcSearch } from 'react-icons/fc';
import LibraryPopup from './LibraryPopup';
import { SelectedCollectionsActions } from '../../../redux/reducers/selectedCollections';
import { useDispatch } from 'react-redux';
import { useGetExcerptsByCollection } from '../../hooks/LibraryHooks/useGetExcerptsByCollection';

export const COLOR_MAP = (difficulty: number) => {
  if (difficulty <= 30) {
    return 'lime';
  } else if (difficulty <= 60) {
    return 'orange';
  } else {
    return 'red';
  }
};

export type CollectionCardProps = {
  // isUserCollection: boolean;
  isCreating: boolean;
  collectionId: number;
  collectionName: string;
  difficulty: number;
  total_excerpts: number;
  activePopUp: number;
  setActivePopUp: Dispatch<SetStateAction<number>>;
  index: number;
  sizeMultiplier?: number;
  collectionsDispatch?: React.Dispatch<
    | {
        type: 'add';
        payload: {
          collection: CollectionCreateInfo;
        };
      }
    | {
        type: 'remove';
        payload: {
          index: number;
        };
      }
    | {
        type: 'reset';
      }
  >;
};
const CollectionCard = ({
  // userCollection,
  isCreating,
  collectionsDispatch,
  collectionId,
  collectionName,
  difficulty,
  total_excerpts,
  activePopUp,
  setActivePopUp,
  index,
  sizeMultiplier = 1,
}: CollectionCardProps) => {
  const excerptByCollectionQuery = useGetExcerptsByCollection(
    collectionId,
    index
  );
  const dispatch = useDispatch();

  return (
    <>
      {' '}
      <div
        style={{
          minWidth: '13rem',
        }}
        onClick={() => {
          if (excerptByCollectionQuery.isSuccess) {
            dispatch({
              type: SelectedCollectionsActions.AddCollection,
              payload: {
                collectionInfo: excerptByCollectionQuery.data,
              },
            });
          }
        }}
        className={` bg-white hover:shadow-orange-200  min-h-fit p-2   w-52 relative   border-2  border-custom-blood-red border-opacity-50  rounded-md m-3 shadow-md transition ease-in-out delay-75 hover:scale-105 cursor-pointer overflow-x-scroll `}
      >
        <p className="text-center text-gray-500  text-xl  mb-2">
          {collectionName}
        </p>

        <div
          style={{
            color: `${COLOR_MAP(difficulty)}`,
          }}
          className={` text-sm font-semibold`}
        >
          <p className="inline">Difficulty: </p>
          <p className="inline">{difficulty}</p>
        </div>
        <div className="text-center text-gray-500 text-sm font-semibold">
          <p className="inline">Excerpts: </p>
          <p className="inline">{total_excerpts}</p>
        </div>

        {!(activePopUp === index) && (
          <FcSearch
            size={27}
            className="  transition duration-300 ease-in-out hover:scale-125 hover:fill-slate-500 hover:shadow-2xl float-left"
            onClick={() => setActivePopUp(index)}
          />
        )}
        {isCreating ? (
          <BsX
            onClick={() => {
              collectionsDispatch &&
                collectionsDispatch({
                  type: 'remove',
                  payload: { index: index },
                });
            }}
            className="top-0 right-0 absolute fill-red-500 cursor-pointer hover:fill-red-600  scroll-smooth"
            size={30}
          />
        ) : null}
      </div>
      {activePopUp === index && (
        <div className="float left">
          <LibraryPopup
            isLoading={excerptByCollectionQuery.isLoading}
            isError={excerptByCollectionQuery.isError}
            error={excerptByCollectionQuery.error}
            excerptsInfo={excerptByCollectionQuery.data}
            collectionId={collectionId}
            setActivePopUp={setActivePopUp}
            activePopUp={activePopUp}
            keyValue={index}
          />
        </div>
      )}
    </>
  );
};

export default CollectionCard;
