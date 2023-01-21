import {
  ComparisonActions,
  ComparisonTypeStrings,
} from '../../redux/reducers/comparisonState';
import React, { useState } from 'react';
import { Tab, Tabs } from '@mui/material';

import { useDispatch } from 'react-redux';

type Props = {};

const ComparisonTypeToggle = (props: Props) => {
  const [activeTab, setActiveTab] = useState(ComparisonTypeStrings.Collection);
  const dispatch = useDispatch();
  return (
    <div className="w-full h-full">
      <Tabs
        value={activeTab}
        onChange={(event, newValue) => {
          setActiveTab(newValue);
          dispatch({
            type: ComparisonActions.SET_COMPARISON_TYPE,
            payload: { comparisonType: newValue },
          });
        }}
        aria-label="tabs"
        variant="fullWidth"
      >
        <Tab
          value={ComparisonTypeStrings.Collection}
          label="Collection"
          aria-label="Ccllection"
          sx={{
            color:
              activeTab === ComparisonTypeStrings.Collection ? 'white' : 'gray',
            backgroundColor:
              activeTab === ComparisonTypeStrings.Collection
                ? // '#F4774F'
                  'rgb(244, 119, 79, .3)'
                : 'white',
          }}
        />

        <Tab
          sx={{
            color:
              activeTab === ComparisonTypeStrings.Excerpt ? 'white' : 'gray',
            backgroundColor:
              activeTab === ComparisonTypeStrings.Excerpt
                ? 'rgb(244, 119, 79, .3)'
                : 'white',
          }}
          value={ComparisonTypeStrings.Excerpt}
          // label of tab is named file extension
          label={'Excerpt'}
          aria-label="excerpt"
        />
      </Tabs>

      {activeTab === ComparisonTypeStrings.Collection && <>collection</>}
      {activeTab === ComparisonTypeStrings.Excerpt && <>excer-t</>}
    </div>
  );
};

export default ComparisonTypeToggle;
