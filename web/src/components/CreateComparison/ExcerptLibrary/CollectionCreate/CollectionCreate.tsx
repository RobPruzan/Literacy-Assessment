import { BsPlusCircle, BsX } from 'react-icons/bs';
import {
  CollectionCreateInfo,
  InputCollectionCreate,
} from '../../../../services.ts/connections';
import { Tab, Tabs } from '@mui/material';
import { useReducer, useState } from 'react';

import { ExcerptCard } from '../ExcerptCard';
import { IoCreateOutline } from 'react-icons/io5';
import { useCreateCollection } from '../../../hooks/LibraryHooks/useCreateCollection';

export const FAKE_EXCERPT_INFO = {
  id: 0,
  excerpt: {
    id: 0,
    source: '',
    title: 'Some Title again',
  },
  title: 'Some Title',
  difficulty: 0,
  diversity: 0,
  text_length: 0,
  collection: {
    id: 0,
    title: '',
    difficulty: 0,
    total_excerpts: 0,
  },
  region: '',
  source: '',
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
              excerptTitle: action.payload.excerpt_title,
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
            collectionInfo: { text: '', excerptTitle: '' },
            collectionTitle: action.payload.collectionTitle,
          };

        default:
          return state;
      }
    },

    { collectionInfo: { text: '', excerptTitle: '' }, collectionTitle: '' }
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

  // useEffect(() => {
  //   // Animate the position of each card based on its index in the array
  //   collection.forEach((card, index) => {
  //     controls.start({
  //       x: index * 100,
  //       transition: { duration: 0.5 },
  //     });
  //   });
  // }, [collection, controls]);

  const [activeTab, setActiveTab] = useState(ExcerptType.text);

  return showCollectionCreate ? (
    <div className="inset-0 fixed z-50 bg-black bg-opacity-50  flex flex-col  justify-center items-center">
      <div className="bg-white w-3/4 md:h-4/6 md:w-4/6  rounded-x-md rounded-t-md shadow-xl relative flex flex-col justify-evenly ">
        <div
          style={{ height: '10%' }}
          className="w-full  flex justify-center items-center "
        >
          <input
            className="border-b-2 p-2 border-custom-blood-red border-opacity-50 focus:border-orange-400 focus:shadow-orange-400 text-xl focus:outline-none "
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

        <div className="flex w-full justify-evenly p-3 h-4/6">
          <div className="flex flex-col items-center justify-center w-full">
            <Tabs
              className="w-full"
              value={activeTab}
              onChange={(e, newValue) => {
                setActiveTab(newValue);
                console.log(activeTab, newValue, e);
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
                <div className=" flex justify-evenly items-center p-3 w-full">
                  <input
                    placeholder="Title"
                    onChange={(e) =>
                      inputCollectionDispatch({
                        type: 'excerpt_title',
                        payload: { excerpt_title: e.target.value },
                      })
                    }
                    value={inputCollection.collectionInfo.excerptTitle}
                    type="text"
                    name="title create"
                    id="title create"
                    className="border-2  p-2 border-custom-blood-red border-opacity-50 focus:border-orange-400 focus:shadow-orange-400 focus:shadow-sm  rounded-md focus:outline-none "
                  />

                  <BsPlusCircle
                    className="fill-custom-blood-red transition ease-in-out duration-300 hover:fill-orange-400 hover:scale-110 cursor-pointer "
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
                <div className="flex w-full h-full ">
                  <div className="h-full w-full flex flex-col items-start text-center p-3">
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
                      className="h-full border-2 border-custom-blood-red border-opacity-50 p-2  mb-0  rounded-md focus:outline-none resize-none w-full focus:border-orange-400 focus:shadow-orange-400 focus:shadow-sm"
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
            className="text-2xl font-bold cursor-pointer hover:scale-105  hover:fill-red-600"
          >
            X
          </BsX>
        </div>
        <div
          style={{ height: '23%' }}
          className=" overflow-x-scroll flex  justify-start w-full overflow-y-hidden relative bg-white border-t-2  border-custom-blood-red border-opacity-50"
        >
          <p className="absolute top-0 right-0 m-0 text-2xl font-bold text-custom-blood-red">
            {collection.collection.length}
          </p>

          {collection.collection.length > 0 ? (
            collection.collection.map((excerpt, idx) => (
              <div
                key={idx}
                className="flex min-h-fit items-center snap-center  relative"
              >
                <ExcerptCard
                  text_length={excerpt.text.length}
                  title={excerpt.excerptTitle}
                />
              </div>
            ))
          ) : (
            <div className="flex w-full justify-center items-center">
              <p className="text-gray-300 my-5 font-semibold text-2xl">
                No Excerpts Added
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="flex z-50   w-3/4 md:w-4/6 rounded-b-md justify-between px-5 items-center bg-custom-blood-red">
        <div className="flex w-full justify-center p-3 ">
          <button
            onClick={async () => {
              createCollectionMutation.mutate({ collection: collection });
            }}
            className={`${
              createCollectionMutation.isLoading ? 'bg-opacity-50' : null
            }  bg-custom-blood-red text-white text-xl rounded-md font-semibold px-3 py-2 border-2 border-white   hover:bg-orange-400 transition ease-in-out delay-150  hover:scale-105  `}
          >
            {createCollectionMutation.isLoading
              ? 'Loading...'
              : 'Create Collection'}
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div
      onClick={() => setShowCollectionCreate(true)}
      className="hover:bg-gray-200  hover:fill-emerald-400  hover:border-opacity-50 min-w-fit min-h-fit p-2  
      w-52 flex justify-center items-center cursor-pointer  border-2  border-custom-blood-red hover:border-red-400 border-opacity-50  
      rounded-md m-3 shadow-md h-32"
    >
      <IoCreateOutline color="#6b7280" size={40} />
    </div>
  );
};

export default CollectionCreate;
