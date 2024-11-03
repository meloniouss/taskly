// HomePage.tsx
import React, { useContext, useRef } from 'react';
import Topbar from './Topbar'; // Adjust the path as necessary
import Cookies from 'js-cookie';
import CssBaseline from '@mui/material/CssBaseline';
import Sidebar from './Sidebar';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './index.css'
import { Card, CardContent, TextField, Typography } from '@mui/material';
import { AppBar, Box, Button, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, useTheme } from "@mui/material";
import { ColorModeContext, tokens } from './theme';


// After login
const sessionToken = Cookies.get('sessionToken');
console.log('Session Token:', sessionToken);

const CoursePopup = () => {
  const colorMode = useContext(ColorModeContext);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // fetch API stuff
  };
  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', backgroundColor: theme.palette.secondary.main, alignItems: 'center' }}>
      <Typography variant="h6">Add a New Course</Typography>
      <TextField 
        label="Course Name" 
        variant="outlined" 
        fullWidth 
        required 
      />
      <Button 
        type="submit" 
        variant="contained" 
        color="primary"
      >
        Submit
      </Button>
    </form>
  );
};

const HomePage: React.FC = () => {
  const courses = [
    { title: 'COMP-352', description: 'Learn the basics of Course 1.' },
    { title: 'MATH-208', description: 'Deep dive into Course 2.' },
    { title: 'Cal2', description: 'Advanced concepts in Course 3.' },
    { title: 'ENGR-233', description: 'Advanced concepts in Course 3.' },

  ];
  const colorMode = useContext(ColorModeContext);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  return (
    <Box sx={{ display: 'flex' }}
    >
      <Sidebar />

      <Box 
        component="main" 
        sx={{ flexGrow: 1, p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 20,  justifyContent: 'left'}}
      >

        <Typography variant="h1" sx={{ mb: 2, justifyContent: 'screenleft', marginRight: '850px'}}>
          Courses
        </Typography>
         
        <Popup 
          trigger={<Button ref={buttonRef} variant="contained" color="secondary" sx={{marginRight: '875px'}}>New Course</Button>} 
          modal 
          nested
          position="bottom right"
          contentStyle={{
            backgroundColor: theme.palette.secondary.main,
            display: 'flex', // Use flexbox for centering
            justifyContent: 'center', // Center horizontally
            alignItems: 'center', // Center vertically
            borderRadius: '8px', // Rounded corners
          }} // Needs to be a string
          lockScroll
          overlayStyle={{
            background: 'rgba(0, 0, 0, 0.5)',
            position: 'fixed',
            top: 0,
            left: 80,
            right: 0,
            bottom: 0,
            display: 'flex',
            justifyContent: 'center', // Center horizontally
            alignItems: 'center', // Center vertically
            zIndex: 1000}}>
            <CoursePopup/>
        </Popup>
        <Box
        sx={{
          paddingTop: '50px',
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, // Responsive grid
          rowGap: 1,
          columnGap: 1,
          width: '100%',
          maxWidth: 1000, // Optional: Max width for the course grid
        }}
      >
        {courses.map((course, index) => (
           <Card key={index} sx={{ borderRadius: 2, boxShadow: 3, width: 300, height: 200 }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', alignContent: 'center', height: '100%' }}>
              <Typography variant="h1">{course.title}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
        {/* Other content for your home page can go here */}
      </Box>
    </Box>
  );
};

export default HomePage;
