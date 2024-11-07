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
      if (section.type === 'header') {
        // Render header as a non-clickable, non-expandable item
        return (
          <Typography
            key={index}
            variant="h6"
            sx={{ px: 2, py: 1, color: 'text.secondary' }}
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
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{section.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                {section.subSections.map((subSection, subIndex) => (
                  <ListItem key={subIndex} disablePadding>
                    <ListItemButton
                      component={Link}
                      to={subSection.path}
                      selected={location.pathname === subSection.path}
                    >
                      <ListItemText primary={subSection.name} />
                    </ListItemButton>
                  </ListItem>
                ))}
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
              selected={location.pathname === section.path}
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
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
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
          [`& .MuiDrawer-paper`]: { width: drawerWidth },
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
