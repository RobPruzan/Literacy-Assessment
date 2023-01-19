import { AboutNavbar } from '../Navabars/AboutNavbar';
import ComparisonTypeToggle from './ComparisonTypeToggle';
import { ExcerptLibrary } from './ExcerptLibrary/ExcerptLibrary';
import Filters from './Filters/FIlters';
import InfoCardBar from '../InfoCardBar.tsx/InfoCardBar';

export const CreateComparison = () => {
  return (
    <>
      <div className="flex flex-col h-screen w-screen  max-w-full  ">
        <AboutNavbar color="custom-blood-red" />
        <div className=" flex justify-center items-center flex-grow">
          <div className="h-full div bo-blue-200  grid grid-cols-5 grid-rows-6 w-screen">
            <div className="div bg-white text-white text-center text-5xl   col-span-5 grid grid-cols-5 row-span-1  ">
              <div className="col-span-5  text-lg shadow-inner border-b-2 border-custom-blood-red border-opacity-50">
                <InfoCardBar />
              </div>
            </div>
            <div className=" bg-white border-42 border-b-1 sm:border-b-0 md:border-l-0 border-r-0 border-l-0  border-custom-blood-red text-white text-center text-5xl pb-4  md:row-span-6 md:col-span-1  col-span-4 overflow-y-hidden row-span-1 items-center z-10 shadow-xl">
              <div className="grid grid-rows-5">
                <div className="row-span-1">
                  <ComparisonTypeToggle />
                </div>
                <div className="row-span-4">
                  {' '}
                  <Filters />
                </div>
              </div>
            </div>
            <div className="div bg-white border-2 border-gray-100 text-center sm:border-b-0   text-lg  md:col-span-3 md:row-span-7 col-span-5 row-span-5 h-full ">
              <section className=" w-full">
                <ExcerptLibrary />
              </section>
            </div>
            <div className="col-span-1 row-span-5  flex flex-col p-2 items-center h-full shadow-xl"></div>
          </div>
        </div>
      </div>
    </>
  );
};
