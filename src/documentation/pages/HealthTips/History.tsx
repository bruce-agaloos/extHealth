// src/pages/Introduction.js
import React from "react";
import { Typography, Box } from "@mui/material";

const History = () => (
  <Box>
    {/* Introduction Section */}
    <Box component="section" id="access">
      <Typography variant="h4" component="h1" gutterBottom>
        Accessing Health Tips History
      </Typography>
      <Typography paragraph>
        Keep track of all the health tips you've explored with our History
        feature. This allows you to revisit previous tips at any time, helping
        you maintain a record of useful health information. The animation below
        shows how to access your history.
      </Typography>
      <ol>
        <li>
          <Typography>
            Click our extension.
          </Typography>
        </li>
        <li>
          <Typography>
            Click the history icon at the top-right(below the settings icon) of the extension.
          </Typography>
        </li>
      </ol>
      <Box mt={2} textAlign="center">
        <img
          src="healthTipsHistory.gif"
          alt="Health Tips History"
          width="400"
          height="auto"
        />
      </Box>
    </Box>
  </Box>
);

export default History;
