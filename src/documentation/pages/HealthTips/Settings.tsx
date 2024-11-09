// src/pages/Introduction.js
import React from "react";
import { Typography, Box } from "@mui/material";

const Settings = () => (
  <Box>
    {/* Introduction Section */}
    <Box component="section" id="timer">
      <Typography variant="h4" component="h1" gutterBottom>
        Set Timer for Health Tips
      </Typography>
      <Typography paragraph>
        Customize how often you see new health tips by setting a timer. This
        feature allows you to control the frequency of tips based on your
        preference, so you can get updates when they’re most convenient. See the
        animation below for how to adjust the timer settings.
      </Typography>
      <Typography component="div">
        <ol>
          <li>
            <Typography>Click our extension.</Typography>
          </li>
          <li>
            <Typography>
              Click the settings icon at the top-right of the extension
            </Typography>
          </li>
          <li>
            <Typography>
              Adjust the timer settings to your preferred interval.
            </Typography>
          </li>
        </ol>
      </Typography>
      <Box mt={2} textAlign="center">
        <img
          src="healthTipsTimer.gif"
          alt="Timer for Health Tips"
          width="400"
          height="auto"
        />
      </Box>
    </Box>

    {/* Pinning Extension Section */}
    <Box component="section" id="topics" mt={4}>
      <Typography variant="h4" component="h1" gutterBottom>
        Choose Topics
      </Typography>
      <Typography paragraph>
        Focus on the health topics that matter most to you by selecting specific
        categories. This feature enables you to personalize your experience by
        filtering tips according to your interests. The animation below
        demonstrates how to choose your preferred topics.
      </Typography>
      <Typography component="div">
        <ol>
          <li>
            <Typography>Click our extension.</Typography>
          </li>
          <li>
            <Typography>
              Click the settings icon at the top-right of the extension
            </Typography>
          </li>
          <li>
            <Typography>
              Click the topics tab at the left side of the extension.
            </Typography>
          </li>
          <li>
            <Typography>
              Toggle On/Off the topics you want/don't want to see.
            </Typography>
          </li>
        </ol>
      </Typography>
      <Box mt={2} textAlign="center">
        <img
          src="healthTipsTopic.gif"
          alt="Topics for Health Tips"
          width="400"
          height="auto"
        />
      </Box>
    </Box>
  </Box>
);

export default Settings;
