// App.js
import { createRoot } from "react-dom/client";
import React, { useState } from "react";
import {
  Navigate,
  HashRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles"; // Import ThemeProvider
import theme from "./css/theme"; // Import your custom theme
import SidebarLayout from "./layouts/SidebarLayout";
import MainLayout from "./layouts/MainLayout";
import TopBar from "./components/TopBar";
import TosPage from "./pages/TosPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import LicensePage from "./pages/License";
import AboutUsPage from "./pages/AboutUsPage";
import sections from "./functions/sections";
import { Helmet } from "react-helmet";

import "./css/linksRoute.css";

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      {" "}
      {/* Wrap the app with ThemeProvider */}
      <Router>
        <Helmet>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&family=Lexend+Deca:wght@100..900&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@100..900&family=Lexend:wght@100..900&family=Roboto+Flex:opsz,wght@8..144,100..1000&display=swap"
            rel="stylesheet"
          ></link>
        </Helmet>

        <TopBar onDrawerToggle={handleDrawerToggle} />

        <Routes>
          <Route
            path="/documentation"
            element={
              <SidebarLayout
                mobileOpen={mobileOpen}
                handleDrawerToggle={handleDrawerToggle}
              />
            }
          >
            <Route
              index
              element={<Navigate to="getting-started/introduction" />}
            />
            {sections.map((section, index) => (
              <Route
                key={index}
                path={section.path}
                element={section.component ? <section.component /> : null}
              />
            ))}
            {sections.map((section) =>
              section.subSections
                ? section.subSections.map((subSection, subIndex) => (
                    <Route
                      key={`sub-${subIndex}`}
                      path={subSection.path}
                      element={
                        subSection.component ? <subSection.component /> : null
                      }
                    />
                  ))
                : null
            )}
          </Route>

          <Route element={<MainLayout />}>
            <Route path="/tos" element={<TosPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/license" element={<LicensePage />} />
            <Route path="/about" element={<AboutUsPage />} />
          </Route>

          <Route
            path="/documentation.html"
            element={<Navigate to="/documentation" />}
          />
          <Route path="/" element={<Navigate to="/documentation" />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

const container = document.createElement("div");
document.body.appendChild(container);
const root = createRoot(container);
root.render(<App />);
