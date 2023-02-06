import InfoCardBar from '../InfoCardBar.tsx/InfoCardBar';
import { AboutNavbar } from '../Navabars/AboutNavbar';
import CompareCollectionsActions from './CompareActions/CompareCollectionsActions';
import ComparisonTypeToggle from './ComparisonTypeToggle';
import Filters from './Filters/FIlters';
import { ExcerptLibrary } from './Library/Library';
import UserCollections from './MyCollections/UserCollections';

export const CreateComparison = () => {
  return (
    <>
      <div className="flex h-screen w-screen max-w-full flex-col  overflow-hidden  ">
        <AboutNavbar color="custom-blood-red" />
        <div className="flex flex-grow items-center justify-center  overflow-hidden">
          <div className="div bo-blue-200 grid h-full w-screen grid-cols-5 grid-rows-6">
            <div className="div col-span-5 row-span-1  grid grid-cols-5  overflow-hidden bg-white text-center text-5xl text-white ">
              <div className="col-span-5 overflow-x-scroll border-b-2 border-custom-blood-red border-opacity-50 text-lg shadow-inner ">
                <InfoCardBar />
              </div>
            </div>
            <div className=" border-42 border-b-1 z-10  col-span-1 row-span-6  items-center  overflow-y-hidden border-r-0 border-l-0  border-custom-blood-red bg-white  pb-4 text-center text-5xl text-white shadow-xl sm:border-b-0">
              <div className="flex h-full w-full flex-col items-center justify-evenly">
                <div className="float-top  w-full">
                  {' '}
                  <ComparisonTypeToggle />
                </div>
                <Filters />

                <div>
                  <CompareCollectionsActions />;{/* </div> */}
                </div>
              </div>
            </div>
            <div className="row-span-7  col-span-3 row-span-5 h-full overflow-y-scroll   border-2  border-gray-100 bg-white text-center text-lg sm:border-b-0 ">
              <section className=" w-full">
                <ExcerptLibrary />
              </section>
            </div>
            <div className="col-span-1 row-span-5 flex h-full flex-col items-center overflow-y-scroll px-2 shadow-xl ">
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
