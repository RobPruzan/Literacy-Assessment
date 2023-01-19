import React, { useState } from 'react';
import { Tab, Tabs } from '@mui/material';

export enum TabType {
  Collection,
  Excerpt,
}

type Props = {};

const ComparisonTypeToggle = (props: Props) => {
  const [activeTab, setActiveTab] = useState(TabType.Collection);
  return (
    <div className="w-full h-full">
      <Tabs
        value={activeTab}
        onChange={(event, newValue) => setActiveTab(newValue)}
        aria-label="tabs"
        variant="fullWidth"
      >
        <Tab
          value={TabType.Collection}
          label="Collection"
          aria-label="Ccllection"
          sx={{
            color: activeTab === TabType.Collection ? 'white' : 'gray',
            backgroundColor:
              activeTab === TabType.Collection
                ? // '#F4774F'
                  'rgb(244, 119, 79, .3)'
                : 'white',
          }}
        />

        <Tab
          sx={{
            color: activeTab === TabType.Excerpt ? 'white' : 'gray',
            backgroundColor:
              activeTab === TabType.Excerpt ? 'rgb(244, 119, 79, .3)' : 'white',
          }}
          value={TabType.Excerpt}
          // label of tab is named file extension
          label={'Excerpt'}
          aria-label="excerpt"
        />
      </Tabs>

      {activeTab === TabType.Collection && <>collection</>}
      {activeTab === TabType.Excerpt && <>excer-t</>}
    </div>
  );
};

export default ComparisonTypeToggle;
