import React, { useState, useEffect } from "react";
import { Modal, Box, Typography, Button, Container } from "@mui/material";
import TosContent from "./../components/TosContent"; // assuming TermsOfService is in the same directory
import { setTOS, getTOS } from "./../../utils/storage";

const TermsOfServiceModal = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const checkTOS = async () => {
      // Check if the ToS has been accepted on component mount
      const result = await getTOS();
      if (!result?.tosAccepted) {
        setOpen(true);
      }
    };
    checkTOS();
  }, []);

  const handleAccept = () => {
    setTOS(true); // Set ToS as accepted
    setOpen(false); // Close the modal
  };

  return (
    <Modal
      open={open}
      onClose={() => {}}
      sx={{
        backdropFilter: "blur(5px)",
        background: "linear-gradient(180deg, #7075CB, #FFFFFF)",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "80%", sm: "60%", md: "50%" }, // Adjust width for different screen sizes
          maxHeight: "85vh",
          overflowY: "auto",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          // borderRadius: "20px",
        }}
      >
        <Container>
          {/* Centering the Title */}
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontFamily: "Lexend Giga",
              fontWeight: "semibold",
              textAlign: "center", // Center horizontally
            }}
          >
            Terms of Service
          </Typography>

          {/* Centering the Date */}
          <Typography
            variant="subtitle1"
            color="textSecondary"
            gutterBottom
            sx={{ textAlign: "center" }} // Center horizontally
          >
            Last Updated: November 19, 2024
          </Typography>

          {/* TosContent with dynamic scroll based on screen size */}
          <Box
            sx={{
              backgroundColor: "rgba(166, 166, 166, 0.09)",
              height  : { xs: "auto", sm: "auto",},
              maxHeight: { md: "50vh" }, // Allow more height on small screens
              overflowY: { md: "auto"}, // Scroll only on larger screens
              p: 2,
              borderRadius: "8px", // Optional: Slight rounding for TosContent container
            }}
          >
            <TosContent />
          </Box>

          {/* Centered Button */}
          <Box display="flex" justifyContent="center" alignItems="center" mt={3}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#525698",
                color: "white",
                borderRadius: "10px", // Slight rounding for button
                fontWeight: "bold", // Makes text bold
                fontSize: "1.2rem", // Larger font size
                padding: "12px 24px", // Increased padding
                "&:hover": {
                  backgroundColor: "#40457a",
                },
              }}
              onClick={handleAccept}
            >
              I understand and agree
            </Button>
          </Box>
        </Container>
      </Box>
    </Modal>
  );
};

export default TermsOfServiceModal;
