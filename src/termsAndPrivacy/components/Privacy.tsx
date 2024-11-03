// src/PrivacyPolicy.tsx
import React from 'react';
import { Typography, Container, Box } from '@mui/material';

const PrivacyPolicy = () => {
  return (
    <Container maxWidth="md">
      <Box padding={3}>
        <Typography variant="h4" gutterBottom>
          Privacy Policy
        </Typography>
        
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          Last Updated: November 3, 2024
        </Typography>

        <Box marginTop={3}>
          <Typography variant="h6" gutterBottom>
            1. Information We Collect
          </Typography>
          <Typography paragraph>
            eXtHealth is designed with your privacy in mind. While we do not collect personally identifiable information (PII), the Extension interacts with certain types of data to provide its features:
          </Typography>
          <ul>
            <li>
              <Typography paragraph>
                <strong>Twitter Feed Access:</strong> If enabled, the Extension reads your Twitter feed for fact-checking purposes. This data is sent to our servers for processing but is not stored permanently.
              </Typography>
            </li>
            <li>
              <Typography paragraph>
                <strong>Context Menu Data:</strong> When you use the Extension’s context menu features, text or image text passed through the context menu is sent to our servers for processing. This data is also not stored permanently.
              </Typography>
            </li>
            <li>
              <Typography paragraph>
                <strong>Submitted Data:</strong> If you submit data (such as text or images) for fact-checking, this data is saved anonymously in our database for future improvements. This helps enhance the Extension’s accuracy and provide more relevant future results.
              </Typography>
            </li>
          </ul>
        </Box>

        <Box marginTop={3}>
          <Typography variant="h6" gutterBottom>
            2. Notifications
          </Typography>
          <Typography paragraph>
            The Extension may send you notifications from time to time to provide updates, fact-checking results, or other relevant information. These notifications are part of the Extension’s core functionality and are not used to track or collect personal information.
          </Typography>
        </Box>

        <Box marginTop={3}>
          <Typography variant="h6" gutterBottom>
            3. Data Security
          </Typography>
          <Typography paragraph>
            We prioritize security and have implemented measures to ensure that the data you submit is protected. While no system is completely secure, we strive to use industry-standard practices to safeguard any stored information.
          </Typography>
        </Box>

        <Box marginTop={3}>
          <Typography variant="h6" gutterBottom>
            4. No Third-Party Analytics or Tracking
          </Typography>
          <Typography paragraph>
            eXtHealth does not use any third-party analytics, cookies, tracking scripts, or similar technologies to track your browsing activity or personal information.
          </Typography>
        </Box>

        <Box marginTop={3}>
          <Typography variant="h6" gutterBottom>
            5. Changes to This Privacy Policy
          </Typography>
          <Typography paragraph>
            We may update this Privacy Policy from time to time to reflect any changes in our practices. Any updates will be posted within the Extension. By continuing to use the Extension after changes are made, you acknowledge and accept the updated Privacy Policy.
          </Typography>
        </Box>

        <Box marginTop={3}>
          <Typography variant="h6" gutterBottom>
            6. Contact Us
          </Typography>
          <Typography paragraph>
            If you have any questions or concerns about this Privacy Policy or the Extension, please feel free to contact us at 2021314140@dhvsu.edu.ph.
          </Typography>
        </Box>

        <Typography variant="body1" paragraph>
          **By using eXtHealth, you agree to this Privacy Policy.**
        </Typography>
      </Box>
    </Container>
  );
};

export default PrivacyPolicy;
