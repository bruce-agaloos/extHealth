// src/pages/Introduction.js
import React from 'react';
import { Typography, Box } from '@mui/material';

const AllHistory = () => (
  <Box>
    {/* Introduction Section */}
    <Box component="section" id="access">
      <Typography variant="h4" component="h1" gutterBottom>
        Accessing Fact Checking History
      </Typography>
      <Box mt={2} textAlign="center">
        <img 
          src="factHistory.gif" 
          alt="Fact Checking History" 
          width="400" 
          height="auto" 
        />
      </Box>
    </Box>

    {/* Pinning Extension Section */}
    <Box component="section" id="sample" mt={4}>
      <Typography variant="h4" component="h1" gutterBottom>
        Sample Use
      </Typography>
      {/* GIF Placeholder */}
      <Box mt={2} textAlign="center">
        <img 
          src="factSampleHistory.gif" 
          alt="Sample Fact Checking History" 
          width="400" 
          height="auto" 
        />
      </Box>
    </Box>
  </Box>
);

export default AllHistory;
