import React from 'react';
import PrivacyPolicy from "./../../termsAndPrivacy/components/Privacy";
import { Box } from '@mui/material';
import NavigateBigPages from '../components/NavigateBigPages';

const PrivacyPolicyPage = () => {
    return (
        <Box>
            <PrivacyPolicy />
            <NavigateBigPages/>
        </Box>
    );
};

export default PrivacyPolicyPage;