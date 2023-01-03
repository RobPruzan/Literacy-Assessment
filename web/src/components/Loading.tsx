import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import InfoCardBar from './InfoCardBar.tsx/InfoCardBar';
import { AboutNavbar } from './Navabars/AboutNavbar';

const Loading = () => {
  return (
    <div className="flex flex-col  h-screen">
      <AboutNavbar color="custom-blue" />
      <InfoCardBar />
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
