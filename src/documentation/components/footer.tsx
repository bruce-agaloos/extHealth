import React from 'react';
import { Box, Typography } from '@mui/material';
import { dateEdited } from './../functions/dateEditedAndVersion';
import {Link} from 'react-router-dom';

const Footer = () => {
  // Find the object with the 'documentation' field
  const documentationDate = dateEdited.find(item => item.documentation)?.documentation;

  return (
    <Box
      sx={{
        color: '#00000080',
        borderTop: '1px solid #00000080',
        textAlign: 'left',
        py: 3,
        px: 5,
        fontFamily: 'Lexend Deca, sans-serif',
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' }, // Column on small screens, row on larger screens
        justifyContent: { sm: 'space-between' },
        alignItems: 'flex-start', // Aligns items at the start of each flex direction
      }}
    >
      <Typography variant="body2" sx={{ fontWeight: 400 }}>
        <Link className='link-route' to="/license">Copyright</Link> © 2024: eXtHealth licensed under an MIT License
      </Typography>
      <Typography variant="body2" sx={{ fontWeight: 400, mt: { xs: 1, sm: 0 } }}>
        Last Updated: {documentationDate}
      </Typography>
    </Box>
  );
};

export default Footer;
