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
  return (
    <div>
      <div>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </div>
      <Drawer   
        sx={{
            '& .MuiDrawer-paper': {
              backgroundColor: theme.palette.primary.dark, // Change the background color of the Drawer
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
            onMouseEnter={() => setHovered(true)} // Set hovered state to true on mouse enter
            onMouseLeave={() => setHovered(false)} // Set hovered state to false on mouse leave
          >
            <LightModeIcon 
                style={{ 
                margin: '0 16px 0',
                color: hovered ? theme.palette.secondary.dark : theme.palette.secondary.main, // Change color on hover
                transition: 'color 0.3s', // Smooth transition for color change
                }} 
            />
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
                        width: '230px'
                    }}
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
      
      <ListItem button><HomeIcon fontSize="small" style={{margin: '0 5px 3px 0px'}}/>Home</ListItem>
      <ListItem button><MenuBookIcon fontSize="small" style={{margin: '0 5px 3px 0px'}}/>Courses <ArrowDropDown/></ListItem>
      <ListItem button><EditIcon fontSize="small" style={{margin: '0 5px 1px 0px'}}/>Workspaces <ArrowDropDown/></ListItem>
      <ListItem button> <CalendarTodayIcon fontSize="small" style={{margin: '0 5px 0 0px'}}/>Calendar</ListItem>
      <ListItem button><ViewKanbanIcon fontSize="small" style={{margin: '0 5px 3px 0px'}}/>Kanban Board</ListItem>
      <ListItem button><HelpOutlineIcon fontSize="small" style={{margin: '0 5px 1px 0px'}}/>Help</ListItem>
      

    </List>
  );
  
export default Sidebar