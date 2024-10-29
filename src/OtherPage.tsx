// HomePage.tsx
import React from 'react';
import Topbar from './Topbar'; // Adjust the path as necessary
import Cookies from 'js-cookie';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Sidebar from './Sidebar';

// After login
const sessionToken = Cookies.get('sessionToken');
console.log('Session Token:', sessionToken);


const HomePage: React.FC = () => {
  return (
    <div>
      <Sidebar/>
      {/* Other content for your home page */}
    </div>
  );
};

export default HomePage;
