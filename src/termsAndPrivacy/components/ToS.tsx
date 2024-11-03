// src/TermsOfService.tsx
import React from 'react';
import { Typography, Container, Box } from '@mui/material';

const TermsOfService = () => {
  return (
    <Container maxWidth="md">
      <Box padding={3}>
        <Typography variant="h4" gutterBottom>
          Terms of Service
        </Typography>
        
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          Last Updated: November 3, 2024
        </Typography>

        <Box marginTop={3}>
          <Typography variant="h6" gutterBottom>
            1. Acceptance of Terms
          </Typography>
          <Typography paragraph>
            By installing, accessing, or using eXtHealth (“the Extension”), you agree to these Terms of Service (“Terms”). If you do not agree to these Terms, please do not use the Extension.
          </Typography>
        </Box>

        <Box marginTop={3}>
          <Typography variant="h6" gutterBottom>
          2. Usage and Restrictions
          </Typography>
          <Typography paragraph>
            When using the eXtHealth extension, you agree to do so solely for lawful purposes. You agree not to:
          </Typography>
          <ul>
            <li><Typography paragraph>Use the Extension in any manner that could damage, disable, overburden, or impair our service;</Typography></li>
            <li><Typography paragraph>Exploit or misuse any data or information obtained from the Extension for illegal or harmful purposes.</Typography></li>
          </ul>
          <Typography paragraph>
            The source code of this Extension is provided under the MIT License, allowing you to view, modify, and redistribute the code as per the license terms.
          </Typography>
        </Box>

        <Box marginTop={3}>
          <Typography variant="h6" gutterBottom>
            3. Privacy
          </Typography>
          <Typography paragraph>
            The Extension does not collect, store, or share personal information.
          </Typography>
        </Box>

        <Box marginTop={3}>
          <Typography variant="h6" gutterBottom>
            4. Intellectual Property
          </Typography>
          <Typography paragraph>
            The Extension, including but not limited to design, code, and content, is the property of CS82 and is protected by copyright, trademark, and other intellectual property laws.
          </Typography>
        </Box>

        <Box marginTop={3}>
          <Typography variant="h6" gutterBottom>
            5. Open-Source License
          </Typography>
          <Typography paragraph>
            This Extension is open-source software, licensed under the MIT License. You are free to use, modify, and distribute the code, provided you include the original license and copyright notice in any copies or substantial portions of the software.
          </Typography>
          <Typography paragraph>
            For more information, please refer to the LICENSE file included with this Extension.
          </Typography>
        </Box>

        <Box marginTop={3}>
          <Typography variant="h6" gutterBottom>
            6. Limitation of Liability
          </Typography>
          <Typography paragraph>
            CS82 shall not be liable for any damages or losses resulting from the use of or inability to use the Extension, including but not limited to errors, inaccuracies, or downtime.
          </Typography>
        </Box>

        <Box marginTop={3}>
          <Typography variant="h6" gutterBottom>
            7. Changes to Terms
          </Typography>
          <Typography paragraph>
            We reserve the right to update or modify these Terms at any time. Continued use of the Extension after any changes signifies your acceptance of the updated Terms.
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default TermsOfService;
