import React from 'react';
import { Tab, Tabs } from '@mui/material';
import Snack from './Snack';
import Lunch from './Lunch';
import TabPanel from 'components/common/TabPanel';

const Home = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="Snacks" />
        <Tab label="Lunch" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Snack />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Lunch />
      </TabPanel>
    </>
  );
};

export default Home;
