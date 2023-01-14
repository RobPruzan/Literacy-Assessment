import { AboutNavbar } from '../Navabars/AboutNavbar';
import CompareActions from './CompareActions/CompareActions';
import { ExcerptLibrary } from './ExcerptLibrary/ExcerptLibrary';
import Filters from './Filters/FIlters';
import InfoCardBar from '../InfoCardBar.tsx/InfoCardBar';

export const CreateComparison = () => {
  return (
    <>
      <div className="flex flex-col h-screen w-screen  max-w-full  ">
        <AboutNavbar color="custom-blood-red" />
        <div className=" flex justify-center items-center flex-grow">
          <div className="h-full div bo-blue-200  grid grid-cols-4 grid-rows-6 w-screen">
            <div className="div bg-white text-white text-center text-5xl   col-span-4 grid grid-cols-5 row-span-1 ">
              <div className="col-span-4 text-lg border border-custom-blood-red">
                <InfoCardBar />
              </div>
              <div className="col-span-1 text-base border-2 border-y-0 border-custom-blood-red  flex items-center justify-around">
                <CompareActions />
              </div>
            </div>
            <div className=" bg-white border-2 border-b-1 sm:border-b-0 md:border-l-0 border-r-0 border-l-0  border-custom-blood-red text-white text-center text-5xl py-4  md:row-span-6 md:col-span-1  col-span-4 row-span-1 items-center ">
              <Filters />
            </div>
            <div className="div bg-white text-center sm:border-b-0 sm:border-t-2  border-x-2 border-t-1 p-4   border-custom-blood-red text-lg  md:col-span-3 md:row-span-6 col-span-4 row-span-5   ">
              <ExcerptLibrary />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
