import { BsX } from 'react-icons/bs';

type Props = {
  title: string;
};

const CollectionInfoCard = ({ title }: Props) => {
  return (
    <div
      style={{
        minWidth: '13rem',
      }}
      className='" relative m-3 flex min-h-fit w-52  flex-col items-center   justify-center rounded-md   border-2  border-custom-blood-red border-opacity-50  bg-white p-2 shadow-md  hover:shadow-orange-200'
    >
      <p className="w-full text-3xl  font-semibold text-gray-300">{title}</p>
      <BsX className="absolute top-0 right-0 cursor-pointer text-2xl text-gray-300" />
    </div>
  );
};

export default CollectionInfoCard;
