// src/pages/Introduction.js
import React from "react";
import { Typography, Box } from "@mui/material";

const Looks = () => (
  <Box>
    {/* Introduction Section */}
    <Box component="section" id="Looks">
      <Typography variant="h4" component="h1" gutterBottom>
        Looks of health tips
      </Typography>
      <Typography paragraph>
        Explore how our health tips feature can enhance your experience with
        visual cues and easy-to-read information. The animation below shows how
        these tips are presented to make health information accessible and
        engaging.
      </Typography>
      <Box mt={2} textAlign="center">
        <img
          src="healthTipsLooks.png"
          alt="Looks of Health Tips"
          width="400"
          height="auto"
        />
      </Box>
    </Box>

    {/* Pinning Extension Section */}
    <Box component="section" id="Turn" mt={4}>
      <Typography variant="h4" component="h1" gutterBottom>
        Turn On/Off Health tips
      </Typography>
      <Typography paragraph>
        Control the visibility of health tips with a simple toggle feature. This
        allows you to easily turn health tips on or off, providing flexibility
        depending on your needs.
      </Typography>
      <Typography component="div">
        <ol>
          <li>
            <Typography>Click our extension.</Typography>
          </li>
          <li>
            <Typography>
              Toggle the health tips switch to turn them on or off.
            </Typography>
          </li>
        </ol>
      </Typography>
      {/* GIF Placeholder */}
      <Box mt={2} textAlign="center">
        <img
          src="healthTipsTurn.gif"
          alt="Turning Health Tips On/Off"
          width="400"
          height="auto"
        />
      </Box>
    </Box>
  </Box>
);

export default Looks;
