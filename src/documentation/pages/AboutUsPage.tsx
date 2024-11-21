import React from 'react';
import AboutUs from "./../../termsAndPrivacy/components/AboutUs";
import { Box } from '@mui/material';
import NavigateBigPages from '../components/NavigateBigPages';

const AboutUsPage = () => {
    return (
        <Box>
            <AboutUs />
            <NavigateBigPages/>
        </Box>
        
    );
};

export default AboutUsPage;