// src/pages/Introduction.js
import React from "react";
import { Typography, Box } from "@mui/material";

const AllHistory = () => (
  <Box>
    {/* Introduction Section */}
    <Box component="section" id="access">
      <Typography variant="h4" component="h1" gutterBottom>
        Accessing Fact Checking History
      </Typography>
      <Typography paragraph>
        Easily revisit past fact checks with our History feature. This allows
        you to access a record of previously verified information. Its important
        to note that this is not specific to "your" history, its the history of
        all previously fact-checked automatically in our system; we do this
        since we are not saving any history that can relate to a person.
      </Typography>
      <ol>
        <li>
          <Typography>
            Click the extension icon on the browser toolbar.
          </Typography>
        </li>
        <li>
          <Typography>
            Click gear or settings icon at the top right of the extension popup.
          </Typography>
        </li>
        <li>
          <Typography>
            Click "Fact-check mode" at the left side of the extension popup.
          </Typography>
        </li>
        <li>
          <Typography>
            And click the link "Search Past Fact Check Queries".
          </Typography>
        </li>
      </ol>
      <Box mt={2} textAlign="center">
        <img
          src="factHistory.gif"
          alt="Fact Checking History"
          width="400"
          height="auto"
        />
      </Box>
    </Box>

    {/* Pinning Extension Section */}
    <Box component="section" id="sample" mt={4}>
      <Typography variant="h4" component="h1" gutterBottom>
        Sample Use
      </Typography>
      <Typography paragraph>
        See how the fact-checking history feature works with a sample entry.
        This example shows how a previously fact-checked item is stored and can
        be reviewed at any time for reference. The animation below illustrates
        this sample history view.
      </Typography>
      {/* GIF Placeholder */}
      <Box mt={2} textAlign="center">
        <img
          src="factSampleHistory.gif"
          alt="Sample Fact Checking History"
          width="400"
          height="auto"
        />
      </Box>
    </Box>
  </Box>
);

export default AllHistory;
