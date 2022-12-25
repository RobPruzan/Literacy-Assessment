import React from 'react';
import { AboutNavbar } from '../Navabars/AboutNavbar';
// import image named background.png from public directory of react project

export const About = () => {
  return (
    <>
      <div className="about">
        <AboutNavbar />
        {/* <img src={'/background.png'} alt="background" /> */}
        Hello!
      </div>
    </>
    // <div style={{
    //   backgroundImage: `url(${background})`,
    //   backgroundSize: 'cover',
    //   backgroundRepeat: 'no-repeat',
    //   backgroundPosition: 'center'
    // }}>
  );
};
