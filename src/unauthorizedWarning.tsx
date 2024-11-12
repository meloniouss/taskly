import React, { useContext } from 'react';
import { Box, Typography, Button, useTheme } from '@mui/material';
import { ColorModeContext, tokens } from './theme';


function UnauthorizedError() {
  const colorMode = useContext(ColorModeContext);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          backgroundColor: colors.redAccent[500],
          padding: '20px',
          borderRadius: '8px',
          boxShadow: 3,
        }}
      >
        <Typography variant="h1" color="black" gutterBottom>
          UNAUTHORIZED ACCESS
        </Typography>
        <Typography variant="h3" color="textSecondary" paragraph>
          STOP PLAYING WITH THE URL PARAMETERS
        </Typography>
        <Button variant="contained" color="secondary" onClick={() => window.location.href = '/'}>
          Go Back to Home
        </Button>
      </Box>
    );
}
export default UnauthorizedError;