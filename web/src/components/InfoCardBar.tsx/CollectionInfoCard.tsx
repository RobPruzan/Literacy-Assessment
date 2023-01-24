import { BsX } from 'react-icons/bs';
import React from 'react';

type Props = {
  title: string;
};

const CollectionInfoCard = ({ title }: Props) => {
  return (
    <div
      style={{
        minWidth: '13rem',
      }}
      className='flex flex-col justify-center items-center bg-white hover:shadow-orange-200  min-h-fit p-2   w-52 relative   border-2  border-custom-blood-red border-opacity-50  rounded-md m-3 shadow-md  "'
    >
      <p className="text-3xl w-full  text-gray-300 font-semibold">{title}</p>
      <BsX className="absolute top-0 right-0 text-2xl text-gray-300 cursor-pointer" />
    </div>
  );
};

export default CollectionInfoCard;
