// src/pages/Introduction.js
import React from 'react';
import { Typography, Box } from '@mui/material';

const AutoDetection = () => (
  <Box>
    {/* Introduction Section */}
    <Box component="section" id="turn">
      <Typography variant="h4" component="h1" gutterBottom>
        Turn On/Off Auto Detection
      </Typography>
      <Box mt={2} textAlign="center">
        <img 
          src="detectionTurn.gif" 
          alt="Turning Auto-detection On/Off" 
          width="400" 
          height="auto" 
        />
      </Box>
    </Box>

    {/* Pinning Extension Section */}
    <Box component="section" id="supported" mt={4}>
      <Typography variant="h4" component="h1" gutterBottom>
        Supported Auto Detection Website
      </Typography>
      {/* GIF Placeholder */}
      <Box mt={2} textAlign="center">
        <img 
          src="detectionTwitter.gif" 
          alt="Twitter Auto Detection" 
          width="400" 
          height="auto" 
        />
      </Box>
    </Box>
  </Box>
);

export default AutoDetection;
