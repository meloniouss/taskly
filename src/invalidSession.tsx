import React, { useContext } from 'react';
import { Box, Typography, Button, useTheme } from '@mui/material';
import { ColorModeContext, tokens } from './theme';


function InvalidSession() {
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
          INVALID SESSION
        </Typography>
        <Button variant="contained" color="secondary" onClick={() => window.location.href = 'https://studyplanner-production.up.railway.app/auth/oauth'}>
          Sign in again
        </Button>
      </Box>
    );
}
export default InvalidSession;