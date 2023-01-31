import { AboutNavbar } from '../Navabars/AboutNavbar';
// import image named background.png from public directory of react project

export const About = () => {
  return (
    // <div className="h-screen">
    //   <div className="">

    //   </div>

    // <div className="h-full div bo-blue-200 p-10 grid grid-cols-4 grid-rows 8 gap-2 ">
    //   <div className="div bg-custom-blood-red text-white text-center text-5xl py-4 rounded-lg col-span-4">
    //     1
    //   </div>

    //   <div className="div bg-custom-blood-red text-white text-center text-5xl py-4 rounded-lg col-span-4">
    //     5
    //   </div>

    //   <div className=" bg-custom-blood-red text-white text-center text-5xl py-4 rounded-lg md:row-span-3 md:col-span-1  col-span-4 row-span-1">
    //     9
    //   </div>
    //   <div className="div bg-custom-blood-red text-white text-center text-5xl py-4 rounded-lg  md:col-span-3 md:row-span-3 col-span-4 row-span-4  ">
    //     10
    //   </div>
    // </div>
    // </div>
    <div className="flex h-screen flex-col">
      <AboutNavbar color="custom-blood-red" />
      <div className=" flex flex-grow items-center justify-center">
        <div className="div bo-blue-200 grid-rows-9 grid h-full w-screen grid-cols-4 gap-2 p-1">
          <div className="div col-span-4 rounded-lg bg-custom-blood-red py-4 text-center text-5xl text-white">
            1
          </div>

          <div className="div col-span-4 rounded-lg bg-custom-blood-red py-4 text-center text-5xl text-white sm:row-span-1">
            5
          </div>

          <div className=" col-span-4 row-span-1 rounded-lg bg-custom-blood-red py-4 text-center text-5xl text-white  md:col-span-1 md:row-span-4">
            9
          </div>
          <div className="div col-span-4 row-span-5 rounded-lg bg-custom-blood-red py-4 text-center  text-5xl text-white md:col-span-3 md:row-span-4  ">
            10
          </div>
        </div>
      </div>
    </div>
  );
};
