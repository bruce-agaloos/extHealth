import React from 'react';
import License from "./../../termsAndPrivacy/components/License";
import { Box } from '@mui/material';
import NavigateBigPages from '../components/NavigateBigPages';

const LicensePage = () => {
    return (
        <Box>
            <License />
            <NavigateBigPages/>
        </Box>
    );
};

export default LicensePage;