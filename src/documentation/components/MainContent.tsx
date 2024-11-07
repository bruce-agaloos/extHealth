// src/components/MainContent.js
import React, { ReactNode } from "react";
import { Box } from "@mui/material";
import NavigatePage from "./NavigatePage";
import Footer from "./footer";

const drawerWidth = 240;

interface MainContentProps {
  children: ReactNode;
  onDrawerToggle: () => void;
}

const MainContent: React.FC<MainContentProps> = ({
  children,
  onDrawerToggle,
}) => (
  <Box
    component="main"
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      flexGrow: 1,
      width: { sm: `calc(100% - ${drawerWidth}px)` },
      minHeight: "90vh",
      boxSizing: "border-box",
    }}
  >
    <Box
      sx={{
        padding: 2,
        boxSizing: 'border-box',
        maxWidth: 800,
        width: '100%', // Allows the Box to take the full width of its container
      }}
    >
      {children}
    </Box>
    <Box
      sx={{
        padding: 2,
        boxSizing: "border-box",
        maxWidth: 800,
        width: '100%',
      }}
    >
      <NavigatePage />
    </Box>
    <Box
      sx={{
        boxSizing: "border-box",
        width: '100%',
      }}
    >
      <Footer />
    </Box>
  </Box>
);

export default MainContent;
