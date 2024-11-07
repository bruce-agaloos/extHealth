// src/pages/Introduction.js
import React from 'react';
import { Typography, Box } from '@mui/material';

const Looks = () => (
  <Box>
    {/* Introduction Section */}
    <Box id="Looks">
      <Typography variant="h4" component="h1" gutterBottom>
        Looks of health tips
      </Typography>
      <Box mt={2} textAlign="center">
        <img 
          src="healthTipsLooks.gif" 
          alt="Looks of Health Tips" 
          width="400" 
          height="auto" 
        />
      </Box>
    </Box>

    {/* Pinning Extension Section */}
    <Box id="Turn" mt={4}>
      <Typography variant="h4" component="h1" gutterBottom>
        Turn On/Off Health tips
      </Typography>
      {/* GIF Placeholder */}
      <Box mt={2} textAlign="center">
        <img 
          src="healthTipsTurn.gif" 
          alt="Turning Health Tips On/Off" 
          width="400" 
          height="auto" 
        />
      </Box>
    </Box>
  </Box>
);

export default Looks;
