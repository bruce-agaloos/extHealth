import React, { useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";

const LoadingModal: React.FC = () => {
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const updateLoadingState = () => {
      chrome.storage.local.get(
        ["isFactCheckLoading", "isSingleFactCheckLoading"],
        (result) => {
          const isFactCheckLoading = result.isFactCheckLoading === true;
          const isSingleFactCheckLoading =
            result.isSingleFactCheckLoading === true;
          setLoading(isFactCheckLoading || isSingleFactCheckLoading);
        }
      );
    };

    // Check the initial loading state
    updateLoadingState();

    // Update the loading state on storage changes
    const handleStorageChange = (changes: {
      [key: string]: chrome.storage.StorageChange;
    }) => {
      if (changes.isFactCheckLoading || changes.isSingleFactCheckLoading) {
        updateLoadingState();
      }
    };

    chrome.storage.onChanged.addListener(handleStorageChange);

    // Cleanup the event listener on unmount
    return () => {
      chrome.storage.onChanged.removeListener(handleStorageChange);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 2, // Adjust if necessary
      }}
      id="loading-modal"
    >
      <Box display="flex" flexDirection="column" alignItems="center">
        <span className="loader loading" style={{
          // resets the styles
          position: "static",
          fontSize: "26px",
        }}></span>
      </Box>
    </Box>
  );
};

export default LoadingModal;
