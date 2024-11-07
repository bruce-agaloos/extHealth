// src/pages/Introduction.js
import React from 'react';
import { Typography, Box } from '@mui/material';

const History = () => (
  <Box>
    {/* Introduction Section */}
    <Box id="access">
      <Typography variant="h4" component="h1" gutterBottom>
        Accessing Health Tips History
      </Typography>
      <Box mt={2} textAlign="center">
        <img 
          src="healthTipsHistory.gif" 
          alt="Health Tips History" 
          width="400" 
          height="auto" 
        />
      </Box>
    </Box>
  </Box>
);

export default History;
