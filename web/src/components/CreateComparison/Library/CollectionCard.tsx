import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import { Dispatch, SetStateAction } from 'react';
import {
  Collection,
  CollectionCreateInfo,
} from '../../../services.ts/connections';
import Gah, { NO_ACTIVE_POPUP } from './CollectionCreate/Gah';

import { BsX } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { SelectedCollectionsActions } from '../../../redux/reducers/selectedCollections';
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
  // const [isDragging, setIsDragging] = useState(false);

  const excerptByCollectionQuery = useGetExcerptsByCollection(collection.id);

  const controls = useAnimation();

  const handleClick = () => {
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
      animate={{ opacity: 1 }}
      className={`flex flex-col`}
    >
      <AnimatePresence>
        <motion.button
          exit={{ opacity: 0 }}
          whileHover={{ scale: isSelected ? 1 : 1.1 }}
          whileTap={{ scale: 1 }}
          style={{
            minWidth: '13rem',
          }}
          onClick={handleClick}
          className={` ${
            isSelected ? 'mx-3 bg-gray-100' : 'm-3 bg-white'
          } relative  min-h-fit w-52   cursor-pointer overflow-x-scroll   rounded-md  border-2 border-custom-blood-red  border-opacity-50 p-2 shadow-md transition  ease-in-out hover:shadow-orange-200 `}
        >
          <p className="mb-2 text-center  text-xl  text-gray-500">
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
          <div className="text-center text-sm font-semibold text-gray-500">
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
              }}
              className="absolute top-0 right-0 cursor-pointer scroll-smooth fill-red-500  hover:fill-red-600"
              size={30}
            />
          ) : null}
        </motion.button>
      </AnimatePresence>
    </motion.div>
  );
};

export default CollectionCard;
