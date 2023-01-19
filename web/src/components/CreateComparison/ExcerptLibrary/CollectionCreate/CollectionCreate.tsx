import { BsX } from 'react-icons/bs';
import { IoCreateOutline } from 'react-icons/io5';
import TextTab from './TextTab';
import { useState } from 'react';

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
        <div>
          <TextTab />
        </div>
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
