import React from 'react';
import CompareActions from './CompareActions/CompareActions';
import { Description } from './Description';
import { ExcerptLibrary } from './ExcerptLibrary/ExcerptLibrary';
import InfoCardBar from './InfoCardBar/InfoCardBar';

import { MainNavbar } from '../Navabars/MainNavbar';

export const CreateComparison = () => {
  return (
    <>
      <MainNavbar />
      <div className="angry-grid">
        <div id="item-0">
          <Description />
        </div>
        <div
          id="item-1"
          style={
            {
              // overflowX: 'auto',
              // overflowY: 'auto',
            }
          }
        >
          <InfoCardBar />
        </div>
        <div id="item-2">
          <CompareActions />
        </div>
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
