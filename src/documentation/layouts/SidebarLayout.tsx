// SidebarLayout.js
import React from 'react';
import { Box } from '@mui/material';
import Sidebar from './../components/Sidebar';
import RightSidebar from './../components/RightSidebar';
import MainContent from './../components/MainContent';
import { Outlet } from 'react-router-dom';
import sections from "./../functions/sections"

const paddingTop = 10;

const SidebarLayout = ({ mobileOpen, handleDrawerToggle }) => (
  <Box sx={{ display: 'flex', pt: paddingTop }}>
    <Sidebar mobileOpen={mobileOpen} onDrawerToggle={handleDrawerToggle} sections={sections}/>
    <MainContent>
      <Outlet /> {/* Renders child routes here */}
    </MainContent>
    <RightSidebar />
  </Box>
);

export default SidebarLayout;
