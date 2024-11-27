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
import { useNavigate } from 'react-router-dom';
import { red } from '@mui/material/colors';



const sessionToken = Cookies.get('sessionToken');
//const userId = Cookies.get('userId');

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
      const url = editingCourse // endpoint used depends on whether we are creating a course or modifying one (post vs put)
        ? `https://studyplanner-production.up.railway.app/courses/${editingCourse.id}`
        : 'https://studyplanner-production.up.railway.app/courses';
      const method = editingCourse ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courseName,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();

      if (editingCourse && onUpdateCourse) {
        onUpdateCourse(responseData); 
      } else {
        onAddCourse(); 
      }
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  const handleChange = (event: { target: { value: string } }) => {
    setCourseName(event.target.value);
  };

  return ( //form submission / editing function
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
  const navigate = useNavigate();
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const handleEditClick = (course: Course) => {
    setEditingCourse(course);
  };
  const handleDeleteCourse = async (course: Course) => {
    console.log(`Deleting course: ${course.id}`);
    const response = await fetch(`https://studyplanner-production.up.railway.app/courses/${course.id}/delete`, {
      method: 'DELETE',
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error(`Failed to delete course: ${response.statusText}`);
    }
    fetchCourses();
  };

  const handleClosePopup = () => {
    setEditingCourse(null); 
  };
  const fetchCourses = async () => { //course fetcher whenever we load the page or add a new course
    try {
      const response = await fetch('https://studyplanner-production.up.railway.app/courses', {
        method: 'GET',
        credentials: 'include',
        headers: {
        //  'Authorization': `Bearer ${Cookies.get('sessionToken')}`,
        "Accept":"application/json"
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const fetchedCourses: Course[] = await response.json();
      setCourses(fetchedCourses); 
    } catch (err) {
      //Cookies.remove('sessionToken');
      //window.location.href = '/invalidSession'
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
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            borderRadius: '8px', 
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
            justifyContent: 'center', 
            alignItems: 'center', 
            zIndex: 1000}}>
            <CoursePopup onAddCourse={fetchCourses}/>
        </Popup>
        <Box
        sx={{
          paddingTop: '50px',
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, 
          rowGap: 1,
          columnGap: 1,
          width: '100%',
          maxWidth: 1000,
        }}
      >
      {courses.slice().reverse().map((course, index) => (
           <Card key={index} sx={{ borderRadius: 2, boxShadow: 3, width: 300, height: 200 }}>
    <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'center' }}>
              <Button style={{ color: theme.palette.primary.contrastText }} onClick={() => navigate(`/courses/${course.id}`)}><Typography variant="h1">{course.courseName}</Typography></Button>
              <Button 
                  size="small" 
                  color="secondary" 
                  onClick={() => handleEditClick(course)}
                >
                  Edit course
                </Button>
                <Button 
                  size="small" 
                  color="secondary" 
                  onClick={() => handleDeleteCourse(course)}
                >
                  Delete
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
