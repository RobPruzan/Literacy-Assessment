import { Tab, Tabs } from '@mui/material';
import { SyntheticEvent, useState } from 'react';
import {
  ComparisonActions,
  ComparisonTypeStrings,
} from '../../redux/reducers/comparisonState';

import { useDispatch } from 'react-redux';

type Props = {};

const ComparisonTypeToggle = (props: Props) => {
  const [activeTab, setActiveTab] = useState(ComparisonTypeStrings.Collection);
  const dispatch = useDispatch();
  function handleTabChange(
    event: SyntheticEvent<Element, Event>,
    newValue: any
  ) {
    setActiveTab(newValue);
    dispatch({
      type: ComparisonActions.SET_COMPARISON_TYPE,
      payload: { comparisonType: newValue },
    });
  }
  return (
    <div className="h-fit">
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        aria-label="tabs"
        variant="fullWidth"
      >
        <Tab
          value={ComparisonTypeStrings.Collection}
          label="Collection"
          aria-label="Collection"
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

      {activeTab === ComparisonTypeStrings.Collection && <>Collection</>}
      {activeTab === ComparisonTypeStrings.Excerpt && <>Excerpt</>}
    </div>
  );
};

export default ComparisonTypeToggle;
