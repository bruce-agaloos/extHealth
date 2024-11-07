// src/components/NavigatePage.tsx
import React from 'react';
import { Box, Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import sections from './../functions/sections';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';

// Modified flattenSections function to exclude headers (those without a path)
const flattenSections = () => {
  const flattened: { name: string; path: string; fullName: string }[] = [];

  sections.forEach(section => {
    if (section.path) {
      // Include top-level sections that have a path
      flattened.push({ 
        name: section.name, 
        path: section.path, 
        fullName: section.name 
      });
    } else if (section.subSections) {
      // Include subsections that have paths
      section.subSections.forEach(subSection => {
        if (subSection.path) {
          flattened.push({ 
            name: subSection.name, 
            path: subSection.path, 
            fullName: `${section.name} - ${subSection.name}` 
          });
        }
      });
    }
  });

  return flattened;
};

const NavigatePage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const flattenedSections = flattenSections();

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
          {prevSection.fullName}
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
          {nextSection.fullName}
          <ArrowCircleRightOutlinedIcon sx={{ marginLeft: '8px' }} />
        </Button>
      )}
    </Box>
  );
};

export default NavigatePage;
