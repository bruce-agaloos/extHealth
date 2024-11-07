import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import {version} from "./../functions/dateEditedAndVersion"

interface TopBarProps {
  onDrawerToggle: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ onDrawerToggle }) => {
  // State to handle the selected tab
  const [selectedTab, setSelectedTab] = useState<number>(0);

  // Function to handle tab click
  const handleTabClick = (index: number) => {
    setSelectedTab(index);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: 'white', // Set the background color to white
        zIndex: (theme) => ({
          lg: theme.zIndex.drawer + 1,
        }),
        fontFamily: 'Lexend', // Set the font family to Lexend
        boxShadow: 'none', // Remove shadow
        borderBottom: '1px solid #00000080', // Add bottom border
      }}
    >
      <Toolbar>
        {/* Menu Icon on the Left */}
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onDrawerToggle}
          sx={{ display: { lg: 'none' }, mr: 1, color: 'black' }} // Set the color of the icon
        >
          <MenuIcon />
        </IconButton>

        {/* Logo with Version Number */}
        <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
          <Box
            component="img"
            src="icon.png" // Replace with your logo image path
            alt="Logo"
            sx={{ height: 40, width: 40, mr: 1 }}
          />
          <Typography variant="h6" component="div" sx={{ color: 'black', fontWeight: 500 }}>
            eXtHealth
          </Typography>
          <Box
            sx={{
              backgroundColor: '#0000000D', // Set the background color
              borderRadius: '12px', // Make it slightly circular
              padding: '4px 8px', // Add some padding
              marginLeft: '8px', // Space between logo and version number
            }}
          >
            <Typography variant="body2" sx={{ color: '#00000080', fontWeight: 600 }}> {/* Set text color */}
              {version}
            </Typography>
          </Box>
        </Box>

        {/* Spacer to push tabs to the right */}
        <Box sx={{ flexGrow: 1 }} />

        {/* Tabs Placeholder (on the Right) */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
          {['Tab 1', 'Tab 2', 'Tab 3'].map((tab, index) => (
            <Typography
              key={index}
              variant="button"
              sx={{
                mx: 2,
                color: selectedTab === index ? '#707FCB' : '#00000080', // Highlight selected tab
                cursor: 'pointer',
                fontWeight: 600, // Set font weight for the tabs
                '&:hover': {
                  color: '#707FCB', // Color when hovered
                },
              }}
              onClick={() => handleTabClick(index)}
            >
              {tab}
            </Typography>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
