// src/pages/Introduction.js
import React from 'react';
import { Box, Typography } from '@mui/material';

const Introduction = () => (
  <Box>
    {/* Introduction Section */}
    <Box id="introduction">
      <Typography variant="h4" component="h1" gutterBottom>
        Introduction
      </Typography>
      <Typography variant="body1" color="textSecondary">
        This is the introduction section. Here, you can give an overview of your content.
      </Typography>
    </Box>
  </Box>
);

export default Introduction;
