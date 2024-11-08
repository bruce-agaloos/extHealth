// src/pages/Introduction.js
import React from "react";
import { Typography, Box } from "@mui/material";

const Modes = () => (
  <Box>
    {/* Introduction Section */}
    <Box component="section" id="modes">
      <Typography variant="h4" component="h1" gutterBottom>
        Changing Modes
      </Typography>
      <Typography paragraph>
        The user can change the mode of the fact-checking process by selecting
        the mode from the pop up. The modes are:
      </Typography>
      <ul>
        <li>
          <Typography>
            <strong>Google Mode:</strong> In this mode, the user can fact-check
            the claim by searching it on Google(the websites to search for are
            nitpicked by the developers).
          </Typography>
        </li>
        <li>
          <Typography>
            <strong>Online Database Mode:</strong> In this mode, the user can
            fact-check the claim by searching to the book we have encoded
            entitled Natural Remedies Encyclopedia by Vance Ferrell and Harold
            Cherne, M.D.
          </Typography>
        </li>
        <li>
          <Typography>
            <strong>Offline Mode:</strong> In this mode, the user can fact-check
            the claim by searching it in the past searches of the user, much
            like history.
          </Typography>
        </li>
      </ul>
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
            Choose what mode you want to use or select.
          </Typography>
        </li>
      </ol>
      <Box mt={2} textAlign="center">
        <img
          src="factChangingModes.gif"
          alt="Google Mode"
          width="400"
          height="auto"
        />
      </Box>
    </Box>
  </Box>
);

export default Modes;
