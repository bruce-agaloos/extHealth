// src/TermsOfService.tsx
import React from "react";
import { Typography, Container, Box } from "@mui/material";

const TermsOfService = () => {
  const getPrivacyLink = () => {
    return chrome.runtime.getURL("documentation.html") + "#/privacy-policy";
  };
  return (
    <Container maxWidth="md">
      <Box padding={3}>
        <Typography variant="h4" gutterBottom>
          TERMS OF SERVICE
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          Last Updated: November 19, 2024
        </Typography>
        <Box marginTop={3}>
          <Typography variant="h6" gutterBottom>
            AGREEMENT TO TERMS
          </Typography>
          <Typography paragraph>
            Welcome to eXtHealth, a browser extension developed by the students
            of Don Honorio Ventura State University (DHVSU). eXtHealth is
            designed to deliver health reminders and fact-checking features to
            support health-related posts and claims by providing health
            information from trusted sources. By using eXtHealth, you confirm
            that you have read, understood, and agree to be bound by these Terms
            of Service. If you do not agree to these terms, you must uninstall
            the extension immediately.
          </Typography>
        </Box>
        <Box marginTop={3}>
          <Typography variant="h6" gutterBottom>
            Privacy
          </Typography>
          <Typography paragraph>
            For information on how we handle your data, please refer to our{" "}
            <a
              style={{ textDecoration: "underline" }}
              href={getPrivacyLink()}
              target="_blank"
              rel="noreferrer noopener"
            >
              Privacy Policy
            </a>
          </Typography>
        </Box>
        <Box marginTop={3}>
          <Typography variant="h6" gutterBottom>
            Intellectual Property Rights
          </Typography>
          <Typography component="div" paragraph>
            eXtHealth and all its content, including but not limited to source
            code, design, trademarks, and materials, are the proprietary
            property of the creators and are protected by intellectual property
            laws. You are granted a limited, non-commercial license to use the
            extension for personal use only. Unauthorized reproduction,
            distribution, or commercial use of the content is prohibited. All
            rights not explicitly granted in these terms are reserved by us.
          </Typography>
        </Box>
        <Box marginTop={3}>
          <Typography variant="h6" gutterBottom>
            User Responsibilities
          </Typography>
          <Typography component="div" paragraph>
            You agree to use the extension in a lawful manner, in accordance
            with all applicable laws and regulations, and to respect the rights
            of others. You will not engage in any activity that could disrupt or
            interfere with the proper functioning of the extension, including
            tampering with its features.
          </Typography>
        </Box>
        <Box marginTop={3}>
          <Typography variant="h6" gutterBottom>
            Disclaimer of Warranties and Limitation of Liability
          </Typography>
          <Typography paragraph>
            eXtHealth is provided "AS IS" without any warranties or guarantees
            of any kind. The health information offered by eXtHealth is based on
            available data. While we make every effort to ensure the accuracy
            and reliability of the information provided, we do not guarantee
            that the extension will be accurate in every case. By using the
            extension, you agree that we are not responsible for any issues,
            inaccuracies, or consequences, including data loss or problems with
            health-related claims.
          </Typography>
        </Box>
        <Box marginTop={3}>
          <Typography variant="h6" gutterBottom>
            Updates and Modifications
          </Typography>
          <Typography paragraph>
            We reserve the right to update or modify these Terms of Service or
            to make changes to the eXtHealth extension at any time. Any updates
            or modifications will become effective immediately upon posting. By
            continuing to use eXtHealth after such changes, you acknowledge and
            accept the updated Terms of Service or modifications to the
            extension.
          </Typography>
        </Box>
        <Box marginTop={3}>
          <Typography variant="h6" gutterBottom>
            Governing Law
          </Typography>
          <Typography paragraph>
            These Terms of Service are governed by the laws of the Philippines.
            Any disputes arising from these terms shall be resolved in the
            courts of the Philippines.
          </Typography>
        </Box>

        <Box marginTop={3}>
          <Typography variant="h6" gutterBottom>
            Contact Information
          </Typography>
          <Typography paragraph>
            For any questions, concerns, or feedback regarding the eXtHealth
            extension, please feel free to reach out to us using the following
            contact details:
          </Typography>
          <Typography paragraph fontWeight="bold">
            eXtHealth
            <br />
            Don Honorio Ventura State University (DHVSU)
            <br />
            Bacolor, Pampanga, Philippines
            <br />
            Email: 2021314140@dhvsu.edu.ph
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default TermsOfService;
