import React from 'react';
import { createRoot } from 'react-dom/client';
import { Tabs, Tab, Typography, Box } from '@mui/material';
import 'normalize.css';
import './css/default.css';
import TermsOfService from './components/ToS';
import PrivacyPolicy from './components/Privacy';
import License from './components/License';  // Importing the new License component
import TabPanel from './components/TabPanel';  // Importing the new TabPanel component

const TermsAndPrivacy = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div style={{ height: '95vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ textAlign: 'center', marginBottom: '10px', marginTop: '10px' }}>
        <Typography variant="h6" style={{ display: 'inline-block' }}>
          <img src="icon.png" alt="eXtHealth Logo" style={{ height: '30px', width: '30px', verticalAlign: 'middle', marginRight: '10px' }} />
          eXtHealth
        </Typography>
      </div>
      <Tabs value={value} onChange={handleChange} variant="fullWidth">
        <Tab label="Terms of Use" />
        <Tab label="Privacy Policy" />
        <Tab label="License"/>
      </Tabs>
      <Box className="tab-panel" flexGrow={1} p={3}>
        <TabPanel value={value} index={0}>
          <TermsOfService />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <PrivacyPolicy />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <License />
        </TabPanel>
      </Box>
    </div>
  );
};

// Render the component
const container = document.createElement("div");
document.body.appendChild(container);
const root = createRoot(container);
root.render(<TermsAndPrivacy />);
