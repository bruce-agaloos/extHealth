import React from 'react';
import TermsOfService from "./../../termsAndPrivacy/components/ToS";
import { Box } from '@mui/material';
import NavigateBigPages from '../components/NavigateBigPages';

const TosPage = () => {
    return (
        <Box>
            <TermsOfService />
            <NavigateBigPages/>
        </Box>
    );
};

export default TosPage;