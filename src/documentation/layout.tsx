// App.js
import { createRoot } from 'react-dom/client';
import React, { useState } from 'react';
import { Navigate, HashRouter as Router, Route, Routes } from 'react-router-dom';
import SidebarLayout from './layouts/SidebarLayout';
import MainLayout from './layouts/MainLayout';
import TopBar from './components/TopBar';
import TosPage from './pages/TosPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
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

      {/* Render TopBar once, outside of the layout-specific routing */}
      <TopBar onDrawerToggle={handleDrawerToggle} />

      <Routes>
        {/* Documentation route with sidebars */}
        <Route path="/documentation" element={<SidebarLayout mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />}>
          <Route index element={<Navigate to="getting-started/introduction" />} /> {/* Redirect to Introduction */}
          
          {sections.map((section, index) => (
            <Route key={index} path={section.path} element={section.component ? <section.component /> : null} />
          ))}
          {sections.map((section) =>
            section.subSections ? (
              section.subSections.map((subSection, subIndex) => (
                <Route key={`sub-${subIndex}`} path={subSection.path} element={subSection.component ? <subSection.component /> : null} />
              ))
            ) : null
          )}
        </Route>

        {/* TOS and Privacy Policy without sidebars */}
        <Route element={<MainLayout />}>
          <Route path="/tos" element={<TosPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        </Route>

        {/* Redirect legacy route */}
        <Route path="/documentation.html" element={<Navigate to="/documentation" />} />
        <Route path="/" element={<Navigate to="/documentation" />} />
      </Routes>
    </Router>
  );
}

const container = document.createElement('div');
document.body.appendChild(container);
const root = createRoot(container);
root.render(<App />);
