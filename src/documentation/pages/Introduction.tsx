// src/pages/Introduction.js
import React from 'react';
import { Box, Typography } from '@mui/material';

const Introduction = () => (
  <Box>
    {/* Introduction Section */}
    <Box id="introduction">
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome
      </Typography>
      <Typography variant="body1" color="textSecondary" paragraph>
        This browser extension is designed to help you navigate and verify health-related information with ease. Whether you’re browsing articles, reading PDFs, or reviewing health content online, this extension helps ensure the information you encounter is accurate and trustworthy.
      </Typography>
      <Typography variant="body1" color="textSecondary" paragraph>
        Key Features:
      </Typography>
      <ul>
        <li>
          <Typography variant="body1" color="textSecondary">
            <strong>Health Tips:</strong> Get reliable health tips and advice based on evidence-based sources to stay informed and healthy.
          </Typography>
        </li>
        <li>
          <Typography variant="body1" color="textSecondary">
            <strong>Detection of Health-Related Texts:</strong> The extension can detect health-related content so that it can be further reviewed.
          </Typography>
        </li>
        <li>
          <Typography variant="body1" color="textSecondary">
            <strong>Fact-Checking Health Texts:</strong> Verify health claims directly within your browser. The extension provides fact-checking by comparing content with trusted sources to ensure its accuracy.
          </Typography>
        </li>
      </ul>
      <Typography variant="body1" color="textSecondary" paragraph>
        Whether you are browsing health news, reading research papers, or exploring medical advice, this extension helps you stay informed and verify the reliability of the content you consume.
      </Typography>
    </Box>

    {/* Pinning Extension Section */}
    <Box id="pin" mt={4}>
      <Typography variant="h5" component="h2" gutterBottom>
        Pinning the Extension
      </Typography>
      <Typography variant="body1" color="textSecondary" paragraph>
        To easily access the health fact-checking tools, you can pin the extension to your browser toolbar. Pinning the extension allows you to quickly open it at any time without having to navigate through menus or the extensions page.
      </Typography>
      <Typography variant="body1" color="textSecondary" paragraph>
        To pin the extension:
      </Typography>
      <ol>
        <li>
          <Typography variant="body1" color="textSecondary">
            Click the puzzle piece icon in your browser's toolbar.
          </Typography>
        </li>
        <li>
          <Typography variant="body1" color="textSecondary">
            Find the Health Fact-Checking Extension in the list and click the pin icon next to it.
          </Typography>
        </li>
        <li>
          <Typography variant="body1" color="textSecondary">
            The extension icon will now appear in your browser's toolbar for easy access.
          </Typography>
        </li>
      </ol>
      {/* GIF Placeholder */}
      <Box mt={2} textAlign="center">
        <img 
          src="pinningTheExtension.gif" 
          alt="Pinning the extension" 
          width="400" 
          height="auto" 
        />
      </Box>
      <Typography variant="body1" color="textSecondary" paragraph>
        With the extension pinned, you can effortlessly open it whenever you want to check the reliability of health information in your browser.
      </Typography>
      
      
    </Box>
  </Box>
);

export default Introduction;
