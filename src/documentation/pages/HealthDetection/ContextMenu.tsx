// src/pages/Introduction.js
import React from 'react';
import { Typography, Box } from '@mui/material';

const ContextMenu = () => (
  <Box>
  {/* Introduction Section */}
  <Box id="plain">
    <Typography variant="h4" component="h1" gutterBottom>
      Plain Text
    </Typography>
    <Box mt={2} textAlign="center">
      <img 
        src="detectionPlainText.gif" 
        alt="Plain text detection" 
        width="400" 
        height="auto" 
      />
    </Box>
  </Box>

  {/* Pinning Extension Section */}
  <Box id="image" mt={4}>
    <Typography variant="h4" component="h1" gutterBottom>
      Image
    </Typography>
    {/* GIF Placeholder */}
    <Box mt={2} textAlign="center">
      <img 
        src="detectionImage.gif" 
        alt="Image detection" 
        width="400" 
        height="auto" 
      />
    </Box>
  </Box>
</Box>
);

export default ContextMenu;
