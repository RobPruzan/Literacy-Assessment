import React from 'react';
import { Description } from '../CreateComparison/Description';
import { MainNavbar } from '../Navabars/MainNavbar';

export const Analysis = () => {
  return (
    <>
      <MainNavbar />
      <div className="angry-grid">
        <div id="item-0">
          <Description />
        </div>
        <div id="item-1">&nbsp;</div>
        <div id="item-2">&nbsp;</div>
        <div id="item-3">&nbsp;</div>
        <div id="item-4">&nbsp;</div>
      </div>
    </>
  );
};
