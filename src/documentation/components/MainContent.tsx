// src/components/MainContent.js
import React, { ReactNode }  from 'react';
import { Box, Typography, IconButton, Toolbar } from '@mui/material';
import NavigatePage from './NavigatePage';

const drawerWidth = 240;

interface MainContentProps {
  children: ReactNode;
  onDrawerToggle: () => void;
}

const MainContent: React.FC<MainContentProps> = ({ children, onDrawerToggle }) => (
  <Box
    component="main"
    sx={{
      flexGrow: 1,
      width: { sm: `calc(100% - ${drawerWidth}px)` },
    }}
  >
    {children}
    <NavigatePage />
  </Box>
);

export default MainContent;
