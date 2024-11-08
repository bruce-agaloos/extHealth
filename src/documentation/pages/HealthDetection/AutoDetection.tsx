// src/pages/Introduction.js
import React from "react";
import { Typography, Box } from "@mui/material";

const AutoDetection = () => (
  <Box>
    {/* Introduction Section */}
    <Box component="section" id="turn">
      <Typography variant="h4" component="h1" gutterBottom>
        Turn On/Off Auto Detection
      </Typography>
      <Typography paragraph>
        Easily manage the auto-detection feature by turning it on or off with a
        simple toggle. This flexibility allows you to activate auto-detection
        only when you need it, optimizing your experience. The animation below
        demonstrates how to enable or disable auto-detection.
      </Typography>
      <ol>
        <li>
          <Typography>
            Click our extension.
          </Typography>
        </li>
        <li>
          <Typography>
            Toggle On/Off the X auto detect toggle.
          </Typography>
        </li>
      </ol>
      <Box mt={2} textAlign="center">
        <img
          src="detectionTurn.gif"
          alt="Turning Auto-detection On/Off"
          width="400"
          height="auto"
        />
      </Box>
    </Box>

    {/* Pinning Extension Section */}
    <Box component="section" id="supported" mt={4}>
      <Typography variant="h4" component="h1" gutterBottom>
        Supported Auto Detection Website
      </Typography>
      <Typography paragraph>
        Auto-detection works on specific supported websites to seamlessly
        integrate with your browsing, through fact-checking. Currently, we support
        only support Twitter.
      </Typography>
      <Box mt={2} textAlign="center">
        <img
          src="detectionTwitter.gif"
          alt="Twitter Auto Detection"
          width="400"
          height="auto"
        />
      </Box>
    </Box>
  </Box>
);

export default AutoDetection;
