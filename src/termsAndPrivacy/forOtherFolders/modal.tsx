import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, Button, Container } from '@mui/material';
import TermsOfService from './../components/ToS'; // assuming TermsOfService is in the same directory
import { setTOS, getTOS } from './../../utils/storage';

const TermsOfServiceModal = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const checkTOS = async () => {
      // Check if the ToS has been accepted on component mount
      const result = await getTOS();
      console.log(result);
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

  const getPrivacyLink = () => {
    return chrome.runtime.getURL("documentation.html")+'#/privacy-policy';
  }

  return (
    <Modal open={open} onClose={() => {}}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          maxHeight: '80vh',
          overflowY: 'auto',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 1,
        }}
      >
        <Container>
          <Typography variant="h4" gutterBottom>
            Terms of Service
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" gutterBottom>
            Last Updated: November 3, 2024
          </Typography>
          <TermsOfService /> {/* Including the ToS content as a component */}

          <Box display="flex" justifyContent="flex-end" alignItems="center" gap="10px" mt={3}>
            <a style={{textDecoration: "underline"}} href={getPrivacyLink()} target='_blank' rel="noreferrer noopener">Privacy Policy</a>
            <Button
              variant="contained"
              color="primary"
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
