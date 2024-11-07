// src/pages/Introduction.js
import React from 'react';
import { Typography, Box } from '@mui/material';
import SearchableTable from "./tableKeywords"

const KeywordsSupported = () => (
  <Box>
    {/* Introduction Section */}
    <Box component="section" id="keywords">
      <Typography variant="h4" component="h1" gutterBottom>
        Keywords Supported
      </Typography>
      <SearchableTable />
    </Box>
    {/* Pinning Extension Section */}
    <Box component="section" id="language" mt={4}>
      <Typography variant="h4" component="h1" gutterBottom>
        Language Supported
      </Typography>
    </Box>
</Box>
);

export default KeywordsSupported;
