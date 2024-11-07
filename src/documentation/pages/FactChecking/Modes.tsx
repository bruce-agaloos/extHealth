// src/pages/Introduction.js
import React from 'react';
import { Typography, Box } from '@mui/material';

const Modes = () => (
  <Box>
    {/* Introduction Section */}
    <Box component="section" id="modes">
      <Typography variant="h4" component="h1" gutterBottom>
        Changing Modes
      </Typography>
      <Box mt={2} textAlign="center">
        <img 
          src="factChangingModes.gif" 
          alt="Google Mode" 
          width="400" 
          height="auto" 
        />
      </Box>
    </Box>
  </Box>
);

export default Modes;
