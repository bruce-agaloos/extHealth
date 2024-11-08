// MainLayout.js
import React from 'react';
import { Box } from '@mui/material';
import MainContent from './../components/MainContent';
import { Outlet } from 'react-router-dom';

const MainLayout = () => (
  <Box sx={{ display: 'flex', pt: 8 }}>
    <MainContent includePageNavigation={false}>
      <Outlet /> {/* Renders child routes here */}
    </MainContent>
  </Box>
);

export default MainLayout;
