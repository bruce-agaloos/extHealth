// src/pages/Introduction.js
import React from "react";
import { Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";

const HowToUse = () => (
  <Box>
    {/* Introduction Section */}
    <Box component="section" id="default">
      <Typography variant="h4" component="h1" gutterBottom>
        Default Use
      </Typography>
      <Typography paragraph>
        If you browsed this documentation in a chronological order, you would
        have already seen the default use of the fact-checking feature, which is
        through context-menu or auto-detection submission. If not refer to this
        two pages below:
      </Typography>
      <ul>
        <li>
          <Link to="/health-detections/auto-detection">
            Health Detection - Auto Detection
          </Link>
        </li>
        <li>
          <Link to="/health-detections/context-menu">
            Health Detection - Context Menu
          </Link>
        </li>
      </ul>
    </Box>

    {/* Pinning Extension Section */}
    <Box component="section" id="submit" mt={4}>
      <Typography variant="h4" component="h1" gutterBottom>
        Submit a text
      </Typography>
      <Typography paragraph>
        Have a specific piece of health-text you'd like to fact-check?
        You can submit it to the side-panel.
      </Typography>
      <ol>
        <li>
          <Typography>
            Open the sidepanel by right-clicking any part of a webpage
          </Typography>
        </li>
        <li>
          <Typography>
            Click the option of our extension named "Check Health Information".
          </Typography>
        </li>
        <li>
          <Typography>
            Similarly, you can also click the extension icon on the browser toolbar and click "Fact check sidebar"
          </Typography>
        </li>
        <li>
          <Typography>
            Enter your query at the input below the sidepanel.
          </Typography>
        </li>
      </ol>
      {/* GIF Placeholder */}
      <Box mt={2} textAlign="center">
        <img
          src="factSubmit.gif"
          alt="Submit a text"
          width="400"
          height="auto"
        />
      </Box>
    </Box>
    <Box component="section" id="correct" mt={4}>
      <Typography variant="h4" component="h1" gutterBottom>
        Correct a text
      </Typography>
      <Typography paragraph>
        Our system divides the text into sentences so that it can be easily fact-checked and read.
        If you think our system made a mistake in dividing the text, you can correct it.
      </Typography>
      <ol>
        <li>
          <Typography>
            Choose the text you want to correct.
          </Typography>
        </li>
        <li>
          <Typography>
            Type in the corrected text
          </Typography>
        </li>
        <li>
          <Typography>
            Press "enter" to submit the corrected text
          </Typography>
        </li>
      </ol>
      {/* GIF Placeholder */}
      <Box mt={2} textAlign="center">
        <img
          src="factCorrect.gif"
          alt="Correct a text"
          width="400"
          height="auto"
        />
      </Box>
    </Box>
  </Box>
);

export default HowToUse;
