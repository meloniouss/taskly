// HomePage.tsx
import React, { useContext } from 'react';
import Topbar from './Topbar';
import { Button, Container, Grid, Typography, useTheme } from '@mui/material';
import { ColorModeContext, tokens } from './theme';

const HomePage: React.FC = () => {
  const colorMode = useContext(ColorModeContext);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  return (
    <div  style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Topbar />
      
      {/* Hero Section */}
      <div style={{ backgroundColor: theme.palette.primary.dark, padding: '320px 0', textAlign: 'center', flex: 1}}>
        <Container>
          <Typography variant="h2" gutterBottom color={theme.palette.secondary.main}>
            Stay Organized, Stay Ahead
          </Typography>
          <Typography variant="h5" paragraph>
            Manage your tasks, track your courses, and never miss a deadline again. Sign up today to start organizing your academic life!
          </Typography>
          <Button variant="contained" color='secondary' size="large" href="http://localhost:9000/auth/oauth" >
            Get Started Now
          </Button>
        </Container>
      </div>

      {/* Features */}
      <Container style={{ padding: '40px 0', color: theme.palette.primary.contrastText, flex: 1}}>
        <Typography variant="h4" align="center" gutterBottom color={theme.palette.secondary.main}>
          Why Choose Us?
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={3}>
            <div style={{ textAlign: 'center' }}>
              <Typography variant="h6" color={theme.palette.secondary.dark}>Task Management</Typography>
              <Typography variant="body2" paragraph>
                Create, manage, and track your tasks easily with a simple interface.
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <div style={{ textAlign: 'center' }}>
              <Typography variant="h6" color={theme.palette.secondary.dark}>Course Tracker</Typography>
              <Typography variant="body2" paragraph>
                Keep all your courses in one place, with deadlines and assignments in view.
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <div style={{ textAlign: 'center' }}>
              <Typography variant="h6" color={theme.palette.secondary.dark}>Calendar Integration</Typography>
              <Typography variant="body2" paragraph>
                Easily see all your tasks and assignments on a calendar for better planning.
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <div style={{ textAlign: 'center' }}>
              <Typography variant="h6" color={theme.palette.secondary.dark}>Easy Course Editor</Typography>
              <Typography variant="body2" paragraph>
                Quickly add, edit, and track your courses, assignments, and deadlines.
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Container>

      {/* Social Proof */}
      <div style={{ 
          backgroundColor: theme.palette.secondary.light, 
          padding: '60px 0', 
          overflow: 'auto',
        }}>
        <Container>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="body1" style={{ textAlign: 'center' }} color={theme.palette.primary.main}>
                "This app changed the way I manage my coursework. I never miss a deadline anymore!"
              </Typography>
              <Typography variant="subtitle2" align="center" color={theme.palette.primary.dark}>
                - Sarah L., Student
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="body1"  style={{ textAlign: 'center' }} color={theme.palette.primary.main}>
                "It's easy to use and has everything I need to stay organized for my classes."
              </Typography>
              <Typography variant="subtitle2" align="center" color={theme.palette.primary.dark}>
                - John D., College Senior
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </div>

      {/* CTA */}
      <div style={{ 
          backgroundColor: theme.palette.primary.dark, 
          textAlign: 'center', 
          padding: '60px 0', 
          flex: 1}}>
        <Typography variant="h4" gutterBottom>
          Ready to Stay Organized?
        </Typography>
        <Typography variant="h6" paragraph>
          Join thousands of students who trust our platform to keep them on top of their tasks and courses. Sign up now!
        </Typography>
        <Button variant="contained" color="secondary" size="large" href="http://localhost:9000/auth/oauth">
          Sign Up Now
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
