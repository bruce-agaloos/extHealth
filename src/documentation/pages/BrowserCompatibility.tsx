// src/pages/Introduction.js
import React from 'react';
import { Box, Typography } from '@mui/material';

const BrowserCompatibility = () => (
  <Box>
    {/* Introduction Section */}
    <Box component="section" id="introduction">
      <Typography variant="h4" component="h1" gutterBottom>
        Browser Compatibility
      </Typography>
      <Typography paragraph>
        This extension has only been thoroughly tested on the following browsers:
      </Typography>
      <ul>
        <li>
          <Typography>
            Google Chrome: specifically version 114 and above
          </Typography>
        </li>
      </ul>
      <Typography paragraph>
        It may also work on other chromium-based browsers, but expect some errors.
      </Typography>
      <ul>
        <li>
          <Typography>
            Microsoft Edge
          </Typography>
        </li>
        <li>
            <Typography>
            Brave: version 1.54 and above
          </Typography>
        </li>
      </ul>
    </Box>
  </Box>
);

export default BrowserCompatibility;
