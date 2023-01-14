import { AboutNavbar } from './Navabars/AboutNavbar';
import InfoCardBar from './InfoCardBar.tsx/InfoCardBar';
import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

const Loading = () => {
  return (
    <div>
      <AboutNavbar color={'custom-blood-red'} />
      <div className="mt-1 border-2  border-y-slate-500 p-2">
        <InfoCardBar />
      </div>
      <div className="justify-center items-center h-screen">
        <Spinner className="m-3" animation="grow" />
        <Spinner className="m-3" animation="grow" />
        <Spinner className="m-3" animation="grow" />
        <Spinner className="m-3" animation="grow" />
      </div>
    </div>
  );
};

export default Loading;
