// src/TermsOfService.tsx
import React from "react";
import { Typography, Container, Box } from "@mui/material";
import TosContent from "./TosContent";

const TermsOfService = () => {
 
  return (
    <Container maxWidth="md">
      <Box padding={3}>
        <Typography variant="h4" gutterBottom>
          TERMS OF SERVICE
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          Last Updated: November 19, 2024
        </Typography>
        <TosContent />
      </Box>
    </Container>
  );
};

export default TermsOfService;
