import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { version } from "./../functions/dateEditedAndVersion";
import { Link, useLocation } from 'react-router-dom';

interface TopBarProps {
  onDrawerToggle: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ onDrawerToggle }) => {
  const location = useLocation();
  const [selectedTab, setSelectedTab] = useState(location.pathname);

  const tabs = [
    { name: 'Documentation', path: '/documentation' },
    { name: 'TOS', path: '/tos' },
    { name: 'Privacy Policy', path: '/privacy-policy' },
  ];

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: 'white',
        zIndex: (theme) => theme.zIndex.drawer + 1,
        fontFamily: 'Lexend',
        boxShadow: 'none',
        borderBottom: '1px solid #00000080',
      }}
    >
      <Toolbar>
        {/* Menu Icon on the Left */}
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onDrawerToggle}
          sx={{ display: { lg: 'none' }, mr: 1, color: 'black' }}
        >
          <MenuIcon />
        </IconButton>

        {/* Logo with Version Number */}
        <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
          <Box
            component="img"
            src="iconGreen.png"
            alt="Logo"
            sx={{ height: 45, width: 30, mr: 1 }}
          />
          <Typography variant="h6" component="div" sx={{ color: 'black', fontWeight: 500 }}>
            eXtHealth
          </Typography>
          <Box
            sx={{
              backgroundColor: '#0000000D',
              borderRadius: '12px',
              padding: '4px 8px',
              marginLeft: '8px',
            }}
          >
            <Typography variant="body2" sx={{ color: '#00000080', fontWeight: 600 }}>
              {version}
            </Typography>
          </Box>
        </Box>

        {/* Spacer to push tabs to the right */}
        <Box sx={{ flexGrow: 1 }} />

        {/* Tabs (Links) */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
          {tabs.map((tab, index) => (
            <Typography
              key={index}
              component={Link}
              to={tab.path}
              variant="button"
              sx={{
                mx: 2,
                color: selectedTab === tab.path ? '#707FCB' : '#00000080',
                cursor: 'pointer',
                fontWeight: 600,
                textDecoration: 'none',
                '&:hover': {
                  color: '#707FCB',
                },
              }}
              onClick={() => setSelectedTab(tab.path)}
            >
              {tab.name}
            </Typography>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
