import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import InfoCardBar from './InfoCardBar.tsx/InfoCardBar';
import { AboutNavbar } from './Navabars/AboutNavbar';

const Loading = () => {
  return (
    <div>
      <AboutNavbar color={'custom-blue'} />
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
