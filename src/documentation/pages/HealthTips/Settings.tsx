// src/pages/Introduction.js
import React from 'react';
import { Typography, Box } from '@mui/material';

const Settings = () => (
  <Box>
    {/* Introduction Section */}
    <Box id="timer">
      <Typography variant="h4" component="h1" gutterBottom>
        Set Timer for Health Tips
      </Typography>
      <Box mt={2} textAlign="center">
        <img 
          src="healthTipsTimer.gif" 
          alt="Timer for Health Tips" 
          width="400" 
          height="auto" 
        />
      </Box>
    </Box>

    {/* Pinning Extension Section */}
    <Box id="topics" mt={4}>
      <Typography variant="h4" component="h1" gutterBottom>
        Choose Topics
      </Typography>
      {/* GIF Placeholder */}
      <Box mt={2} textAlign="center">
        <img 
          src="healthTipsTopic.gif" 
          alt="Topics for Health Tips" 
          width="400" 
          height="auto" 
        />
      </Box>
    </Box>
  </Box>
);

export default Settings;
