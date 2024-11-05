import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

interface TopBarProps {
  onDrawerToggle: () => void;
}


const TopBar: React.FC<TopBarProps> = ({onDrawerToggle }) => (
  <AppBar position="fixed" sx={{ 
    zIndex: (theme) => ({
      xs: undefined, // No zIndex for extra-small and small sizes
      md: theme.zIndex.drawer + 1, // zIndex for medium and above
    }),
    }}>
    <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onDrawerToggle}
          sx={{ display: { md: 'none' } }}
        >
        <MenuIcon />
      </IconButton>
    </Toolbar>
  </AppBar>
);
export default TopBar;
