// src/components/NavigatePage.tsx
import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import sections from './../functions/sections';

const flattenSections = () => {
  const flattened: { name: string; path: string; fullName: string }[] = [];

  sections.forEach(section => {
    if (section.subSections) {
      section.subSections.forEach(subSection => 
        flattened.push({ 
          name: subSection.name, 
          path: subSection.path, 
          fullName: `${section.name} - ${subSection.name}` 
        })
      );
    } else {
      flattened.push({ 
        name: section.name, 
        path: section.path, 
        fullName: section.name 
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
      }}
    >
      {prevSection && (
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(prevSection.path)}
        >
          Go back to: {prevSection.fullName}
        </Button>
      )}
      {nextSection && (
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(nextSection.path)}
        >
          Proceed to: {nextSection.fullName}
        </Button>
      )}
    </Box>
  );
};

export default NavigatePage;
