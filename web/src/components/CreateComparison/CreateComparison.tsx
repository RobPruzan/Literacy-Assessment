import React from 'react';
import CompareActions from './CompareActions/CompareActions';
import { Description } from './Description';
import { ExcerptLibrary } from './ExcerptLibrary/ExcerptLibrary';
import InfoCardBar from '../InfoCardBar.tsx/InfoCardBar';

import { MainNavbar } from '../Navabars/MainNavbar';
import { AboutNavbar } from '../Navabars/AboutNavbar';

export const CreateComparison = () => {
  return (
    <>
      <div className="flex flex-col h-screen">
        <AboutNavbar color="custom-blue" />
        <div className=" flex justify-center items-center flex-grow">
          <div className="h-full div bo-blue-200  grid grid-cols-4 grid-rows-11 w-screen">
            <div className=" bg-white font-semibold mx-5 flex items-center  text-custom-blue   text-4xl rounded-lg col-span-4 sm:row-span-1">
              <div className="flex flex-col">
                <p>Compare Text</p>
                <p className="text-xl font-normal mt-2">
                  Select from our catalog of literature to compare and gain
                  insight into
                </p>
              </div>
            </div>
            <div className="div bg-white text-white text-center text-5xl  rounded-lg col-span-4 grid grid-cols-4 ">
              <div className="col-span-3 text-lg border border-custom-blue">
                <InfoCardBar />
              </div>
              <div className="col-span-1 text-base border border-custom-blue ">
                <CompareActions />
              </div>
            </div>
            <div className=" bg-custom-blue text-white text-center text-5xl py-4 rounded-lg md:row-span-6 md:col-span-1  col-span-4 row-span-1 items-center border border-white">
              9
            </div>
            <div className="div bg-custom-blue text-white text-center text-lg py-4 rounded-lg  md:col-span-3 md:row-span-6 col-span-4 row-span-5  ">
              <ExcerptLibrary />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
