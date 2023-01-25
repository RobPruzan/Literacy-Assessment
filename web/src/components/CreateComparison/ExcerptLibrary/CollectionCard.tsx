import {
  Collection,
  CollectionCreateInfo,
} from '../../../services.ts/connections';
import { Dispatch, SetStateAction } from 'react';
import Gah, { NO_ACTIVE_POPUP } from './CollectionCreate/Gah';
import { motion, useAnimation } from 'framer-motion';

import { BsX } from 'react-icons/bs';
import { MouseEvent } from 'react';
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
  collection: Collection;
  isSelected?: boolean;
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
export type Pixel = number;
export type Coordinates = {
  x: Pixel;
  y: Pixel;
};
const CollectionCard = ({
  // userCollection,
  isSelected,
  isCreating,
  collectionsDispatch,
  collection,
  activePopUp,
  setActivePopUp,

  sizeMultiplier = 1,
}: CollectionCardProps) => {
  const excerptByCollectionQuery = useGetExcerptsByCollection(collection.id);

  const controls = useAnimation();

  const handleClick = (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    if (excerptByCollectionQuery.isSuccess && activePopUp === NO_ACTIVE_POPUP) {
      controls.start({
        x: 100,
        transition: { duration: 0.5 },
      });
      dispatch({
        type: SelectedCollectionsActions.AddCollection,
        payload: {
          collectionInfo: collection,
        },
      });
    }
  };
  const dispatch = useDispatch();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      // transition={{ type: 'spring', stiffness: 100 }}
      animate={{ opacity: 1 }}
      className="flex flex-col"
    >
      {' '}
      <motion.button
        whileHover={{ scale: isSelected ? 1 : 1.1 }}
        whileTap={{ scale: isSelected ? 1 : 1 }}
        style={{
          minWidth: '13rem',
        }}
        onClick={handleClick}
        className={` ${
          isSelected ? 'bg-gray-100' : 'bg-white'
        } hover:shadow-orange-200  min-h-fit p-2   w-52 relative   border-2  border-custom-blood-red border-opacity-50  rounded-md m-3 shadow-md transition ease-in-out  cursor-pointer overflow-x-scroll `}
      >
        <p className="text-center text-gray-500  text-xl  mb-2">
          {collection.title}
        </p>

        <div
          style={{
            color: `${COLOR_MAP(collection.difficulty)}`,
          }}
          className={` text-sm font-semibold`}
        >
          <p className="inline">Difficulty: </p>
          <p className="inline">{collection.difficulty}</p>
        </div>
        <div className="text-center text-gray-500 text-sm font-semibold">
          <p className="inline">Excerpts: </p>
          <p className="inline">{collection.total_excerpts}</p>
        </div>

        {excerptByCollectionQuery.isSuccess && (
          <Gah
            excerptsInfo={excerptByCollectionQuery.data}
            activePopUp={activePopUp}
            setActivePopUp={setActivePopUp}
            collectionId={collection.id}
          />
        )}
        {isSelected ? (
          <BsX
            onClick={() => {
              dispatch({
                type: SelectedCollectionsActions.RemoveCollection,
                payload: {
                  collectionInfo: collection,
                },
              });
              // collectionsDispatch &&
              //   collectionsDispatch({
              //     type: 'remove',
              //     payload: { index: collection.id },
              //   });
            }}
            className="top-0 right-0 absolute fill-red-500 cursor-pointer hover:fill-red-600  scroll-smooth"
            size={30}
          />
        ) : null}
      </motion.button>
    </motion.div>
  );
};

export default CollectionCard;
