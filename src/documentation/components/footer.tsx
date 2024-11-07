import React from 'react';
import { Box, Typography } from '@mui/material';
import { dateEdited } from './../functions/dateEditedAndVersion';

const Footer = () => {
  // Find the object with the 'documentation' field
  const documentationDate = dateEdited.find(item => item.documentation)?.documentation;

  return (
    <Box
      sx={{
        color: '#00000080',
        borderTop: '1px solid #00000080',
        textAlign: 'left', // Align the text to the left
        py: 3, // Add padding for vertical spacing
        px: 5, // Padding on the left and right for spacing
        fontFamily: 'Lexend Deca, sans-serif', // Set the font family
      }}
    >
      <Typography variant="body2" sx={{ fontWeight: 400 }}>
        Last Updated: {documentationDate}
      </Typography>
    </Box>
  );
};

export default Footer;
