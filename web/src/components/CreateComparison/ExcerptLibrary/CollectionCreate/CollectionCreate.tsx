import { BsX } from 'react-icons/bs';
import { ExcerptCard } from '../ExcerptCard';
import { IoCreateOutline } from 'react-icons/io5';
import TextTab from './TextTab';
import { useState } from 'react';
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
type Props = {};

const CollectionCreate = ({}: Props) => {
  const [showCollectionCreate, setShowCollectionCreate] = useState(false);

  return showCollectionCreate ? (
    <div className="inset-0 fixed z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white w-1/2 h-1/2 rounded-md shadow-xl relative">
        <div className="absolute bottom-0 left-0 p-2">
          <BsX
            color="red"
            size={45}
            onClick={() => setShowCollectionCreate(false)}
            className="text-2xl font-bold cursor-pointer hover:scale-105  hover:fill-red-600"
          >
            X
          </BsX>
        </div>
        {/* <div
          style={{
            border: '1px solid',
          }}
          className="flex border-custom-blood-red rounded-sm w-full h-32"
        ></div>
        <div className="p-5">
          <ExcerptCard excerptInfo={FAKE_EXCERPT_INFO} />
        </div> */}
      </div>
    </div>
  ) : (
    <div
      onClick={() => setShowCollectionCreate(true)}
      className="hover:bg-gray-50 hover:shadow-xl hover:fill-emerald-400  hover:border-opacity-50 min-w-fit min-h-fit p-2  w-52 flex justify-center items-center cursor-pointer  border-2  border-custom-blood-red hover:border-red-400 border-opacity-50  rounded-md m-3 shadow-md"
    >
      <IoCreateOutline color="#6b7280" size={40} />
    </div>
  );
};

export default CollectionCreate;
