import { BsPlusCircle, BsX, BsXCircle } from 'react-icons/bs';
import { useReducer, useState } from 'react';

import { CollectionCreateInfo } from '../../../../services.ts/connections';
import { ExcerptCard } from '../ExcerptCard';
import { IoCreateOutline } from 'react-icons/io5';
import { SelectedExcerptsActions } from '../../../../redux/reducers/selectedExcerpts';
import { useDispatch } from 'react-redux';

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
  category: {
    id: 0,
    title: '',
    difficulty: 0,
    total_excerpts: 0,
  },
  region: '',
  source: '',
};

type Action =
  | { type: 'title'; payload: string }
  | { type: 'excerpt'; payload: string };

type Props = {};
const CollectionCreate = ({}: Props) => {
  const [showCollectionCreate, setShowCollectionCreate] = useState(false);
  const [inputCollection, inputCollectionDispatch] = useReducer(
    (state: CollectionCreateInfo, action: Action) => {
      switch (action.type) {
        case 'title':
          return { ...state, title: action.payload };

        case 'excerpt':
          return { ...state, excerpt: action.payload };
        default:
          return state;
      }
    },
    {
      title: '',
      excerpt: '',
    }
  );

  console.log(inputCollection);
  return showCollectionCreate ? (
    <div className="inset-0 fixed z-50 bg-black bg-opacity-50  flex flex-col  justify-center items-center">
      <div
        // style={{ height: '50vh' }}
        className="bg-white w-3/4 h-3/4 md:h-4/6 md:w-4/6  rounded-md shadow-xl relative   flex flex-col justify-center items-start  "
      >
        <div className="flex flex-col  w-1/4 p-3 text-xl">
          <label className="text-gray-500 font-semibold" htmlFor="title create">
            Title
          </label>
          <input
            onChange={(e) =>
              inputCollectionDispatch({
                type: 'title',
                payload: e.target.value,
              })
            }
            value={inputCollection.title}
            type="text"
            name="title create"
            id="title create"
            className="border-2 border-custom-blood-red border-opacity-50 focus:border-orange-400 focus:shadow-orange-400 focus:shadow-sm  rounded-md focus:outline-none p-2"
          />
        </div>

        <div className="flex w-full h-full border-b-2 border-custom-blood-red">
          <div className="h-full w-full flex flex-col items-start text-center p-3">
            <label
              className="text-gray-500 font-semibold text-xl "
              htmlFor="description create"
            >
              Excerpt
            </label>
            <textarea
              onChange={(e) =>
                inputCollectionDispatch({
                  type: 'excerpt',
                  payload: e.target.value,
                })
              }
              value={inputCollection.excerpt}
              name="description create"
              id="description create"
              className="h-full border-2 border-custom-blood-red border-opacity-50 p-2  mb-0  rounded-md focus:outline-none resize-none w-full focus:border-orange-400 focus:shadow-orange-400 focus:shadow-sm"
            />
          </div>

          <div className="flex flex-col items-center  w-1/4">
            <div className="h-50 flex items-end justify-center">
              <BsPlusCircle
                color="red"
                size={60}
                className="text-2xl font-bold cursor-pointer transition ease-in-out delay-75 hover:scale-105 fill-custom-blood-red hover:fill-orange-400"
              />
            </div>
            <div className="h-50 flex flex-col justify-end py-3 w-10/12">
              <button className="bg-custom-blood-red text-white text-xl rounded-md font-semibold py-2 m-2 mb-0 hover:bg-orange-400 transition ease-in-out delay-150  hover:scale-105  ">
                Save
              </button>
            </div>
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
        <div className="snap-x scroll-px-6 overflow-x-scroll flex  w-full min-h-fit overflow-y-hidden p-3">
          {[...Array(14)].map((_, i) => (
            <div
              key={i}
              className="flex min-h-fit items-center snap-center m-4  "
            >
              <div className="div ">
                <ExcerptCard
                  excerptInfo={{
                    id: 0,
                    excerpt: {
                      id: 0,
                      source: '',
                      title: 'Example Title',
                    },
                    title: '',
                    difficulty: 0,
                    diversity: 0,
                    text_length: 0,
                    category: {
                      id: 0,
                      title: '',
                      difficulty: 0,
                      total_excerpts: 0,
                    },
                    region: '',
                    source: '',
                  }}
                />
              </div>
            </div>
          ))}
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
