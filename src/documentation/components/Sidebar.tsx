import React, { useState, useEffect } from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Toolbar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const drawerWidth = 240;

const Sidebar = ({ mobileOpen, onDrawerToggle, sections }) => {
  const location = useLocation();
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    sections.forEach((section, index) => {
      if (section.subSections) {
        const isSubSectionActive = section.subSections.some(
          (subSection) => subSection.path === location.pathname
        );
        if (isSubSectionActive) {
          setExpanded(`panel${index}`);
        }
      } else if (section.path === location.pathname) {
        setExpanded(false);
      }
    });
  }, [location.pathname, sections]);

  const renderSections = () => {
    return sections.map((section, index) => {
      const isActive = location.pathname === section.path;
      const headerStyle = {
        fontFamily: '"Lexend Deca", sans-serif',
        fontWeight: isActive ? 500 : 400,
        color: isActive ? '#718ECB' : '#00000080',
      };

      if (section.type === 'header') {
        // Render header as a non-clickable, non-expandable item
        return (
          <Typography
            key={index}
            variant="h6"
            sx={{
              ...headerStyle,
              px: 2,
              py: 1,
              // Removed the border-bottom
            }}
          >
            {section.name}
          </Typography>
        );
      } else if (section.subSections) {
        // Render an accordion for sections with subSections
        return (
          <Accordion
            key={index}
            expanded={expanded === `panel${index}`}
            onChange={handleAccordionChange(`panel${index}`)}
            sx={{
              boxShadow: 'none', // Remove shadow
              border: 'none', // Remove border
              '&::before': {
                display: 'none', // Remove the unwanted line (pseudo-element)
              },
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ padding: '0 16px' }}>
              <Typography sx={{ fontFamily: '"Lexend Deca", sans-serif', fontWeight: 500 }}>
                {section.name}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                {section.subSections.map((subSection, subIndex) => {
                  const isSubSectionActive = location.pathname === subSection.path;
                  return (
                    <ListItem key={subIndex} disablePadding>
                      <ListItemButton
                        component={Link}
                        to={subSection.path}
                        selected={isSubSectionActive}
                        sx={{
                          fontFamily: '"Lexend Deca", sans-serif',
                          fontWeight: isSubSectionActive ? 500 : 400,
                          color: isSubSectionActive ? '#718ECB' : 'inherit',
                          backgroundColor: 'transparent', // Ensure background color is unchanged
                        }}
                      >
                        <ListItemText primary={subSection.name} />
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </List>
            </AccordionDetails>
          </Accordion>
        );
      } else {
        // Render a regular list item for standalone sections
        return (
          <ListItem key={index} disablePadding>
            <ListItemButton
              component={Link}
              to={section.path}
              selected={isActive}
              sx={{
                fontFamily: '"Lexend Deca", sans-serif',
                fontWeight: isActive ? 500 : 400,
                color: isActive ? '#718ECB' : 'inherit',
                backgroundColor: 'transparent', // Ensure background color is unchanged
              }}
            >
              <ListItemText primary={section.name} />
            </ListItemButton>
          </ListItem>
        );
      }
    });
  };

  return (
    <>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'none', md: 'none', lg: 'block' },
          width: drawerWidth,
          flexShrink: 0,
          borderRight: '1px solid #00000080', // Add right border
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            boxShadow: 'none', // Remove shadow
          },
        }}
        open
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          {renderSections()}
        </Box>
      </Drawer>

      {/* Drawer for smaller screens */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onDrawerToggle}
        sx={{
          display: { md: 'block', lg: 'none' },
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxShadow: 'none' },
        }}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
      >
        {renderSections()}
      </Drawer>
    </>
  );
};

export default Sidebar;
