import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ColorModeContext, useMode } from './theme';
import{CssBaseline, ThemeProvider} from "@mui/material";
import Topbar from "./Topbar";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './Home'; // Adjust the path as necessary
import OtherPage from './OtherPage'; // Other routes
import Cookies from 'js-cookie';
import Sidebar from './Sidebar';
import { useEffect } from 'react';
import CourseTaskTable from './CourseTasks';
import InvalidSession  from './invalidSession';
import MyCalendar from './calendar';
import TextEditor from './TextEditor';

const PrivateRoute = ({ element }: { element: JSX.Element }) => {
  const token = Cookies.get('sessionToken');
  if (!token) {
    // If no sessionToken, redirect to the login or home page
    return <Navigate to="/invalidSession" />;
  }
  return element;
};

const App: React.FC = () => {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
        <Route path="/calendar" element={<MyCalendar />}/>
        <Route path="/" element={(Cookies.get('sessionToken') ? <OtherPage /> : <HomePage />)} />
        <Route path="/courses/:courseId" element={<PrivateRoute element={<CourseTaskTable />} />} />
        <Route path="/invalidSession" element={<InvalidSession />}/>
        <Route path="/texteditor" element ={<TextEditor/>}/>
          {/* Add other routes here */}
        </Routes>
      </Router>
    </ThemeProvider>
  </ColorModeContext.Provider>
  );
};

export default App;
