// HomePage.tsx
import React, { useContext, useEffect, useRef, useState } from 'react';
import Topbar from './Topbar'; // Adjust the path as necessary
import Cookies from 'js-cookie';
import CssBaseline from '@mui/material/CssBaseline';
import Sidebar from './Sidebar';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './index.css'
import { Card, CardContent, TextField, Typography, CardActions } from '@mui/material';
import { AppBar, Box, Button, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, useTheme } from "@mui/material";
import { ColorModeContext, tokens } from './theme';


const sessionToken = Cookies.get('sessionToken');
const userId = Cookies.get('userId');

interface CoursePopupProps {
  onAddCourse: () => void;
  onUpdateCourse?: (updatedCourse: Course) => void;
  editingCourse?: Course;
}

const CoursePopup: React.FC<CoursePopupProps> = ({ onAddCourse, onUpdateCourse, editingCourse }) => {
  const [courseName, setCourseName] = useState(editingCourse?.courseName || '');
  const colorMode = useContext(ColorModeContext);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    // If editingCourse changes, update the courseName state
    if (editingCourse) {
      setCourseName(editingCourse.courseName);
    }
  }, [editingCourse]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const url = editingCourse
        ? `http://localhost:9000/courses/${editingCourse.id}`
        : 'http://localhost:9000/courses';
      const method = editingCourse ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courseName,
          user: { id: userId }
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      console.log(responseData); // Log the response as needed

      if (editingCourse && onUpdateCourse) {
        onUpdateCourse(responseData); // Call onUpdateCourse with updated data
      } else {
        onAddCourse(); // Call onAddCourse if it's a new course
      }
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  const handleChange = (event: { target: { value: string } }) => {
    setCourseName(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', backgroundColor: theme.palette.secondary.main, alignItems: 'center' }}>
      <Typography variant="h6">{editingCourse ? 'Edit Course' : 'Add a New Course'}</Typography>
      <TextField 
        label="Course Name" 
        value={courseName}
        onChange={handleChange} 
        variant="outlined" 
        fullWidth 
        required 
      />
      <Button type="submit" variant="contained" color="primary">
        {editingCourse ? 'Update' : 'Submit'}
      </Button>
    </form>
  );
};

interface Course {
  courseName: string;
  id: number;
}

const HomePage: React.FC = () => {
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const handleEditClick = (course: Course) => {
    console.log('editing a course');
    setEditingCourse(course);
  };

  const handleClosePopup = () => {
    setEditingCourse(null); 
  };
  const fetchCourses = async () => {
    try {
      const response = await fetch('http://localhost:9000/courses', {
        method: 'GET',
        credentials: 'include'
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log('fetching courses')
      const fetchedCourses: Course[] = await response.json();
      setCourses(fetchedCourses); // Update state with fetched courses
      console.log('Fetched courses:', fetchedCourses);
      fetchedCourses.forEach(course => {
        console.log(`Course ID: ${course.id}, Name: ${course.courseName}`);
      });
    } catch (err) {
      console.error('Error fetching courses:', err);
    }
  };
  useEffect(() => {
      fetchCourses();
  },[]);
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
            <CoursePopup onAddCourse={fetchCourses}/>
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
      {courses.slice().reverse().map((course, index) => (
           <Card key={index} sx={{ borderRadius: 2, boxShadow: 3, width: 300, height: 200 }}>
    <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'center' }}>
              <Typography variant="h1">{course.courseName}</Typography>
              <Button 
                  
                  size="small" 
                  color="secondary" 
                  onClick={() => handleEditClick(course)}
                >
                  Edit course
                </Button>
            </CardContent>
          </Card>
                ))}
        {editingCourse && (
        <Popup
          open={!!editingCourse}
          closeOnDocumentClick
          onClose={() => setEditingCourse(null)}
          modal
          nested
          position="bottom right"
          contentStyle={{
            backgroundColor: theme.palette.secondary.main,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '8px',
            padding: '20px',
            width: 'auto',
          }}
          overlayStyle={{
            background: 'rgba(0, 0, 0, 0.5)',
            position: 'fixed',
            top: 0,
            left: 80,
            right: 0,
            bottom: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
        >
          <CoursePopup
            editingCourse={editingCourse}
            onAddCourse={fetchCourses}
            onUpdateCourse={() => {
              fetchCourses();
              setEditingCourse(null); // Close the popup after update
            }}
          />
        </Popup>
      )}
      </Box>
        {/* Other content for your home page can go here */}
      </Box>
    </Box>
  );
};

export default HomePage;
