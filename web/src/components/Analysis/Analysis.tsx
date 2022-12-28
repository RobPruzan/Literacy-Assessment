import React from 'react';
import { Description } from '../CreateComparison/Description';
import { ExcerptLibrary } from '../CreateComparison/ExcerptLibrary/ExcerptLibrary';
import { MainNavbar } from '../Navabars/MainNavbar';

export const Analysis = () => {
  return (
    <>
      <MainNavbar />
      <div className="angry-grid">
        <div id="item-0">
          <Description />
        </div>
        <div id="item-1">1</div>
        <div id="item-2">2</div>
        <div id="item-3">3</div>
        <div id="item-4">
          <div className="d-flex w-100 h-100">
            <ExcerptLibrary />
          </div>
        </div>
      </div>
    </>
  );
};
