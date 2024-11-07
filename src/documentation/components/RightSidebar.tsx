// src/components/RightSidebar.js
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, List, ListItem, ListItemText, useTheme, Drawer, Toolbar } from '@mui/material';

const RightSidebar = () => {
  const location = useLocation();
  const [sections, setSections] = useState([]);
  const [activeSection, setActiveSection] = useState('');
  const theme = useTheme();

  // Function to detect all sections with an ID and extract h1/h2 text
  const detectSections = () => {
    const sectionElements = document.querySelectorAll('[id]');
    const detectedSections = Array.from(sectionElements).map((element) => {
      const header = element.querySelector('h1, h2');
      return {
        id: element.id,
        title: header ? header.textContent : element.id,
      };
    });
    setSections(detectedSections);
  };

  // Scroll to a specific section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Handle scrolling and update active section
  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    let closestSection = '';
    let minDistance = Infinity;

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        const elementTop = element.getBoundingClientRect().top + scrollPosition;
        const elementHeight = element.clientHeight;

        // Calculate the center of the section
        const sectionCenter = elementTop + elementHeight / 2;

        // Calculate the distance from the center of the screen
        const distanceToCenter = Math.abs(sectionCenter - (scrollPosition + windowHeight / 2));

        // If the section is closer to the center, mark it as the active one
        if (distanceToCenter < minDistance) {
          minDistance = distanceToCenter;
          closestSection = id;
        }
      }
    });

    // Only update if the active section has changed
    if (closestSection && closestSection !== activeSection) {
      setActiveSection(closestSection);
    }
  };

  useEffect(() => {
    // Detect sections on component mount and when the location changes
    detectSections();
  }, [location]);

  useEffect(() => {
    // Attach scroll event listener
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections, activeSection]);

  return (
    <Drawer
      variant="permanent"
      anchor="right"
      sx={{
        width: 250,
        flexShrink: 0,
        display: { xs: 'none', sm: 'none', md: 'none', lg: 'block' },
        '& .MuiDrawer-paper': {
          width: 250,
          height: '100%',
          position: 'fixed',
          top: 0,
          right: 0,
          bgcolor: '#7075CB1A', // Background color
          borderLeft: '2px solid #7075CB', // Left border
          fontFamily: 'Lexend Deca, sans-serif', // Font family
          boxShadow: 'none', // Remove shadow
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto', color: '#00000080' }}> {/* Text color */}
        <List>
          {sections.map(({ id, title }) => (
            <ListItem
              key={id}
              onClick={() => scrollToSection(id)}
              selected={activeSection === id}
              sx={{
                cursor: 'pointer',
                bgcolor: activeSection === id ? theme.palette.action.selected : 'inherit',
              }}
            >
              <ListItemText primary={title} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default RightSidebar;
