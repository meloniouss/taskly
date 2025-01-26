import { AppBar, Box, Button, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, useTheme } from "@mui/material";
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useContext, useState } from "react";
import MenuIcon from '@mui/icons-material/Menu'; 
import { ColorModeContext, tokens } from './theme'; 
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import ArrowDropUp from '@mui/icons-material/ArrowDropUp';
import LightModeIcon from '@mui/icons-material/LightMode';
import LogoutIcon from '@mui/icons-material/Logout';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import MenuBookIcon from '@mui/icons-material/MenuBook';
import EditIcon from '@mui/icons-material/Edit';
import HomeIcon from '@mui/icons-material/Home';
import ViewKanbanIcon from '@mui/icons-material/ViewKanban';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

const Sidebar = () => {
    const colorMode = useContext(ColorModeContext);
    const [open, setOpen] = useState(true); 
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const toggleDrawer = () => {
      setOpen(!open);
    };
    const [hovered, setHovered] = useState(false);
    const [logoutHovered, setLogoutHovered] = useState(false);
    const handleLogout = async () => {
      try {
        await fetch('https://studyplanner-production.up.railway.app/logout', {
          method: 'POST', 
          credentials: 'include', 
          redirect: 'manual' // DO NOT REMOVE THIS REDIRECT, IT WILL NOT WORK WITHOUT THE REDIRECT
        });
    
        Cookies.remove('sessionToken');
        window.location.href = "/";
    
      } catch (error) {
        console.error('ERROR INITIATING LOGOUT', error);
      }
    };
  return (
    <div>
      <Drawer   
        sx={{
            '& .MuiDrawer-paper': {
              backgroundColor: theme.palette.primary.dark, 
              color: theme.palette.primary.light,
              fontWeight: 'bold',
              minWidth: 230,
              alignItems: "left"
            },
          }}
        variant="persistent"
        anchor="left"
        open={open}
        onClose={toggleDrawer}
      >
        <div> {/* sidebar items*/}
          {DrawerList}
          <Box
            onMouseEnter={() => setHovered(true)} 
            onMouseLeave={() => setHovered(false)} 
          >
        </Box>
        
            <Box
                display="flex" 
                alignItems="center" 
                onMouseEnter={() => setLogoutHovered(true)} 
                onMouseLeave={() => setLogoutHovered(false)}
            >    
            
                <Button   sx={{
                        justifyContent: "left",
                        textTransform: "none",
                        color: logoutHovered ? theme.palette.secondary.dark : theme.palette.secondary.main,
                        transition: 'color 0.7s',
                        fontSize: '14px', // Set your desired font size
                        width: '230px',
                        
                    }}
                    onClick={handleLogout}
                > <LogoutIcon 
                style={{ 
                    color: logoutHovered ? theme.palette.secondary.dark : theme.palette.secondary.main, // Change color on hover
                    transition: 'color 0.7s', // Smooth transition for color change
                    margin: '0 10px 0 8px'
                    }}/>
                Log out
                </Button>
            </Box>
        </div>
      </Drawer>
    </div>
  );
};
const DrawerList = (
    <List>
      
      <ListItem button component={Link} to="/"  sx={{
      '&:hover': {
        color: 'white',
      },
    }}><HomeIcon fontSize="small" style={{margin: '0 5px 3px 0px'}} />Home</ListItem>
      <ListItem button component={Link} to="/"  sx={{
      '&:hover': {
        color: 'white',
      },
    }}><MenuBookIcon fontSize="small" style={{margin: '0 5px 3px 0px'}}/>Courses</ListItem>
      <ListItem button component={Link} to="/texteditor"  sx={{
      '&:hover': {
        color: 'white',
      },
    }}><EditIcon fontSize="small" style={{margin: '0 5px 1px 0px'}}/>Workspace</ListItem>
      <ListItem button component={Link} to="/calendar"  sx={{
      '&:hover': {
        color: 'white',
      },
    }}> <CalendarTodayIcon fontSize="small" style={{margin: '0 5px 0 0px'}}/>Calendar</ListItem>
  
    </List>
  );
  
export default Sidebar