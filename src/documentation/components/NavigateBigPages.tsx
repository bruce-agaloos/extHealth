// for navigating through documentation -> tos
// src/components/NavigatePage.tsx
import React from 'react';
import { Box, Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';

const getPath = (domPath) => {
    console.log(chrome.runtime.getURL("documentation.html") + "#" + domPath)
    return chrome.runtime.getURL("documentation.html") + "#" + domPath;
  };

const sections = [
    { name: "Documentation", path: "/documentation" },
    { name: "Privacy Policy", path: "/privacy-policy" },
    { name: "Terms of Use", path: "/tos" },
    { name: "License", path: "/license" },
    { name: "About Us", path: "/about" },
];

const NavigateBigPages: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const flattenedSections = sections;
  console.log(location.pathname);
  console.log("something")

  const currentIndex = flattenedSections.findIndex(section => section.path === location.pathname);
  const prevSection = currentIndex > 0 ? flattenedSections[currentIndex - 1] : null;
  const nextSection = currentIndex < flattenedSections.length - 1 ? flattenedSections[currentIndex + 1] : null;

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mt: 2,
        mb: 2,
        width: '100%',
        flexDirection: { xs: 'column', sm: 'row' }, // Switch to column layout on small screens
      }}
    >
      {prevSection && (
        <Button
          variant="text"
          sx={{
            color: '#7075CB',
            fontFamily: 'Lexend Deca, sans-serif',
            fontWeight: 500,
            mb: { xs: 1, sm: 0 }, // Add margin bottom for small screens
          }}
          onClick={() => navigate(prevSection.path)}
        >
          <ArrowCircleLeftOutlinedIcon sx={{ marginRight: '8px' }} />
          {prevSection.name}
        </Button>
      )}
      
      <Box sx={{ flexGrow: 1 }} /> {/* Empty space to push the next section to the right */}

      {nextSection && (
        <Button
          variant="text"
          sx={{
            color: '#7075CB',
            fontFamily: 'Lexend Deca, sans-serif',
            fontWeight: 500,
            mt: { xs: 1, sm: 0 }, // Add margin top for small screens
          }}
          onClick={() => navigate(nextSection.path)}
        >
          {nextSection.name}
          <ArrowCircleRightOutlinedIcon sx={{ marginLeft: '8px' }} />
        </Button>
      )}
      
    </Box>
  );
};

export default NavigateBigPages;
