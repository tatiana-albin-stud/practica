import React from 'react';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';

const PaperContainer = ({ style, children }) => {
    return (
        <Box
            sx={{
                borderRadius: '1rem',
                backgroundColor: '#FFFFFF',
                boxShadow: '#eaeef4 0px 4px 16px, #eaeef1 0px 8px 32px',
                ...style,
            }}
        >
            {children}
        </Box>
    );
};

PaperContainer.propTypes = {
    style: PropTypes.object,
};

PaperContainer.defaultProps = {
    style: {},
};

export default PaperContainer;
