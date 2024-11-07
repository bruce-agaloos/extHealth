// src/PrivacyPolicy.tsx
import React from "react";
import { Typography, Container, Box } from "@mui/material";

const AboutUs = () => {
  return (
    <Container maxWidth="md">
      <Box padding={3}>
        <Typography variant="h4" gutterBottom>
          About Us
        </Typography>
        <Typography paragraph>
          Welcome to <strong>exthealth</strong>! We are a dedicated team focused
          on providing reliable health-related information and tools to support
          individuals and communities in making informed health decisions. Our
          goal is to make health information accessible, clear, and useful for
          everyone.
        </Typography>
        <Typography paragraph>
          At exthealth, we are committed to delivering accurate and up-to-date
          content that empowers our users to navigate health topics with
          confidence. Whether you're looking to understand medical information,
          find resources, or learn more about wellness, we're here to support
          you.
        </Typography>
        <Typography paragraph>
          For any inquiries, feel free to reach out to us at{" "}
          <strong>2021314140@dhvsu.edu.ph.</strong>
          We value your feedback and look forward to helping you on your health
          journey.
        </Typography>
      </Box>
    </Container>
  );
};

export default AboutUs;
