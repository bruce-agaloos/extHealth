// src/components/TabPanel.tsx
import React from 'react';
import { Fade } from '@mui/material';

interface TabPanelProps {
  children: React.ReactNode;
  value: number;
  index: number;
  other?: any;
}

const TabPanel: React.FC<TabPanelProps> = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      {...other}
    >
      {value === index && (
        <Fade in={value === index} timeout={1000} mountOnEnter unmountOnExit>
          <div>{children}</div>
        </Fade>
      )}
    </div>
  );
};

export default TabPanel;
