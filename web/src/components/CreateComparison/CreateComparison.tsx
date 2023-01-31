import InfoCardBar from '../InfoCardBar.tsx/InfoCardBar';
import { AboutNavbar } from '../Navabars/AboutNavbar';
import CompareExcerptsActions from './CompareActions/CompareExcerptsActions';
import ComparisonTypeToggle from './ComparisonTypeToggle';
import Filters from './Filters/FIlters';
import { ExcerptLibrary } from './Library/Library';
import UserCollections from './MyCollections/UserCollections';

export const CreateComparison = () => {
  return (
    <>
      <div className="flex flex-col h-screen w-screen overflow-hidden  max-w-full  ">
        <AboutNavbar color="custom-blood-red" />
        <div className=" flex justify-center items-center overflow-hidden flex-grow">
          <div className="h-full div bo-blue-200 grid grid-cols-5 grid-rows-6 w-screen">
            <div className="div bg-white text-white text-center text-5xl   col-span-5 grid grid-cols-5 row-span-1 overflow-hidden ">
              <div className="col-span-5 text-lg shadow-inner border-b-2 border-custom-blood-red border-opacity-50 overflow-x-scroll ">
                <InfoCardBar />
              </div>
            </div>
            <div className=" bg-white border-42 border-b-1 sm:border-b-0 md:border-l-0 border-r-0 border-l-0  border-custom-blood-red text-white text-center text-5xl pb-4  md:row-span-6 md:col-span-1  col-span-4 overflow-y-hidden row-span-1 items-center z-10 shadow-xl">
              {/* <div className="grid grid-rows-5">
                <div className="row-span-1">
                  <ComparisonTypeToggle />
                </div>
                <div className="row-span-3">
                  <Filters />
                </div>
                <div className="row-span-1">
                  <button className="bg-custom-blood-red text-white text-lg font-bold py-2 px-4 rounded">
                    Create Comparison
                  </button>
                </div>
              </div> */}

              <div className="flex flex-col justify-evenly items-center h-full w-full">
                <div className="float-top  w-full">
                  {' '}
                  <ComparisonTypeToggle />
                </div>
                <Filters />
                {/* <div className="row-span-1">
                  <ComparisonTypeToggle />
                </div>
                <div className="row-span-3">
                  <Filters />
                </div>
                <div className="row-span-1">
                  <button className="bg-custom-blood-red text-white text-lg font-bold py-2 px-4 rounded">
                    Create Comparison
                  </button> */}
                <div>
                  <CompareExcerptsActions />;{/* </div> */}
                </div>
              </div>
            </div>
            <div className="overflow-y-scroll bg-white border-2 border-gray-100 text-center sm:border-b-0   text-lg  md:col-span-3 md:row-span-7 col-span-5 row-span-5 h-full ">
              <section className=" w-full">
                <ExcerptLibrary />
              </section>
            </div>
            <div className="col-span-1 row-span-5 overflow-y-scroll flex flex-col px-2 items-center h-full shadow-xl ">
              <section className="w-full">
                <UserCollections />
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
