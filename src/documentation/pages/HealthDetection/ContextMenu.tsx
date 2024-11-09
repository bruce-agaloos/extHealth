// src/pages/Introduction.js
import React from "react";
import { Typography, Box } from "@mui/material";

const ContextMenu = () => (
  <Box>
    {/* Introduction Section */}
    <Box component="section" id="plain">
      <Typography variant="h4" component="h1" gutterBottom>
        Plain Text
      </Typography>
      <Typography paragraph>
        Our detection feature works seamlessly with plain text, allowing you to
        instantly identify health-related information within the content you're
        reading; though it may seem pointless it is used to fact check health
        related information.
      </Typography>
      <Typography component="div">
        <ol>
          <li>
            <Typography>
              Highlight the text you want to fact-check (this is done by
              long-pressing your left-mouse button and dragging it to the text).
            </Typography>
          </li>
          <li>
            <Typography>
              Press right-click on your mouse if you are satisfied with the
              highlighted text.
            </Typography>
          </li>
          <li>
            <Typography>
              Click the option of our extension named "Check Health
              Information".
            </Typography>
          </li>
        </ol>
      </Typography>
      <Box mt={2} textAlign="center">
        <img
          src="detectionPlainText.gif"
          alt="Plain text detection"
          width="400"
          height="auto"
        />
      </Box>
    </Box>

    {/* Pinning Extension Section */}
    <Box component="section" id="image" mt={4}>
      <Typography variant="h4" component="h1" gutterBottom>
        Image
      </Typography>
      <Typography paragraph>
        This also supports images, recognizing health-related visuals allowing
        you to fact check this information. This feature enhances your
        experience by making health information accessible, even when it's part
        of an image.
      </Typography>
      <Typography component="div">
        <ol>
          <li>
            <Typography>Press right-click on an image.</Typography>
          </li>
          <li>
            <Typography>
              Click the option of our extension named "Check Health
              Information".
            </Typography>
          </li>
        </ol>
      </Typography>
      <Box mt={2} textAlign="center">
        <img
          src="detectionImage.gif"
          alt="Image detection"
          width="400"
          height="auto"
        />
      </Box>
    </Box>
  </Box>
);

export default ContextMenu;
