import React from 'react';
import { AboutNavbar } from '../Navabars/AboutNavbar';
// import image named background.png from public directory of react project

export const About = () => {
  return (
    // <div className="h-screen">
    //   <div className="">

    //   </div>

    // <div className="h-full div bo-blue-200 p-10 grid grid-cols-4 grid-rows 8 gap-2 ">
    //   <div className="div bg-custom-blue text-white text-center text-5xl py-4 rounded-lg col-span-4">
    //     1
    //   </div>

    //   <div className="div bg-custom-blue text-white text-center text-5xl py-4 rounded-lg col-span-4">
    //     5
    //   </div>

    //   <div className=" bg-custom-blue text-white text-center text-5xl py-4 rounded-lg md:row-span-3 md:col-span-1  col-span-4 row-span-1">
    //     9
    //   </div>
    //   <div className="div bg-custom-blue text-white text-center text-5xl py-4 rounded-lg  md:col-span-3 md:row-span-3 col-span-4 row-span-4  ">
    //     10
    //   </div>
    // </div>
    // </div>
    <div className="flex flex-col h-screen">
      <AboutNavbar color="custom-blue" />
      <div className=" flex justify-center items-center flex-grow">
        <div className="h-full div bo-blue-200 p-1 grid grid-cols-4 grid-rows-9 gap-2 w-screen">
          <div className="div bg-custom-blue text-white text-center text-5xl py-4 rounded-lg col-span-4">
            1
          </div>

          <div className="div bg-custom-blue text-white text-center text-5xl py-4 rounded-lg col-span-4 sm:row-span-1">
            5
          </div>

          <div className=" bg-custom-blue text-white text-center text-5xl py-4 rounded-lg md:row-span-4 md:col-span-1  col-span-4 row-span-1">
            9
          </div>
          <div className="div bg-custom-blue text-white text-center text-5xl py-4 rounded-lg  md:col-span-3 md:row-span-4 col-span-4 row-span-5  ">
            10
          </div>
        </div>
      </div>
    </div>
  );
};
