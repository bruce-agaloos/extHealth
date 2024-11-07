// src/pages/Introduction.js
import React from 'react';
import { Typography, Box } from '@mui/material';

const HowToUse = () => (
  <Box>
    {/* Introduction Section */}
    <Box component="section" id="default">
      <Typography variant="h4" component="h1" gutterBottom>
        Default Use
      </Typography>
    </Box>

    {/* Pinning Extension Section */}
    <Box component="section" id="submit" mt={4}>
      <Typography variant="h4" component="h1" gutterBottom>
        Submit a text
      </Typography>
      {/* GIF Placeholder */}
      <Box mt={2} textAlign="center">
        <img 
          src="factSubmit.gif" 
          alt="Submit a text" 
          width="400" 
          height="auto" 
        />
      </Box>
    </Box>
    <Box component="section" id="correct" mt={4}>
      <Typography variant="h4" component="h1" gutterBottom>
        Correct a text
      </Typography>
      {/* GIF Placeholder */}
      <Box mt={2} textAlign="center">
        <img 
          src="factCorrect.gif" 
          alt="Correct a text" 
          width="400" 
          height="auto" 
        />
      </Box>
    </Box>
  </Box>
);

export default HowToUse;
