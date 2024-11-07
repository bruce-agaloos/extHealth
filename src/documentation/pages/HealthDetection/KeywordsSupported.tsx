// src/pages/Introduction.js
import React from 'react';
import { Typography, Box } from '@mui/material';

const KeywordsSupported = () => (
  <Box>
    {/* Introduction Section */}
    <Box id="keywords">
      <Typography variant="h4" component="h1" gutterBottom>
        Keywords Supported
      </Typography>
    </Box>

    {/* Pinning Extension Section */}
    <Box id="language" mt={4}>
      <Typography variant="h4" component="h1" gutterBottom>
        Language Supported
      </Typography>
    </Box>
</Box>
);

export default KeywordsSupported;
