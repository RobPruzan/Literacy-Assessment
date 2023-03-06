import { Tab, Tabs } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { useReducer, useState } from 'react';
import { BsPlusCircle, BsX } from 'react-icons/bs';
import {
  CollectionCreateInfo,
  InputCollectionCreate,
} from '../../../../services.ts/connections';

import { IoCreateOutline } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { useCreateCollection } from '../../../hooks/LibraryHooks/useCreateCollection';
import { ExcerptCard } from '../ExcerptCard';

const dropIn = {
  hidden: { opacity: 0, y: -100 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeInOut',
    },
  },
  exit: {
    opacity: 0,
    y: -100,
    transition: {
      duration: 0.5,
      ease: 'easeInOut',
    },
  },
};

type InputCollectionAction =
  | { type: 'excerpt_title'; payload: { excerpt_title: string } }
  | { type: 'excerpt'; payload: { excerpt: string } }
  | { type: 'reset'; payload: { collectionTitle: string } }
  | { type: 'title'; payload: { title: string } };

type CollectionCreateAction =
  | { type: 'add'; payload: { collection: InputCollectionCreate } }
  | { type: 'remove'; payload: { index: number } }
  | { type: 'reset' };

export enum ExcerptType {
  'text' = 'text',
  'file' = 'file',
}
type ReducerType = (
  state: CollectionCreateInfo,
  action: InputCollectionAction
) => CollectionCreateInfo[];
type Props = {};
const CollectionCreate = ({}: Props) => {
  const [showCollectionCreate, setShowCollectionCreate] = useState(false);
  const user = useSelector(({ userState }: RootState) => userState.user);
  // const [animationState, setAnimationState] = useState(false);
  // const controls = useAnimation();

  const createCollectionMutation = useCreateCollection(() =>
    setShowCollectionCreate(false)
  );
  const [inputCollection, inputCollectionDispatch] = useReducer(
    (
      state: InputCollectionCreate,
      action: InputCollectionAction
    ): InputCollectionCreate => {
      switch (action.type) {
        case 'excerpt_title':
          return {
            ...state,
            collectionInfo: {
              ...state.collectionInfo,
              title: action.payload.excerpt_title,
            },
          };
        case 'title':
          return {
            ...state,
            collectionTitle: action.payload.title,
          };
        case 'excerpt':
          return {
            ...state,
            collectionInfo: {
              ...state.collectionInfo,
              text: action.payload.excerpt,
            },
          };
        case 'reset':
          return {
            collectionInfo: { ...state.collectionInfo, text: '', title: '' },
            collectionTitle: action.payload.collectionTitle,
          };

        default:
          return state;
      }
    },

    {
      collectionInfo: { text: '', title: '', source_user: user?.id ?? null },
      collectionTitle: '',
    }
  );

  const [collection, collectionDispatch] = useReducer(
    (
      state: CollectionCreateInfo,
      action: CollectionCreateAction
    ): CollectionCreateInfo => {
      switch (action.type) {
        case 'add':
          if (
            !action.payload.collection.collectionTitle ||
            !action.payload.collection.collectionInfo
          ) {
            return state;
          }

          inputCollectionDispatch({
            type: 'reset',
            payload: { collectionTitle: inputCollection.collectionTitle },
          });
          return {
            ...state,
            title: action.payload.collection.collectionTitle,
            collection: [
              ...state.collection,
              action.payload.collection.collectionInfo,
            ],
          };

        case 'reset':
          return { collection: [], title: '' };
        default:
          return state;
      }
    },
    { collection: [], title: '' }
  );

  const [activeTab, setActiveTab] = useState(ExcerptType.text);

  return showCollectionCreate ? (
    <div
      onClick={(e) => {
        // e.target is the element that was clicked
        // e.currentTarget is the element that the event listener is attached to
        // so if they are equal then the click was on the div
        // if they are not equal then the click was on the modal
        if (e.target === e.currentTarget) {
          setShowCollectionCreate(false);
        }
      }}
      className="fixed  inset-0 z-50 flex flex-col  items-center justify-center   bg-black bg-opacity-50"
    >
      <AnimatePresence>
        <motion.div
          variants={dropIn}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="rounded-x-md   relative flex w-3/4  flex-col justify-evenly rounded-t-md bg-white shadow-xl md:h-4/6 md:w-4/6 "
        >
          <div
            style={{ height: '11.66%' }}
            className="flex w-full items-center justify-center rounded-t-md bg-custom-blood-red p-2  "
          >
            <input
              className=" rounded-lg 
               rounded-t-md border-2 border-opacity-50 p-2  text-xl focus:border-gray-400 focus:shadow-orange-400 focus:outline-none "
              type="text"
              value={inputCollection.collectionTitle}
              onChange={(e) =>
                inputCollectionDispatch({
                  type: 'title',
                  payload: { title: e.target.value },
                })
              }
              placeholder="Collection Title"
            />
          </div>

          <div className="flex h-4/6 w-full justify-evenly p-3">
            <div className="flex w-full flex-col items-center justify-center">
              <Tabs
                className="w-full"
                value={activeTab}
                onChange={(e, newValue) => {
                  setActiveTab(newValue);
                }}
                aria-label="tabs"
                variant="fullWidth"
              >
                <Tab value={ExcerptType.text} label="Text" aria-label="text" />

                <Tab
                  value={ExcerptType.file}
                  // label of tab is named file extension
                  label="File"
                  aria-label="file"
                />
              </Tabs>
              {activeTab === ExcerptType.text && (
                <>
                  <div className=" flex w-full items-center justify-evenly p-3">
                    <input
                      placeholder="Title"
                      onChange={(e) =>
                        inputCollectionDispatch({
                          type: 'excerpt_title',
                          payload: { excerpt_title: e.target.value },
                        })
                      }
                      value={inputCollection.collectionInfo.title}
                      type="text"
                      name="title create"
                      id="title create"
                      className="rounded-md  border-2 border-custom-blood-red border-opacity-50 p-2 focus:border-orange-400 focus:shadow-sm  focus:shadow-orange-400 focus:outline-none "
                    />

                    <BsPlusCircle
                      className="cursor-pointer fill-custom-blood-red transition duration-300 ease-in-out hover:scale-110 hover:fill-orange-400 "
                      size={50}
                      onClick={() => {
                        collectionDispatch({
                          type: 'add',
                          payload: { collection: inputCollection },
                        });
                      }}
                      aria-label="add"
                    />
                  </div>
                  <div className="flex h-full w-full ">
                    <div className="flex h-full w-full flex-col items-start p-3 text-center">
                      <textarea
                        placeholder="Excerpt..."
                        onChange={(e) =>
                          inputCollectionDispatch({
                            type: 'excerpt',
                            payload: { excerpt: e.target.value },
                          })
                        }
                        value={inputCollection.collectionInfo.text}
                        name="description create"
                        id="description create"
                        className="mb-0 h-full w-full resize-none rounded-md  border-2  border-custom-blood-red border-opacity-50 p-2 focus:border-orange-400 focus:shadow-sm focus:shadow-orange-400 focus:outline-none"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="absolute top-0 right-0 ">
            <BsX
              color="red"
              size={45}
              onClick={() => setShowCollectionCreate(false)}
              className="cursor-pointer text-2xl font-bold hover:scale-105  hover:fill-red-600"
            >
              X
            </BsX>
          </div>
          <div
            style={{ height: '22%' }}
            className=" relative flex  w-full justify-start overflow-y-hidden overflow-x-scroll border-opacity-50 bg-white"
          >
            <p className="absolute top-0 right-0 m-0 text-2xl font-bold text-custom-blood-red">
              {collection.collection.length}
            </p>

            {collection.collection.length > 0 ? (
              collection.collection.map((excerpt, idx) => (
                <div
                  key={idx}
                  className="relative flex min-h-fit snap-center  items-center"
                >
                  <ExcerptCard
                    text_length={excerpt.text.length}
                    title={excerpt.title}
                  />
                </div>
              ))
            ) : (
              <div className="flex w-full items-center justify-center">
                <p className="my-5 text-2xl font-semibold text-gray-300">
                  No Excerpts Added
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
      <AnimatePresence>
        <motion.div
          variants={dropIn}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="z-50 flex   w-3/4 items-center justify-between rounded-b-md bg-custom-blood-red px-5 md:w-4/6"
        >
          <div className="flex w-full justify-center p-3 ">
            <button
              onClick={async () => {
                createCollectionMutation.mutate({ collection: collection });
              }}
              className={`${
                createCollectionMutation.isLoading ? 'bg-opacity-50' : null
              }  rounded-md border-2 border-white bg-custom-blood-red px-3 py-2 text-xl font-semibold text-white   transition ease-in-out hover:scale-105   hover:bg-orange-400  `}
            >
              {createCollectionMutation.isLoading
                ? 'Loading...'
                : 'Create Collection'}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  ) : (
    <div
      onClick={() => setShowCollectionCreate(true)}
      className="m-3  flex  h-32 min-h-fit w-52 min-w-fit  
      cursor-pointer items-center justify-center rounded-md border-2  border-custom-blood-red  border-opacity-50 p-2 shadow-md  
      hover:border-red-400 hover:border-opacity-50 hover:bg-gray-200 hover:fill-emerald-400"
    >
      <IoCreateOutline color="#6b7280" size={40} />
    </div>
  );
};

export default CollectionCreate;
