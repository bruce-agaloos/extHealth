import { createRoot } from "react-dom/client";
import React, { useState } from 'react';
import { Navigate, HashRouter as Router, Route, Routes } from 'react-router-dom';
import { CssBaseline, Box } from '@mui/material';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import RightSidebar from './components/RightSidebar';
import TopBar from './components/TopBar';
import sections from './functions/sections';
import { Helmet } from 'react-helmet';

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Router>
      <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&family=Lexend+Deca:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <Box sx={{ display: 'flex', pt: 8 }}>
        <CssBaseline />
        <TopBar onDrawerToggle={handleDrawerToggle} />
        <Sidebar mobileOpen={mobileOpen} onDrawerToggle={handleDrawerToggle} sections={sections} />
        <MainContent onDrawerToggle={handleDrawerToggle}>
          <Routes>
            {sections.map((section, index) => (
              <Route key={index} path={section.path} element={section.component ? <section.component /> : null} /> // Use JSX here
            ))}
            {sections.map((section) =>
              section.subSections ? (
                section.subSections.map((subSection, subIndex) => (
                  <Route key={`sub-${subIndex}`} path={subSection.path}  element={subSection.component ? <subSection.component /> : null}  /> // Use JSX here
                ))
              ) : null
            )}
            <Route path="/documentation.html" element={<Navigate to="/" />} />
          </Routes>
        </MainContent>
        <RightSidebar />
      </Box>
    </Router>
  );
}

const container = document.createElement("div");
document.body.appendChild(container);
const root = createRoot(container);
root.render(<App />);
